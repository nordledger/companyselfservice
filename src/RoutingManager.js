


// See data.py, create_company_preferences
class RoutingManager {

  constructor(addresses, preferences) {
    this.addresses = addresses;

    // Normalize incoming empty inputs
    this.preferences = preferences || {};

    if(!this.preferences.addresses) {
      this.preferences.addresses = {
        defaultAddress: null,
        addresses: {}
      }
    }
  }

  canEnable(invoicingAddress) {
    // To enable the address we must have a flag from operator to allow it
    return this.addresses[invoicingAddress].receives;
  }

  // Is receiving enabled for an address
  isEnabled(invoicingAddress) {

    let addressPreferences = this.preferences.addresses[invoicingAddress];

    if(!this.addresses[invoicingAddress]) {
      throw new Error("Trying to check " + invoicingAddress + " has:" + this.addresses)
    }

    if(!this.addresses[invoicingAddress].receives) {
      return false;
    }

    if(!addressPreferences) {
      return true;
    }

    // No user set preference
    if(addressPreferences.receives === undefined) {
      return true;
    }

    // User set preference
    return addressPreferences.receives && true || false;
  }

  setEnabled(invoicingAddress, status) {
    this.preferences.addresses[invoicingAddresses].receives = status;
  }

  setTaxPreferential(invoicingAddresses, enabled) {
    if(enabled) {
      this.preferences.addresses[invoicingAddresses].receivePreferences = ["tax"];
    } else {
      this.preferences.addresses[invoicingAddresses].receivePreferences = [];
    }
  }

  getReceivePreferences(invoicingAddress) {
    let preferences = this.preferences.addresses[invoicingAddress];
    if(!preferences) {
      return [];
    }
    return preferences.receivePreferences;
  }

  isDefault(invoicingAddress) {
    return invoicingAddress = this.preferences.defaultAddress;
  }

  isTaxPreferential(invoicingAddress) {
    let receivePreferences = this.getReceivePreferences(invoicingAddress);
    return receivePreferences.includes("tax");
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

}

export default RoutingManager;