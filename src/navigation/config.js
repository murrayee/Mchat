/**
 * Created by bear on 2018/2/5.
 */
import React from "react"
import {View, StyleSheet} from "react-native"
// import CardStackStyleInterpolator from "react-navigation/src/views/CardStack/CardStackStyleInterpolator"
import Icon from "react-native-vector-icons/Ionicons"
const activeTabColor = "#f2645d"
const defaultTabColor = "#7a86a2"
export const headerOptions = props => {
    const {navigation, navigationOptions, visible = true, back = false, right = false, title = ''} = props
    const {goBack} = navigation
    const headerLeft = back && <View />
    const headerRight = right && <View />
    const header = visible === false ? null : undefined
    return {
        // headerLeft,
        // headerRight,
        header,
        title,
        headerBackTitle: null,
        headerTintColor: '#6f6f6f',
        headerTitleStyle: {fontSize: 16, alignSelf: "center", color: "black"},
        headerStyle: {
            height: 44,
            backgroundColor: "#fff",
        },
        ...navigationOptions,
    }
}
export const RouteConfigs = options => {
    const {icon = null, activeIcon = null, label = null, props, headerTitle} = options

    return {
        ...headerOptions(props),
        headerTitle,
        tabBarLabel: label,
        tabBarIcon: ({focused}) => {
            const IcoName = focused ? icon : activeIcon
            const IcoColor = focused ? activeTabColor : defaultTabColor
            return label === '动态' ?
                <View style={styles.tabMark}>
                    <Icon name={IcoName} size={40} style={{color: IcoColor}}/>
                </View>
                : <Icon name={IcoName} size={26} style={{color: IcoColor}}/>
        },
    }
}
export const TabNavigatorConfig = options => {
    const {
        initialRouteName: InitialRouteName = "",
        tabBarPosition: TabBarPosition = "bottom",
        swipeEnabled: SwipeEnabled = false,
        scrollEnabled: ScrollEnabled = false,
        animationEnabled: AnimationEnabled = false,
        showIcon: ShowIcon = true,
    } = options

    return {
        lazy: true,
        initialRouteName: InitialRouteName,
        tabBarPosition: TabBarPosition,
        swipeEnabled: SwipeEnabled,
        scrollEnabled: ScrollEnabled,
        animationEnabled: AnimationEnabled,
        backBehavior: "none",
        tabBarOptions: {
            labelStyle: {
                margin: 0,
                padding: 0,
                fontSize: 12,
            },
            style: {
                borderTopColor:'#e5e5e5',
                backgroundColor: "#fff",
                opacity: 0.95
            },
            pressColor: "#e5e5e5",
            pressOpacity: 0.3,
            indicatorStyle: {
                height: 0,
            },
            inactiveTintColor: defaultTabColor,
            activeTintColor: activeTabColor,
            showLabel: true,
            showIcon: ShowIcon,
            upperCaseLabel: false,
        },
    }
}
export const StackNavigatorConfig = options => {
    const {initialRouteName: InitialRouteName = ""} = options
    return {
        initialRouteName: InitialRouteName,
        mode: "card", // 页面跳转方式 card - 原生系统默认的的跳转;modal - 只针对iOS平台，模态跳转
        headerMode: "screen", // float - 渐变，类似iOS的原生效果;screen - 标题与屏幕一起淡入淡出;none - 没有动画
        cardStyle: {backgroundColor: "#f0f1f1"}, // 为各个页面设置统一的样式，比如背景色，字体大小等
        // transitionConfig: () => ({
        //     // 配置页面跳转的动画，覆盖默认的动画效果
        //     screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        // }),
    }
}

const styles = StyleSheet.create({
    tabMark: {
        width:40,
        height:40,
        borderRadius:45,
        // borderWidth:0.5,
        margin:0,
        padding:0,
        overflow:'hidden',
        alignItems:'center',
        // borderColor:'red',
        backgroundColor:"#fff",
        marginTop:-20,

    }

})
