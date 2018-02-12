/**
 * Created by bear on 2017/12/12.
 */
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
// msg pages
import Message from '../containers/message/screen/index'
// dyn pages
import Dynamic from '../containers/dynamic/screen/index'
// app pages
import Application from '../containers/application/screen/index'
// contact pages
import Contact from '../containers/contact/screen/index'
//user pages
import User from '../containers/user/screen/index'
import UserInfo from '../containers/user/screen/userInfo'
import Setting from '../containers/user/screen/setting'
// auth pages
import Login from '../containers/auth/screen/login'

import {headerOptions, RouteConfigs, TabNavigatorConfig, StackNavigatorConfig} from "./config"
const TabBarText = {
    Message: "消息",
    Contact: "联系人",
    Dynamic: "动态",
    Application: "应用",
    User: "我的",
}
const Tabs = TabNavigator(
    {
        Message: {
            screen: Message,
            path: "message",
            navigationOptions: props => {
                return RouteConfigs({
                    props,
                    icon: "ios-chatboxes",
                    activeIcon: 'ios-chatboxes-outline',
                    label: TabBarText.Message,
                    headerTitle: '消息中心'

                })
            },
        },
        Contact: {screen: Contact},
        Dynamic: {screen: Dynamic},
        Application: {screen: Application},
        User: {
            screen: User,
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

        initialRouteName: "Message",
        tabBarComponent: TabBarBottom,  //解决安卓底栏不显示图标问题
    }),
)
const Navigation = StackNavigator(
    {
        Tabs: {screen: Tabs},
        userInfo: {
            screen: UserInfo,
            navigationOptions: props => {
                return headerOptions({
                    ...props,
                    ...{ back: true}
                })
            }
        },
        setting: {
            screen: Setting,
            navigationOptions: props => {
                return headerOptions({
                    ...props,
                    ...{ back: true}
                })
            }
        },
        login: {
            screen: Login,
            navigationOptions: props => {
                return headerOptions({
                    ...props,
                    // ...{ back: true}
                })
            }
        },

    },
    StackNavigatorConfig({
        initialRouteName: "Tabs"
    }),
)
export default Navigation;
