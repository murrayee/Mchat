"use strict";

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  createReduxContainer,
  createNavigationReducer,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";

import NavigatorService from "../services/navigator";
import Routers from "./navigator";

export const navigationReducer = createNavigationReducer(Routers);

export const navigationMiddleware = createReactNavigationReduxMiddleware(
  state => state.nav,
  "root",
);

const AppWithNavigationState = createReduxContainer(Routers, "root");

@connect(({ app, router }) => ({ app, router }))
class AppNavigator extends PureComponent {
  render() {
    const { dispatch, router } = this.props;
    return (
      <AppWithNavigationState
        dispatch={dispatch}
        state={router}
        ref={el => NavigatorService.setContainer(el)}
      />
    );
  }
}

export default AppNavigator;
