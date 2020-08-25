/**
 * @Author: harsha
 * @Date:   2020-08-25T09:57:07+02:00
 * @Last modified by:   harsha
 * @Last modified time: 2020-08-25T12:31:10+02:00
 */

import React, {Component} from 'react';
import NavigationServices from './src/routes/Navigation';
import Routes from './src/routes/routes';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './src/reducers/index';

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes
          ref={(navigatorRef) => {
            NavigationServices.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}
