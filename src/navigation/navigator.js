/**
 * Created by bear on 2017/12/12.
 */

import {
    StackNavigator,
    TabNavigator,
    TabBarBottom,
} from 'react-navigation';
// msg pages
import message from '../containers/message/screen/index'
import chat from '../containers/message/screen/chat'
// dyn pages
import dynamic from '../containers/dynamic/screen/index'
import article from '../containers/dynamic/screen/article'
import release from '../containers/dynamic/screen/release'

// app pages
import application from '../containers/application/screen/index'
import componentExample from '../containers/application/screen/componentExample'
import webApp from '../containers/application/screen/webApp'

// contact pages
import contact from '../containers/contact/screen/index'
import contactInfo from '../containers/contact/screen/contactInfo'
import search from '../containers/contact/screen/search'

//user pages
import user from '../containers/user/screen/index'
import userInfo from '../containers/user/screen/userInfo'
import setting from '../containers/user/screen/setting'
// auth pages
import login from '../containers/auth/screen/login'
import register from '../containers/auth/screen/register'

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
const Tabs = TabNavigator({
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
        tabBarComponent: TabBarBottom, //解决安卓底栏不显示图标问题
    }),
);
const Routers = StackNavigator({
        tabs: {
            screen: Tabs
        },
        userInfo: {
            screen: userInfo,
            navigationOptions: props => {
                return headerOptions({
                    ...props,
                    back: true
                })
            }
        },
        setting: {
            screen: setting,
            navigationOptions: props => {
                return headerOptions({
                    ...props,
                    back: true
                })
            }
        },
        login: {
            screen: login,
            navigationOptions: props => {
                return headerOptions({
                    ...props,
                    visible: false
                })
            }
        },
        register: {
            screen: register,
            navigationOptions: props => {
                return headerOptions({
                    ...props,
                    back: true
                })
            }
        },
        chat: {
            screen: chat,
            navigationOptions: props => {
                return headerOptions({
                    ...props,
                    back: true,
                    title: `${props.navigation.state.params.profile.username}`
                })
            }
        },
        contactInfo: {
            screen: contactInfo,
            navigationOptions: props => {
                return headerOptions({
                    ...props,
                    back: true
                })
            }
        },
        componentExample: {
            screen: componentExample,
            navigationOptions: props => {
                return headerOptions({
                    ...props,
                    back: false
                })
            }
        },
        webApp: {
            screen: webApp,
            navigationOptions: props => {
                return headerOptions({
                    ...props,
                    back: false
                })
            }
        },
        article: {
            screen: article,
            navigationOptions: props => {
                return headerOptions({
                    ...props,
                    back: false
                })
            }
        },
        release: {
            screen: release,
            navigationOptions: props => {
                return headerOptions({
                    ...props,
                    back: false
                })
            }
        },
        search: {
            screen: search,
            navigationOptions: props => {
                return headerOptions({
                    ...props,
                    back: false
                })
            }
        },
    },
    StackNavigatorConfig({
        initialRouteName: 'tabs'
    }),
);


export default Routers;