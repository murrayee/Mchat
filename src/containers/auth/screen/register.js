/**
 * Created by bear on 2017/7/23.
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {
    Text,
    ScrollView,
    View,
    Alert,
    TouchableOpacity
} from 'react-native';
import * as  auth from "../../../actions/auth"
import {connect} from 'react-redux'
import {Button, InputItem} from 'antd-mobile'
import {authStyles} from '../styleSheet/index'
@connect(
    state => {
        return {...state.auth}
    },
    dispatch => bindActionCreators({...auth}, dispatch)
)
export  default class Register extends Component {
    static navigationOptions = {
        headerStyle: {
            position: "absolute",
            top: 0,
        }
    }
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            password: ''
        };
    }
    _onClickLogin = () => {
        const {userSingUp, navigation} = this.props
        let username = this.state.username
        let password = this.state.password
        if (username === '' || password === '') {
            Alert.alert("用户名或者密码不能为空");
            return false
        }
        userSingUp({username, password}, navigation)
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
                    <Text style={authStyles.title}>注册</Text>
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
                        注册
                    </Button>
                    <TouchableOpacity onPress={() => this.showActionSheet()} style={authStyles.forget}>
                        <Text style={authStyles.color}/>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

}
