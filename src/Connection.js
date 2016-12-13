import Web3 from 'web3/lib/web3';

/**
 * Smart contract connection.
 */
class Connection {

  constructor(url, address) {
    this.url = url;
    this.address = address;
    this.web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider(this.url));
  }

  init(cb) {

  }

}

export default Connection;
