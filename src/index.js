import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import allReducers from './store/reducers/allReducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
// import logger from 'redux-logger';
import * as serviceWorker from './serviceWorker';
import { AUTH_USER } from './store/actions/types/index';
import { ConnectedRouter } from 'connected-react-router'
import { routerMiddleware } from 'connected-react-router'
import { connectRouter } from 'connected-react-router'
import './index.css'
import { createBrowserHistory } from "history";


const history = createBrowserHistory();
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);
const store = createStore(
  combineReducers({
    ...allReducers,
    router: connectRouter(history),
  }),
  applyMiddleware(thunk, middleware, promise, /*logger*/)
);

const token = JSON.parse(localStorage.getItem('token'));
// if (token && token.access_token) {
if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppRouter />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
serviceWorker.unregister();