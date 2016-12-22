/**
  * Watch for a particular transaction hash and call the awaiting function when done;
  * Ether-pudding uses another method, with web3.eth.getTransaction(...) and checking the txHash;
  */
export function waitTx(web3, txHash, callback) {

  var blockCounter = 15;
  // Wait for tx to be finished
  var filter = web3.eth.filter('latest').watch(function(err, blockHash) {
    if (blockCounter<=0) {
      filter.stopWatching();
      filter = null;
      console.warn('!! Tx expired !!');
      if (callback)
        return callback(false);
      else
        return false;
    }
    // Get info about latest Ethereum block
    var block = web3.eth.getBlock(blockHash);
    --blockCounter;
    // Found tx hash?
    if (block.transactions.indexOf(txHash) > -1) {
      // Tx is finished
      filter.stopWatching();
      filter = null;

      if (callback) {
        let receipt = web3.eth.getTransactionReceipt(txHash);
        let tx = web3.eth.getTransaction(txHash);

        // Contract threw an exception,
        // Out of gas caused by invalid jump,
        // currently the only way how smart contract can signal an error
        if(receipt.cumulativeGasUsed == tx.gas) {
          return callback(false);
        }

        return callback(true);
      } else {
        return true;
      }
    } else {
      // Tx hash not found yet?
      // console.log('Waiting tx..', blockCounter);
    }
  });
}
