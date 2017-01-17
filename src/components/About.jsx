import React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';

function About({ store }) {

  let coinbase;

  try {
    coinbase = store.contractWrapper.web3.eth.coinbase;
  } catch(e) {
    coinbase = null;
  }

  return (
    <div>
      <h1>Electronic invoice registration demo</h1>

      <p>
        Copyright 2016 Nordledger Oü
      </p>

      <p>
        Electronic invoicing regisrty contract address is <strong>{store.contractAddress}</strong>, version <strong>{store.contractVersion}</strong>, coinbase account <strong>{coinbase}</strong>
      </p>

      <p>
        <a href="http://github.com/nordledger/">View source code on Github</a>
      </p>

    </div>
  );
}

About.propTypes = {
  store: React.PropTypes.object,
};

export default observer(About);
