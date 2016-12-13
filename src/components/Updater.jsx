import React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';

function Updater({ store }) {
  const clickButton = store.clickButton.bind(store);
  return (
    <div>
      <Button bsStyle="primary" onClick={clickButton}>Click me!</Button>
      <h4>You've clicked the button {store.numClicks} times.</h4>
      <h5>You've clicked button an {store.oddOrEven} number of times.</h5>
    </div>
  );
}

Updater.propTypes = {
  store: React.PropTypes.object,
};

export default observer(Updater);
