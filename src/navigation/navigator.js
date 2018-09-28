/**
 * Created by bear on 2017/12/12.
 */

import {
    createStackNavigator,
    createBottomTabNavigator,
    createSwitchNavigator
} from 'react-navigation';
import message from '../containers/message/screen/index'
import dynamic from '../containers/dynamic/screen/index'
import application from '../containers/application/screen/index'
import contact from '../containers/contact/screen/index'
import user from '../containers/user/screen/index'

import {
    headerOptions,
    RouteConfigs,
    TabNavigatorConfig,
    StackNavigatorConfig
} from "./config"

const TabBarText = {
    Message: "消息",
    Contact: "联系人",
    Dynamic: "动态",
    Application: "应用",
    User: "我的",
}
const Tabs = createBottomTabNavigator({
        message: {
            screen: message,
            path: "message",
            navigationOptions: props => {
                return RouteConfigs({
                    props,
                    icon: "ios-paw",
                    activeIcon: 'ios-paw-outline',
                    label: TabBarText.Message,
                    headerTitle: '消息中心'
                })
            },
        },
        contact: {
            screen: contact,
            path: "contact",
            navigationOptions: props => {
                return RouteConfigs({
                    props,
                    icon: "ios-people",
                    activeIcon: 'ios-people-outline',
                    label: TabBarText.Contact,
                    headerTitle: '联系人'
                })
            },
        },
        dynamic: {
            screen: dynamic,
            path: "dynamic",
            navigationOptions: props => {
                return RouteConfigs({
                    props,
                    icon: "dongtaixuanzhong",
                    activeIcon: 'dongtaiweixuanzhong',
                    label: TabBarText.Dynamic,
                    headerTitle: '动态',
                    // visible: false,
                })
            },

        },
        application: {
            screen: application,
            path: "application",
            navigationOptions: props => {
                return RouteConfigs({
                    props,
                    icon: "ios-keypad",
                    activeIcon: 'ios-keypad-outline',
                    label: TabBarText.Application,
                    headerTitle: '应用',
                })
            },

        },
        user: {
            screen: user,
            path: "user",
            navigationOptions: props => {
                return RouteConfigs({
                    props,
                    icon: "ios-contact",
                    activeIcon: 'ios-contact-outline',
                    label: TabBarText.User,
                    headerTitle: '我的'

                })
            },
        },
    },
    TabNavigatorConfig({
        lazy: true,
        initialRouteName: "message",
    }),
);

const App = createStackNavigator({
        tabs: {
            screen: Tabs
        },
    },
    StackNavigatorConfig({
        initialRouteName: 'tabs'
    })
);

const Routers = createSwitchNavigator({
        App: App,
    },
    {initialRouteName: 'App'});
export default Routers;