import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './assets/css/sass/main.scss';
import './assets/css/bootstrap.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers/config';

var CreateBrowserHistory = require('history').createBrowserHistory;

const store = createStore(rootReducer);

function getState() {
  store.dispatch({ type: 'GET_STATE' });
}
getState();

ReactDOM.render(
  <Provider store={store}>
    <App history={CreateBrowserHistory()} />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
