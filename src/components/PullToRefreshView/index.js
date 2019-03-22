"use strict";

import {Platform} from "react-native";

import {PullToRefreshViewIos} from "./pullToRefreshView.ios";
import {PullToRefreshViewAndroid} from "./pullToRefreshView.android";

export const PullToRefreshView = Platform.OS === "android" ? PullToRefreshViewAndroid : PullToRefreshViewIos;


