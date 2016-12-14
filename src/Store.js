import { observable, computed, action, extendObservable } from 'mobx';
import ContractWrapper from './ContractWrapper';




class Store {

  name = 'companyselfservice';
  description = 'mobx is the best!';
  contractAddress = "0xf8c93043b63c2c13cd5537819fd5f54291fc86d3";

  @observable connected = false;
  @observable contractVersion = null;

  @observable numClicks = 0;

  @observable tab = "home";
  @observable loggedIn = false;

  loggedInVatId = null;

  /** Search results */
  @observable resultVatId = null;
  results = {};

  /* Show company when it is being updated */
  @observable editCompanyVatId = null;
  editCompanyDetails = {};

  @computed get oddOrEven() {
    return this.numClicks % 2 === 0 ? 'even' : 'odd';
  }

  @computed get rpcURL() {
    return "http://localhost:8545";
  }

  @computed get contract() {
    return this.contractWrapper.contract;
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
    this.contractWrapper = new ContractWrapper(this.rpcURL, this.contractAddress);
    this.contractWrapper.init(this.setConnected.bind(this));
  }

  @action queryByVatId(vatId) {
    this.results = this.contractWrapper.queryCompanyResultsSync(vatId);
    this.resultVatId = this.results.vatId; // Hack to refresh results as plain JS objects
  }

  @action queryByInvoiceAddress(invoiceAddress) {
    this.results = this.contractWrapper.queryInvoiceAddressResultsSync(invoiceAddress);
    this.resultVatId = this.results.vatId; // Hack to refresh results as plain JS objects
  }

  @action login(vatId) {
    if(vatId) {
      this.loggedIn = true;
      this.loggedInVatId = vatId;
    }
  }

  @action logout() {
    this.loggedIn = false;
  }

  @action loadCompanyDetails(vatId) {

    let companyDetails = this.contractWrapper.queryCompanyResultsSync(vatId);
    this.editCompanyDetails = companyDetails;

    let preferences = this.contractWrapper.queryCompanyPrefencesSync(vatId);
    this.editCompanyDetails.preferences = preferences;

    this.editCompanyVatId = vatId;
    console.log(vatId);
  }
}

export default Store;
