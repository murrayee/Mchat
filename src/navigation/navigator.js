import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import message from '../containers/message/screen/index';
import dynamic from '../containers/dynamic/screen/index';
import application from '../containers/application/screen/index';
import contact from '../containers/contact/screen/index';
import user from '../containers/user/screen/index';

import {
  headerOptions,
  tabOptions,
  TabNavigatorConfig,
  StackNavigatorConfig,
} from './config';

const Tabs = createBottomTabNavigator({
    message: {
      screen: message,
      path: 'message',
      navigationOptions: props => ({
        ...tabOptions({
          props,
          icon: 'ios-paw',
          activeIcon: 'ios-paw',
          label: '消息',
        }),
      }),
    },
    contact: {
      screen: contact,
      path: 'contact',
      navigationOptions: props => ({
        ...tabOptions({
          props,
          icon: 'ios-people',
          activeIcon: 'ios-people',
          label: '联系人',
        }),
      }),
    },
    dynamic: {
      screen: dynamic,
      path: 'dynamic',
      navigationOptions: props => ({
        ...tabOptions({
          props,
          icon: 'dongtaixuanzhong',
          activeIcon: 'dongtaiweixuanzhong',
          label: '动态',
          extend: true,
        }),
      }),
    },
    application: {
      screen: application,
      path: 'application',
      navigationOptions: props => ({
        ...tabOptions({
          props,
          icon: 'ios-keypad',
          activeIcon: 'ios-keypad',
          label: '应用',
        }),
      }),
    },
    user: {
      screen: user,
      path: 'user',
      navigationOptions: props => ({
        ...tabOptions({
          props,
          icon: 'ios-contact',
          activeIcon: 'ios-contact',
          label: '我的',
        }),
      }),
    },
  },
  TabNavigatorConfig({
    lazy: true,
    initialRouteName: 'message',
  }),
);

const App = createStackNavigator({
    tabs: {
      screen: Tabs,
      navigationOptions: props => ({
        ...headerOptions({
          ...props,
          visible: false,
        }),
      }),
    },
  }, StackNavigatorConfig({
    initialRouteName: 'tabs',
  }),
);

const Routers = createSwitchNavigator({
    App: App,
  },
  { initialRouteName: 'App' });
export default Routers;