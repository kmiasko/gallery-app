import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import debounce from 'lodash/debounce';
import rootReducer from './reducers/rootReducer';

import './index.css';

const LOCALSTORAGE_KEY = 'gallery';
let persistedState = {};

try {
  let data = localStorage.getItem(LOCALSTORAGE_KEY);
  persistedState = JSON.parse(data) || {};
} catch (e) {
  console.error('Wrong data in localStorage');
}

injectTapEventPlugin();

const store = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

const storePersistor = debounce(() => {
  const state = store.getState();
  const movies = { movies: state.movies };
  try {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(movies));
  } catch (e) {
    console.error(`Can't save to localStorage`);
  }
}, 500);

store.subscribe(storePersistor);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
