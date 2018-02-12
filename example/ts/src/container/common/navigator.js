import React from 'react';
import {Platform, Button, Alert} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
// import {storage} from '../../utils/asyncStorage'

import Icon from 'react-native-vector-icons/Ionicons';
import ContactsList from '../contacts/screen/index'
import UserDetail from '../../component/userDetail'

import Dynamic from '../dynamic/screen/index'
import Application from '../application/screen/index'
import Auth from '../auth/screen/index'
import AuthCenter from '../auth/screen/authCenter'
import Setting from '../auth/screen/setting'

import SignIn from '../login/signIn'
import SignUp from '../login/signUp'
import HandIn from '../login/handIn'

import Chat from './chat'
import MessageList from '../message/screen/messageList'



const Login = StackNavigator(
    {
        signIn: {
            screen: SignIn,
            navigationOptions: {header: null}

        },
        signUp: {
            screen: SignUp,
            navigationOptions: ({navigation}) => ({
                headerBackTitle: "返回",
                cardStyle: {
                    backgroundColor: 'transparent'
                },
                headerStyle: {
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    height: 50,
                    top: 0,
                    left: 0,
                    right: 0,
                },
                headerTintColor: '#3D8EE2',
                headerBackTitleStyle: {
                    color: "#3D8EE2"
                }
            }),

        },
        handIn: {
            screen: HandIn,
            navigationOptions: {header: null}

        },

    }, {
        navigationOptions: {
            headerBackTitle: "返回"

        }
    }
)
const Message = StackNavigator(
    {
        messageList: {
            screen: MessageList,
            navigationOptions: {title: "消息"},

        },
        chat: {
            screen: Chat,
            navigationOptions: ({navigation}) => ({
                tabBarVisible: false,
                title: `${navigation.state.params.name}`,
                headerRight: (
                    <Button
                        title='编辑'
                        onPress={() => {
                            "use strict";
                            return false
                        }}
                    />
                ),
            }),
        },
    },
    {
        headerMode: "screen",
        navigationOptions: {
            headerBackTitle: "返回"

        }

    }
)


const Contacts= StackNavigator(
    {
        contactsList: {
            screen: ContactsList,
            navigationOptions: ({navigation}) => ({
                title: '联系人',

            }),


        },
        userDetail: {
            screen: UserDetail,
            navigationOptions: ({navigation}) => ({
                tabBarVisible: false,
                // title:"个人中心",
                cardStyle: {
                    backgroundColor: 'transparent'
                },
                headerStyle: {
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    height: 50,
                    top: 0,
                    left: 0,
                    right: 0,
                },
                headerTintColor: '#141414'
                // header:null
            }),
        },
        chat: {
            screen: Chat,
            navigationOptions: ({navigation}) => ({
                tabBarVisible: false,
                title: `${navigation.state.params.name}`,
                headerRight: (
                    <Button
                        title='编辑'
                        onPress={() => {
                            "use strict";
                            return false
                        }}
                    />
                ),
            }),
        },

    },
    {
        navigationOptions: {
            headerTintColor: '#141414',
            headerBackTitle: "返回",
            headerStyle: {

                backgroundColor: "white",
                // height:50,


            },
            headerBackTitleStyle: {

                color: "black",
                // fontSize:12,
                // fontWeight:200
            },

        },
        headerMode: "screen"

    }
)



const AuthMain = StackNavigator({
        messageList: {
            screen: Auth,
            navigationOptions: {title: "我的"},
        },
        authCenter: {
            screen: AuthCenter,
            navigationOptions: ({navigation}) => ({
                tabBarVisible: false,
                // title:"个人中心",
                cardStyle: {
                    backgroundColor: 'transparent'
                },
                headerStyle: {
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    height: 50,
                    top: 0,
                    left: 0,
                    right: 0,
                },
                headerTintColor: '#141414'
                // header:null
            }),
        },
        setting: {
            screen: Setting,
            navigationOptions: ({navigation}) => ({
                tabBarVisible: false,
                title: '设置',

            }),
        },
    },
    {
        navigationOptions: {
            headerTintColor: '#141414',
            headerBackTitle: "返回",
            headerStyle: {

                backgroundColor: "white",

            },
            headerBackTitleStyle: {

                color: "black"
            }

        },
        headerMode: "screen"

    }
)


const TabNav = TabNavigator(
    {
        message: {
            screen: Message,
            navigationOptions: {
                title: '消息',
                tabBarLabel: '消息',
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        name={focused ? 'ios-chatboxes' : 'ios-chatboxes-outline'}
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            },
        },
        contacts: {
            screen: Contacts,
            path: '/contacts',
            navigationOptions: {
                title: '联系人',
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        name={focused ? 'ios-people' : 'ios-people-outline'}
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            },
        },
        dynamic: {
            screen: Dynamic,
            navigationOptions: {
                title: '动态',
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        name={focused ? 'ios-add-circle' : 'ios-add-circle'}
                        size={45}
                        style={{color: tintColor, marginTop: -15}}
                    />
                ),
                // style:{backgroundColor:'red'}

            },

        },
        application: {
            screen: Application,
            navigationOptions: {
                title: '应用',
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        name={focused ? 'ios-apps' : 'ios-apps-outline'}
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            },
        },
        AuthMain: {
            screen: AuthMain,
            navigationOptions: {
                title: '我的',
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        name={focused ? 'ios-contact' : 'ios-contact-outline'}
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            },
        },

    },
    {
        lazy: true,
        initialRouteName: 'message',
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        // lazyLoad: false,
        // tabModel:'screen',
        tabBarOptions: {
            // loginRequired: ['collect', 'publish', 'message', 'mine'],
            activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',
            labelStyle: {
                fontSize: 12,
                paddingBottom: 3
            },
            style: {
                height: 50,
                backgroundColor: "white",
            }

        }
    }
);

const AppNavigator = StackNavigator({
        main: {
            screen: TabNav
        },
        login: {
            screen: Login
        }

    }
    , {
        initialRouteName: 'main',
        headerMode: "none",
        // headerTintColor: 'white',
        // cardStyle: {
        //     backgroundColor: "white"
        // }
        // mode: Platform.OS === 'ios' ? 'modal' : 'card'
    });

export  default AppNavigator