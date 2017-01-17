import React from 'react';
import { observer } from 'mobx-react';
import Login from './Login';
import InvoicingDashboard from './InvoicingDashboard';


function Invoicing({ store }) {

  if(!store.loggedIn) {
    return (
      <Login store={store} message="Send and receive electronic invoices over blockchain" />
    );
  } else {
    return <InvoicingDashboard store={store} />
  }
}

Invoicing.propTypes = {
  store: React.PropTypes.object,
};

export default observer(Invoicing);
