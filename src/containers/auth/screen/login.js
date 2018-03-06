/**
 * Created by bear on 2017/7/23.
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {
    Text,
    ScrollView,
    Alert,
    Image,
    View,
    TouchableOpacity
} from 'react-native';
import * as  auth from "../../../actions/auth"
import {connect} from 'react-redux'
import {Button, InputItem, ActionSheet, WhiteSpace} from 'antd-mobile'
import {authStyles} from '../styleSheet/index'
@connect(
    state => {
        return {...state.auth}
    },
    dispatch => bindActionCreators({...auth}, dispatch)
)
export  default class Authorize extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            username: 'admin',
            password: '123456'
        }
    }
    _onClickLogin = () => {
        const {userLogin, navigation} = this.props
        let username = this.state.username
        let password = this.state.password
        if (username === '' || password === '') {
            Alert.alert("用户名或者密码不能为空");
            return false
        }
        userLogin({username, password}, navigation)
    }
    showActionSheet = () => {
        const BUTTONS = ['手势登录', '遇到问题？', '注册', '取消'];
        const {navigation} = this.props;
        ActionSheet.showActionSheetWithOptions({options: BUTTONS, cancelButtonIndex: 3},
            (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                    case 1:
                        break;
                    case 2:
                        navigation.navigate('register');
                        break;
                    default:
                        break;
                }
            });
    }
    render() {
        return (
            <ScrollView
                contentContainerStyle={authStyles.contentContainer}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps='never'
                scrollEnabled={false}
            >
                <View style={authStyles.itemInfo}>
                    <Image source={{uri: 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png'}}
                           style={authStyles.heads}/>
                </View>
                <View style={authStyles.itemInfo}>
                    <InputItem
                        style={authStyles.inputItem}
                        clear
                        type="text"
                        value={this.state.username}
                        onChange={(value) => {
                            this.setState({username: value,});
                        }}
                        placeholder="请输入用户名"
                    >
                        姓名
                    </InputItem>
                    <InputItem
                        style={authStyles.inputItem}
                        clear
                        type="password"
                        value={this.state.password}
                        onChange={(value) => {
                            this.setState({password: value,});
                        }}
                        placeholder="请输入登录密码"
                    >
                        密码
                    </InputItem>
                    <Button
                        style={authStyles.button}
                        loading={this.state.loading}
                        disabled={this.state.disabled}
                        type="primary"
                        onClick={() => this._onClickLogin()}
                    >
                        登录
                    </Button>
                    <TouchableOpacity onPress={() => this.showActionSheet()} style={authStyles.forget}>
                        <Text style={authStyles.color}>忘记密码？</Text>
                    </TouchableOpacity>
                </View>
                <View style={authStyles.endItem}>
                    <TouchableOpacity onPress={() => this.showActionSheet()} style={authStyles.more}>
                        <Text style={authStyles.color}>更多</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}