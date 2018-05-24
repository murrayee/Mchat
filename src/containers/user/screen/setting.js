/**
 * Created by bear on 2017/6/28.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    AsyncStorage
} from 'react-native'
import {connect} from 'react-redux'
import {WhiteSpace, List, ActionSheet, Toast} from 'antd-mobile';
// import NavigatorService from '../../../services/navigatorService';
const Item = List.Item;
const Brief = Item.Brief;
class Setting extends Component {
    constructor(props,context) {
        super(props,context);
        this.timer = null
    }
    loginOut = (index) => {
        if (index === 0) {
            Toast.loading('正在退出...', 1, () => {
                this.props.navigation.navigate('Auth')
            });
        }
    };
    showActionSheet = () => {
        const BUTTONS = ['退出', '取消'];
        ActionSheet.showActionSheetWithOptions({
                message: '退出后,您将收不到离线消息',
                options: BUTTONS,
                cancelButtonIndex: 1,
                destructiveButtonIndex: 0,
            },
            (buttonIndex) => {
                this.loginOut(buttonIndex)
            });
    };
    render() {
        return (
            <ScrollView style={{backgroundColor: "rgb(240,241,241)"}}
                        automaticallyAdjustContentInsets={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <WhiteSpace/>
                    <List>
                        <Item arrow="horizontal">修改密码</Item>
                    </List>
                    <WhiteSpace/>
                    <List>
                        <Item extra={`${'已开启'}`} arrow="horizontal">消息通知</Item>
                        <Item arrow="horizontal">聊天记录</Item>
                    </List>
                    <WhiteSpace/>
                    <List>
                        <Item extra={`${'简体中文'}`} arrow="horizontal">语言选择</Item>
                        <Item extra={
                            <Image source={{uri: 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png'}} style={{width: 20, height: 20}}/>}
                              arrow="horizontal"
                        >
                            主题选择
                        </Item>
                    </List>
                    <WhiteSpace/>
                    <List>
                        <Item arrow="horizontal">隐私</Item>
                    </List>
                    <WhiteSpace/>
                    <List>
                        <Item arrow="horizontal">意见与反馈</Item>
                        <Item arrow="horizontal">关于</Item>
                        <Item arrow="horizontal" onClick={() => AsyncStorage.clear()}>清除缓存</Item>
                    </List>
                    <WhiteSpace/>
                    <List>
                        <Item onClick={() => this.showActionSheet()}>
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


export default connect()(Setting)
