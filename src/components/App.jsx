import React from 'react';
import { observer } from 'mobx-react';
import Main from "./Main";

@observer
class App extends React.Component {

  constructor(props) {
    super(props);
    this.store = props.store;
  }

  render() {
    return (
      <Main store={this.store} />
    );
  }
}

App.propTypes = {
  store: React.PropTypes.object,
};

export default App;
