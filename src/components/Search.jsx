import React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';

function Search({ store }) {
  return (
    <div>
      <h1>Search and browser existing electric invoice address data</h1>

      <p>
        Choose from options above.
      </p>
    </div>
  );
}

Search.propTypes = {
  store: React.PropTypes.object,
};

export default observer(Search);
