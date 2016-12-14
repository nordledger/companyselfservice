


// See data.py, create_company_preferences
class RoutingManager {

  constructor(addresses, preferences) {
    this.addresses = addresses;
    this.preferences = preferences;
  }

  canEnable(invoicingAddress) {
    // To enable the address we must have a flag from operator to allow it
    return this.addresses[invoicingAddress].receives;
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

}

export default RoutingManager;