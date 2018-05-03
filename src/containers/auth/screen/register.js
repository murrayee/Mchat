/**
 * Created by bear on 2017/7/23.
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {
    Text,
    View,
    Alert,
    TouchableOpacity,
    SafeAreaView,
    TextInput
} from 'react-native';
import * as  auth from "../../../actions/auth"
import {connect} from 'react-redux'
import {Button, InputItem} from 'antd-mobile'
import {authStyles} from '../styleSheet/index'
import {Icon} from '../../../components/Icon'
@connect(
    state => {
        return {...state.auth}
    },
    dispatch => bindActionCreators({...auth}, dispatch)
)
export default class Register extends Component {
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
    _disabled=()=>{
        return !this.state.username&&!this.state.password
    }
    render() {
        return (
            <SafeAreaView style={authStyles.contentContainer}>
                <View style={authStyles.itemInfo}>
                    <Text style={authStyles.title}>注册</Text>
                </View>
                <View>
                    <View style={[authStyles.input]}>
                        <Text style={authStyles.inputTitle}> 账户 </Text>
                        <TextInput
                            style={authStyles.inputItem}
                            value={this.state.username}
                            onChange={v => {this.setState({username: v});}}
                            placeholder="请输入用户名"
                        />
                        <View style={authStyles.icon}/>
                    </View>

                    <View style={authStyles.input}>
                        <Text style={authStyles.inputTitle}> 密码 </Text>
                        <TextInput
                            style={authStyles.inputItem}
                            secureTextEntry={!this.state.ishPassword}
                            value={this.state.password}
                            onChange={v => {this.setState({password: v});}}
                            placeholder="请输入登录密码"
                        />
                        <View  style={authStyles.icon}>
                            <TouchableOpacity onPress={()=>this.setState({ishPassword:!this.state.ishPassword})}>
                                <Icon name={`iconfont|${this.state.ishPassword?'mimakejian':'iconfont32pxmimabukejian'}`} size={18} color={this.state.ishPassword?'#108ee9':'#704040'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={authStyles.button}>
                        <Button
                            style={{height: 40}}
                            loading={this.state.loading}
                            disabled={this._disabled}
                            type="primary"
                            onClick={() => this._onClickLogin()}>

                            注册
                        </Button>
                    </View>
                </View>
                <TouchableOpacity  style={authStyles.itemInfo}/>
            </SafeAreaView>
        );
    }

}
