"use strict";

import React, { PureComponent } from "react";
import NavigatorService from "../services/navigator";
import Routers from "./navigator";

class AppNavigator extends PureComponent {
  render() {
    return <Routers ref={el => NavigatorService.setContainer(el)} />;
  }
}

export default AppNavigator;
