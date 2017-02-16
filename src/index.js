import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import debounce from 'lodash/debounce';
import rootReducer from './reducers/rootReducer';
import config from './config';

import './index.css';

axios.interceptors.request.use(request => {
  if (request.url.match(/api.vimeo.com/i)) {
    delete request.headers['x-auth'];
  }
  return request;
});

axios.defaults.baseURL = config.config.apiURL;

// const LOCALSTORAGE_KEY = 'gallery';
// let persistedState = {};

// try {
//   let data = localStorage.getItem(LOCALSTORAGE_KEY);
//   persistedState = JSON.parse(data) || {};
// } catch (e) {
//   console.error('Wrong data in localStorage');
// }

injectTapEventPlugin();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  )
);

// const storePersistor = debounce(() => {
//   const state = store.getState();
//   const movies = { movies: state.movies };
//   try {
//     localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(movies));
//   } catch (e) {
//     console.error(`Can't save to localStorage`);
//   }
// }, 500);

// store.subscribe(storePersistor);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
