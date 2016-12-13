import Web3 from 'web3';

import contracts from "./contracts";

/**
 * Smart contract connection.
 */
class Connection {

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
}

export default Connection;
