// 此文件在react-navigation 2.x 集成'redux'方案； 3.x不推荐用'redux'来管理路由状态；
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  reduxifyNavigator,
  createNavigationReducer,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import NavigatorService from '../services/navigator';
import Routers from './navigator';

export const navigationReducer = createNavigationReducer(Routers);
export const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
const AppWithNavigationState = reduxifyNavigator(Routers, 'root');


@connect(({ app, router }) => ({ app, router }))
class AppNavigator extends PureComponent {

  render() {
    const { dispatch, router } = this.props;
    return <AppWithNavigationState dispatch={dispatch} state={router} ref={(el) => NavigatorService.setContainer(el)}/>;
  }
}

export default AppNavigator;
