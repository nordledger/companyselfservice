import { observable, computed, action, extendObservable } from 'mobx';
import ContractWrapper from './ContractWrapper';


class Store {

  name = 'companyselfservice';
  description = 'mobx is the best!';

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

  @observable companyLoaded = false;

  @computed get oddOrEven() {
    return this.numClicks % 2 === 0 ? 'even' : 'odd';
  }

  @computed get rpcURL() {
    if(window.location.href.includes("demo.nordledger.com")) {
      // Proxied private geth instance
      return "http://demo.nordledger.com/eth"
    } else {
      return "http://localhost:8545";
    }
  }

  @computed get contractAddress() {
    if(window.location.href.includes("nordledger.com")) {
      // Deployment on the demo server
      return "0x4a018bfff8337b4fda41415b95f8411f70360506";
    } else {
      // Localhost dev env deployment
      return "0x82dede57f482c84215be43caa948c8910aba0904";
    }
  }

  @computed get contract() {
    return this.contractWrapper.contract;
  }

  @action clickButton() {
    this.numClicks++;
  }

  @action updateTab(tab) {
    console.log(tab);
    this.tab = tab;
  }

  @action setConnected(err, contractVersion) {
    if(err) {
      // Ghetto error
      alert("Could not connect to Ethereum node in " + this.rpcURL);
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
    this.editableCompanyVatId = null;
    this.editableCompany = null;
    this.companyLoaded = false;
  }

  @action loadCompanyDetails(vatId) {

    this.companyLoaded = false;

    let companyDetails = this.contractWrapper.queryCompanyResultsSync(vatId);
    this.editCompanyDetails = companyDetails;

    let preferences = this.contractWrapper.queryCompanyPrefencesSync(vatId);
    this.editCompanyDetails.preferences = preferences;

    this.editCompanyVatId = vatId;
    console.log(vatId);

    this.companyLoaded = true;
  }
}

export default Store;
