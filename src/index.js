import React from 'react';
import ReactDOM from 'react-dom';
import Store from './Store';
import App from './components/App';

import Bootstrap from './bootstrap/css/bootstrap.css';
import FontAwesome from './fontawesome/css/font-awesome.css';
import style from './main.css';

const root = document.createElement('div');
root.id = 'app';
document.body.appendChild(root);

const store = new Store();

ReactDOM.render(
  <App store={store} />,
  document.querySelector('#app')
);
