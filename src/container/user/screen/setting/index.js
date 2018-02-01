/**
 * Created by bear on 2017/6/28.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ScrollView,
    Platform,
    DeviceEventEmitter


} from 'react-native'
import {NavigationActions} from 'react-navigation'
import {connect} from 'react-redux'

import {loginOut} from '../../../action/login'

import {WhiteSpace, Button, List, ActionSheet, Toast} from 'antd-mobile';
import {storage} from '../../../utils/asyncStorage'

const Item = List.Item;
const Brief = Item.Brief;

class Setting extends Component {
    constructor() {
        super();
        this.timer = null
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('navigatorBack', () => {
            Toast.hide();
        });
    }

    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners('navigatorBack');
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
    loginOut = (index) => {

        if (index == 0) {

            // const {dispatch}=this.props
            Toast.loading('正在退出...', 1, () => {
                console.log('Load complete !!!');
            });


            const {navigation, dispatch} = this.props

            dispatch(loginOut())
            // storage.clearMap();
            this.timer = setTimeout(() => {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    key: null,
                    actions: [
                        NavigationActions.navigate({routeName: 'login'})
                    ]
                })
                this.props.navigation.dispatch(resetAction)

            }, 2000)

        }

    }
    showActionSheet = () => {
        const BUTTONS = ['退出', '取消'];
        ActionSheet.showActionSheetWithOptions({
                // title: '标题',
                message: '退出后,您将收不到离线消息',
                options: BUTTONS,
                cancelButtonIndex: 1,
                destructiveButtonIndex: 0,
            },
            (buttonIndex) => {
                this.loginOut(buttonIndex)
            });
    }

    render() {
        const {navigation} = this.props
        return (
            <ScrollView style={{backgroundColor: "rgb(240,241,241)"}}
                        automaticallyAdjustContentInsets={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>

                    <WhiteSpace/>
                    <List >
                        <Item
                            arrow="horizontal"
                        >
                            修改密码
                        </Item>

                    </List>
                    <WhiteSpace/>
                    <List >
                        <Item
                            extra={`${'已开启'}`}
                            arrow="horizontal"
                        >
                            消息通知

                        </Item>
                        <Item
                            arrow="horizontal"
                        >
                            聊天记录
                        </Item>

                    </List>
                    <WhiteSpace/>
                    <List>
                        <Item
                            extra={`${'简体中文'}`}
                            arrow="horizontal"
                        >
                            语言选择

                        </Item>
                        <Item
                            extra={<Image
                                source={{uri: 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png'}}
                                style={{width: 20, height: 20}}
                            />}
                            arrow="horizontal"
                        >
                            主题选择
                        </Item>

                    </List>
                    <WhiteSpace/>
                    <List>
                        <Item
                            arrow="horizontal"
                        >
                            隐私
                        </Item>

                    </List>
                    <WhiteSpace/>
                    <List>
                        <Item
                            arrow="horizontal"
                        >
                            意见与反馈
                        </Item>
                        <Item
                            arrow="horizontal"
                        >
                            关于
                        </Item>
                        <Item
                            arrow="horizontal"
                        >
                            清除缓存
                        </Item>

                    </List>
                    <WhiteSpace/>
                    <List>
                        <Item

                            onClick={() => this.showActionSheet()}
                        >
                            <Brief style={{textAlign: 'center', color: "black"}}>退出当前账号</Brief>
                        </Item>


                    </List>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',

    },
    ListInfo: {
        padding: 8,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e9',
        borderTopWidth: 1,
        borderTopColor: '#e8e8e9',
    },
    extra: {
        fontSize: 14,
        color: "#919191"

    },
    head: {
        lineHeight: 25

    },
    Item: {

        fontSize: 16
    }

});
const mapStateToPropsa = (state) => {
    "use strict";


    return {...state}


}


export default  connect()(Setting)
