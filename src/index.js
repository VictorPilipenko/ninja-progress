import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import allReducers from './reducers/allReducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger';
import * as serviceWorker from './serviceWorker';
import { AUTH_USER } from './actions/types/index';
import createHistory from "history/createBrowserHistory";
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from "react-router-redux";
import './styles/styles.scss';
import './components/bundle.scss';

const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);
const store = createStore(
  combineReducers({
    ...allReducers,
    router: routerReducer
  }),
  applyMiddleware(thunk, middleware, promise, logger)
);

const token = JSON.parse(localStorage.getItem('token'));
if (token && token.access_token) {
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