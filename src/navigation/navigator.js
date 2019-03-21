"use strict";

import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
import message from "@containers/contact/message";
import dynamic from "@containers/dynamic/dynamic";
import application from "@containers/application";
import contacts from "@containers/contact/contacts";
import user from "@containers/user/user";
import login from "@containers/user/login";
import register from "@containers/user/register";
import loading from "@containers/authorized/loading";
import guide from "@containers/authorized/guide";
import chat from "@containers/contact/chat";
import contactProfile from "@containers/contact/profile";
import userProfile from "@containers/user/profile";
import setting from "@containers/user/setting";
import search from "@containers/contact/search";

import {
  headerOptions,
  tabOptions,
  TabNavigatorConfig,
  StackNavigatorConfig
} from "./config";

/* The screens you add to IOS_MODAL_ROUTES will have the modal transition.  */

const createTabStack = (key, value) =>
  createStackNavigator({
    [key]: {
      screen: value,
      navigationOptions: props => headerOptions(props)
    }
  });

const tabs = createBottomTabNavigator(
  {
    message: {
      screen: createTabStack("message", message),
      path: "message",
      navigationOptions: props =>
        tabOptions({
          props,
          icon: "ios-paw",
          activeIcon: "ios-paw",
          label: "消息"
        })
    },
    contacts: {
      screen: createTabStack("contacts", contacts),
      path: "contacts",
      navigationOptions: props =>
        tabOptions({
          props,
          icon: "ios-people",
          activeIcon: "ios-people",
          label: "联系人"
        })
    },
    dynamic: {
      screen: createTabStack("dynamic", dynamic),
      path: "dynamic",
      navigationOptions: props =>
        tabOptions({
          props,
          icon: "dongtaixuanzhong",
          activeIcon: "dongtaiweixuanzhong",
          label: "动态",
          extend: true
        })
    },
    application: {
      screen: createTabStack("application", application),
      path: "application",
      navigationOptions: props =>
        tabOptions({
          props,
          icon: "ios-keypad",
          activeIcon: "ios-keypad",
          label: "应用"
        })
    },
    user: {
      screen: createTabStack("user", user),
      path: "user",
      navigationOptions: props =>
        tabOptions({
          props,
          icon: "ios-contact",
          activeIcon: "ios-contact",
          label: "我的"
        })
    }
  },
  TabNavigatorConfig({
    lazy: true,
    initialRouteName: "message"
  })
);

const app = createStackNavigator(
  {
    tabs: {
      screen: tabs,
      navigationOptions: props =>
        headerOptions({
          ...props,
          visible: false
        })
    },
    search: {
      screen: search,
      navigationOptions: props =>
        headerOptions({
          ...props,
          visible: false
        })
    },
    chat: {
      screen: chat,
      navigationOptions: props =>
        headerOptions({
          ...props,
          back: true,
          title: `${props.navigation.state.params.profile.username}`
        })
    },
    contactProfile: {
      screen: contactProfile,
      navigationOptions: props =>
        headerOptions({
          ...props,
          back: true,
          headerTransparent: true
        })
    },
    userProfile: {
      screen: userProfile,
      navigationOptions: props =>
        headerOptions({
          ...props,
          back: true,
          headerTransparent: true
        })
    },
    setting: {
      screen: setting,
      navigationOptions: props =>
        headerOptions({
          ...props,
          back: true
        })
    }
  },
  StackNavigatorConfig({
    initialRouteName: "tabs"
  })
);

const authorization = createStackNavigator(
  {
    login: {
      screen: login,
      navigationOptions: props =>
        headerOptions({
          ...props,
          visible: false
        })
    },
    register: {
      screen: register,
      navigationOptions: props =>
        headerOptions({
          ...props,
          back: true,
          headerTransparent: true
        })
    }
  },
  StackNavigatorConfig({
    initialRouteName: "login"
  })
);

const Routers = createSwitchNavigator(
  {
    app: app,
    guide: guide,
    loading: loading,
    authorization: authorization
  },
  { initialRouteName: "loading" }
);

export default createAppContainer(Routers);
