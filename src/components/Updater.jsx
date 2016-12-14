import React from 'react';
import { observer } from 'mobx-react';
import Login from './Login';
import UpdaterDashboard from './UpdaterDashBoard';


function Updater({ store }) {

  if(!store.loggedIn) {
    return (
      <Login store={store} />
    );
  } else {
    return <UpdaterDashboard store={store} />
  }
}

Updater.propTypes = {
  store: React.PropTypes.object,
};

export default observer(Updater);
