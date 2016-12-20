import React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';

function Home({ store }) {
  return (
    <div>

      <h1>Electronic invoice registration demo</h1>

      <p><a href="#update">Update your company invoicing address data</a> or <a href="#">browse companies registry</a>.</p>

    </div>
  );
}

Home.propTypes = {
  store: React.PropTypes.object,
};

export default observer(Home);
