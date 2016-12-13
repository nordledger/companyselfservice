import React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';

function Home({ store }) {
  return (
    <div>
      <h1>Electronic invoice registration demo</h1>

      <p>
        Choose from options above.
      </p>
    </div>
  );
}

Home.propTypes = {
  store: React.PropTypes.object,
};

export default observer(Home);
