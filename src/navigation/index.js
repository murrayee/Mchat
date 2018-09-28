import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import NavigatorService from '../services/navigatorService';
import Routers from './navigator';

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
export  const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
const AppWithNavigationState = reduxifyNavigator(Routers, 'root');

@connect(state => ({ state: state.nav }))
class AppNavigator extends Component {
  render() {
    return <AppWithNavigationState {...this.props} ref={(el) => NavigatorService.setContainer(el)}/>;
  }
}

export default AppNavigator;
