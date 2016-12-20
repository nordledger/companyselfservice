import React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';

function About({ store }) {
  return (
    <div>
      <h1>Electronic invoice registration demo</h1>

      <p>
        Copyright 2016 Nordledger Oü
      </p>

      <p>
        Electronic invoicing regisrty contract address is <strong>{store.contractAddress}</strong>, version {store.contractVersion}
      </p>

      <p>
        <a href="http://github.com/nordledger/">Source code available on Github</a>
      </p>
    </div>
  );
}

About.propTypes = {
  store: React.PropTypes.object,
};

export default observer(About);
