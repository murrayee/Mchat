/**
 * Created by bear on 2017/12/12.
 */


import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';


import Dynamic from '../container/dynamic/screen/index'
import Application from '../container/application/screen/index'
import Message from '../container/message/screen/index'
import User from '../container/user/screen/index'
import Contact from '../container/contact/screen/index'




const Tabs = TabNavigator({
    Message: { screen: Message },
    Contact: { screen: Contact },
    Dynamic: { screen: Dynamic },
    Application: { screen: Application },
    User: { screen: User },
}, {
    tabBarOptions: {
        activeTintColor: '#7a86a2',
        style: {
            backgroundColor: '#fff',
        },
    },
    lazy: true,                     //懒加载
    swipeEnabled: false,
    animationEnabled: false,        //关闭安卓底栏动画
    tabBarPosition: 'bottom',
    tabBarComponent: TabBarBottom,  //解决安卓底栏不显示图标问题
});

const Navigation = StackNavigator({
    Tabs: { screen: Tabs },

}, {
    initialRouteName: 'Tabs',
    navigationOptions: {
        headerStyle: {
            backgroundColor: 'white',
        },
        headerBackTitle: null,
        headerTintColor: 'black',
    },
    // transitionConfig: () => ({
    //   screenInterpolator: CardStackStyleInterpolator.forHorizontal, // 安卓导航进入 左右方式
    // }),
    headerMode: 'screen'
});

export default Navigation;