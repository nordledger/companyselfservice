import Web3 from 'web3';

import contracts from "./contracts";
import {waitTx} from "./utils";

/**
 * Smart contract connection wrapper.
 */
class ContractWrapper {

  constructor(url, address) {
    this.url = url;
    this.address = address;
    this.web3 = new Web3();
    this.web3.setProvider(new this.web3.providers.HttpProvider(this.url));
  }

  init(cb) {
    var abi = contracts.EInvoicingRegistry.abi;
    var EInvoicingRegistry = this.web3.eth.contract(abi);
    this.contract = EInvoicingRegistry.at(this.address);

    this.contract.version.call(function(error, value) {
      cb(error, value);
    });
  }

  /**
   * Query company core data, preferences and every address.
   *
   * @param vatId
   * @returns {{}}
   */
  queryCompanyResultsSync(vatId) {

    var data = {};
    var contract = this.contract;

    var coreData = contract.getBusinessInformation(vatId, 4);

    data.vatId = vatId;

    if(coreData) {
      coreData = JSON.parse(coreData);
      data.businessInformation = coreData;

      data.addresses = {};

      var bigNum = contract.getInvoicingAddressCount(vatId);

      var addressCount = bigNum.toNumber();

      console.log("Found ", addressCount, " addresses");

      for(var i=0; i<addressCount; i++) {
        var address = contract.getInvoicingAddressByIndex(vatId, i);

        var addressData = contract.getAddressInformation(address, 5); // TiekeAddressData
        console.log("Got data ", addressData);

        if(addressData) {
            data.addresses[address] = JSON.parse(addressData);
        } else {
            data.addresses[address] = "No data available";
        }
      }
    } else {
        data.businessInformation = "No information available";
    }

    return data;
  }

  queryInvoiceAddressResultsSync(invoicingAddress) {
    var vatId = this.contract.getVatIdByAddress(invoicingAddress);
    return this.queryCompanyResultsSync(vatId);
  }

  queryCompanyPrefencesSync(vatId) {
    var data = this.contract.getCompanyPreferences(vatId);
    if(!data) {
      return {};
    } else {
      console.log("Parsing ", data);
      try {
        return JSON.parse(data);
      } catch(e) {
        return {};
      }

    }
  }

  /**
   * Perform a transaction to update company preferences.
   *
   * @param vatId Company vat ID
   * @param preferences Stringfied preferences
   * @param cb callback(err, response)
   */
  updateRoutingPreference(vatId, preferences, cb) {
    //this.contract.updateRoutingPreference.transaction(vatId, preferences, cb);
    let from = this.web3.eth.coinbase;
    let txOptions = {from, gas:1500000};

    if(typeof preferences != "string") {
      throw new Error();
    }

    console.log("updateRoutingPreferences", vatId, preferences);

    let txhash = this.contract.updateRoutingPreference(vatId, preferences, txOptions);
    waitTx(this.web3, txhash, cb);
  }

  /**
   * Create an address operated by an company themselves.
   *
   * @param vatId
   * @param address
   * @param cb callback(err, response)
   */
  createAddress(vatId, address, cb) {

    console.log("Creating address ", vatId, address);

    let web3 = this.web3;
    let contract = this.contract;

    function setData(success) {

      console.log("Setting address info", success);

      if(!success) {
        cb(success);
      }

      // Some example data
      let tiekeData = {
          "operatorName": "Self-maintained",
          "operatorId": "",
          "permissionToSend": true,
          "sends": true,
          "receives": true,
      };

      tiekeData = JSON.stringify(tiekeData);

      let from = web3.eth.coinbase;
      let txOptions = {from, gas:500000};

      let contentType = 5; // ContentType.TiekeAddressData
      let txhash = contract.setInvoicingAddressData(vatId, address, contentType, tiekeData, txOptions);
      cb(true);
    }

    function createAddress() {
      let from = web3.eth.coinbase;
      let txOptions = {from, gas:500000};
      let txhash = contract.createInvoicingAddress(vatId, address, txOptions);
      waitTx(web3, txhash, setData);
    }

    createAddress();
  }
}

export default ContractWrapper;
