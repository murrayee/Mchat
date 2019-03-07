import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";
import session from "../containers/session/screen/index";
import dynamic from "../containers/dynamic/screen/index";
import application from "../containers/application/screen/index";
import contact from "../containers/contact/screen/index";
import user from "../containers/user/screen/index";
import login from "../containers/authorization/screen/login";
import register from "../containers/authorization/screen/register";
import authLoading from "../containers/authorization/screen/authLoading";
import guide from "../containers/guide/screen";
import chat from "../containers/session/screen/chat";
import contactInfo from "../containers/contact/screen/contactInfo";

import {
  headerOptions,
  tabOptions,
  TabNavigatorConfig,
  StackNavigatorConfig
} from "./config";

const createTabStack = (key, value) =>
  createStackNavigator({
    [key]: {
      screen: value,
      navigationOptions: props => headerOptions(props)
    }
  });

const tabs = createBottomTabNavigator(
  {
    session: {
      screen: createTabStack("session", session),
      path: "session",
      navigationOptions: props =>
        tabOptions({
          props,
          icon: "ios-paw",
          activeIcon: "ios-paw",
          label: "消息"
        })
    },
    contact: {
      screen: createTabStack("contact", contact),
      path: "contact",
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
    initialRouteName: "dynamic"
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
    chat: {
      screen: chat,
      navigationOptions: props =>
        headerOptions({
          ...props,
          back: true,
          title: `${props.navigation.state.params.profile.username}`
        })
    },
    contactInfo: {
      screen: contactInfo,
      navigationOptions: props =>
        headerOptions({
          ...props,
          back: true,
          headerTransparent: true
          // title: `${props.navigation.state.params.profile.username}`,
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
    authLoading: authLoading,
    authorization: authorization
  },
  { initialRouteName: "app" }
);

export default createAppContainer(Routers);
