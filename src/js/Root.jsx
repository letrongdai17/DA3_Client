/* eslint import/no-extraneous-dependencies: 0 */
import React from 'react';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import './config';
import configureStore from './store/configureStore';
import Dummy from './containers/Dummy';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/dummy" component={Dummy} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Root;
