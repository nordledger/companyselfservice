import { observable, computed, action, extendObservable } from 'mobx';
import Connection from './Connection';

class Store {

  name = 'companyselfservice';
  description = 'mobx is the best!';
  contractAddress = "0xf8c93043b63c2c13cd5537819fd5f54291fc86d3";

  @observable connected = false;
  @observable contractVersion = null;

  @observable numClicks = 0;

  @observable tab = "home";

  /** Search results */
  @observable resultVatId = null;
  results = {};

  @computed get oddOrEven() {
    return this.numClicks % 2 === 0 ? 'even' : 'odd';
  }

  @computed get rpcURL() {
    return "http://localhost:8545";
  }

  @computed get contract() {
    return this.connection.contract;
  }

  @action clickButton() {
    this.numClicks++;
  }

  @action updateTab(tab) {
    this.tab = tab;
  }

  @action setConnected(err, contractVersion) {
    if(err) {
      this.connected = false;
    } else {
      this.connected = true;
      this.contractVersion = contractVersion;
    }
  }

  createConnection() {
    this.connection = new Connection(this.rpcURL, this.contractAddress);
    this.connection.init(this.setConnected.bind(this));
  }

  @action queryByVatId(vatId) {
    this.results = this.connection.queryCompanyResultsSync(vatId);
    this.resultVatId = this.results.vatId; // Hack to refresh results as plain JS objects
  }

  @action queryByInvoiceAddress(invoiceAddress) {
    this.results = this.connection.queryInvoiceAddressResultsSync(invoiceAddress);
    this.resultVatId = this.results.vatId; // Hack to refresh results as plain JS objects
  }
}

export default Store;
