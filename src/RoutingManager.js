import { observable, extendsObservable, asMap, action, toJS } from 'mobx';


// See data.py, create_company_preferences
class RoutingManager {

  constructor(addresses, preferences) {
    this.addresses = observable(addresses);
    this.init(preferences);
  }

  /* Make sure we have empty default preferences */
  init(preferences) {

    if(!preferences) {
      preferences = {};
    }

    if(!preferences.defaultAddress) {
      preferences.defaultAddress = null;
    }

    if(!preferences.taxAddress) {
      preferences.taxAddress = null;
    }

    if(!preferences.addresses) {
      preferences.addresses = asMap({});
    }

    // Normalize incoming empty inputs
    this.preferences = observable(preferences);
  }

  getAddressPreferences(invoicingAddress) {

    if(!invoicingAddress) {
      throw new Error();
    }

    let preferences = this.preferences.addresses[invoicingAddress];

    if(!preferences) {
      // Default address prefs
      preferences = {
        receives: null,
        receivePreferences: [],
        foobar: "bar",
      };

      this.preferences.addresses[invoicingAddress] = observable(preferences);
    }

    return preferences;
  }

  canEnable(invoicingAddress) {
    // To enable the address we must have a flag from operator to allow it
    return this.addresses[invoicingAddress].receives;
  }

  // Is receiving enabled for an address
  isEnabled(invoicingAddress) {

    let addressPreferences = this.getAddressPreferences(invoicingAddress);

    console.log("Address ", invoicingAddress, " preferences ", addressPreferences);

    // No user set preference
    if(addressPreferences.receives === null) {
      return true;
    }

    // User set preference
    return addressPreferences.receives && true || false;
  }

  @action setEnabled(invoicingAddress, status) {
    let preferences = this.getAddressPreferences(invoicingAddress);
    console.log("Old preferences ", invoicingAddress, preferences);
    preferences.receives = status;
    console.log("New preferences ", preferences);
  }

  isDefault(invoicingAddress) {
    return invoicingAddress == this.preferences.defaultAddress;
  }

  @action setDefault(invoicingAddress) {
    console.log("Old default ", this.preferences.defaultAddress, this.preferences);
    this.preferences.defaultAddress = invoicingAddress;
    console.log("New default ", this.preferences.defaultAddress);
  }

  isTaxPreferential(invoicingAddress) {
    return this.preferences.taxAddress == invoicingAddress;
  }

  @action setTaxPreferential(invoicingAddress) {
    this.preferences.taxAddress = invoicingAddress;
  }

  getRoutingTable() {

    return Object.entries(this.addresses).map((tuple) => {
      let [address, data] = tuple;

      let isDefault = this.isDefault(address);
      let isTax = this.isTaxPreferential(address);
      let isEnabled = this.isEnabled(address);
      let canEnable = this.canEnable(address);
      let notes = this.preferences.addresses[address] || "";

      return {
        address: address,
        operatorName: data.operatorName,
        isDefault: isDefault,
        isTax: isTax,
        notes: notes,
        isEnabled: isEnabled,
        canEnable: canEnable
      };
    });
  }

  getCompanyPreferencesJSON() {
    let preferences = toJS(this.preferences);
    return JSON.stringify(preferences);
  }

}

export default RoutingManager;