import { observable, computed, action } from 'mobx';
import Connection from './Connection';

class Store {

  name = 'companyselfservice';
  description = 'mobx is the best!';
  contractAddress = "0x780e1731d24d18aca068a1245cbb09b3a4086bb4";

  @observable connected = false;

  @observable numClicks = 0;

  @observable tab = "home";

  @computed get oddOrEven() {
    return this.numClicks % 2 === 0 ? 'even' : 'odd';
  }

  @computed get rpcURL() {
    console.log(window.location.host);
  }

  @action clickButton() {
    this.numClicks++;
  }

  @action updateTab(tab) {
    this.tab = tab;
  }

  @action setConnected(connected) {
    this.connected = connected;
  }

  createConnection() {
    this.connection = Connection(this.rpcURL, this.address);
    this.connection.init(this.setConnected.bind(this));
  }
}

export default Store;
