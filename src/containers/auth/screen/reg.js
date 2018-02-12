/**
 * Created by bear on 2017/7/23.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    PixelRatio,
    ScrollView,
    View,
    TextInput,
    Alert,
    StatusBar,
    Dimensions,
    Image,

} from 'react-native';
import {connect} from "react-redux"
// import {NavigationActions} from 'react-navigation'
import  {fetchSignUp} from "../../action/login"
import {Flex, Button, InputItem, WingBlank, WhiteSpace, ActionSheet} from 'antd-mobile'
import Icon from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get("window")
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "注册",
            disabled: false,
            loading: false,
            viewShow: false
        };

        this.timer = null;

    }

    //
    componentWillMount() {

        console.log(this.props)
        const {login} = this.props
        const {regBtnTxt, disabledreg, loadingreg} = login


        this.setState({
            loginBtnTxt: regBtnTxt,
            disabled: disabledreg,
            loading: loadingreg
        })

    }

    _onClickLogin = () => {
        this.setState({
            viewShow: true
        })

        const {dispatch} = this.props
        let username = this.state.username
        let  password = this.state.password
        if (username == '' || password == "") {

            Alert.alert("用户名或者密码不能为空！")

        } else {
             let data = {
                'username': username,
                'password': password
            }
            dispatch(fetchSignUp(data))
        }


    }

    render() {
        const {login} = this.props;
        const {regData} = login

        const viewMsg = () => {

            if (regData && regData.success) {

                return (
                    <View style={
                        {
                            marginLeft: 15,
                            flexDirection: 'row'
                        }
                    }>
                        <Icon
                            name='ios-checkmark-circle-outline'
                            size={20}
                            style={{color: "#3d8ee2"}}
                        />
                        <Text style={{color: "#3d8ee2", lineHeight: 20, marginLeft: 10}}>{regData.message}</Text>

                    </View>
                )
            } else if (regData.message) {

                return (
                    <View style={
                        {
                            marginLeft: 15,
                            flexDirection: 'row'
                        }
                    }>
                        <Icon
                            name='ios-close-circle-outline'
                            size={20}
                            style={{color: "red"}}
                        />
                        <Text style={{color: "red", lineHeight: 20, marginLeft: 10}}>{regData.message}</Text>

                    </View>
                )

            }


        }

        return (
            <ScrollView
                contentContainerStyle={{flex: 1}} // 非常重要，让ScrollView的子元素占满整个区域
                keyboardDismissMode="on-drag" // 拖动界面输入法退出
                keyboardShouldPersistTaps='never' // 点击输入法以外的区域，输入法退出 不加这两句也可以实现点击空白处收回键盘
                scrollEnabled={false} // 当值为false的时候，内容不能滚动，默认值为true
            >
                <StatusBar
                    hidden={true}

                />
                <View
                    style={styles.container}
                >
                    <Flex direction="column" style={{width: width, height: height}}>
                        <Flex.Item style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: width
                        }}>
                            <Text style={{fontSize: 30}}>注册</Text>
                        </Flex.Item>
                        <Flex.Item style={{
                            // justifyContent: 'center',
                            // alignItems: 'center',
                            width: width
                        }}>

                            <InputItem
                                style={{
                                    marginRight: 15

                                }}
                                clear
                                // value={}

                                onChange={(value) => {
                                    this.setState({
                                        username: value,
                                        viewShow: false
                                    });
                                }}
                                // labelNumber={2}
                                placeholder="请输入用户名"
                            >
                                姓名
                            </InputItem>
                            <InputItem
                                style={{
                                    marginRight: 15

                                }}
                                clear
                                type="password"
                                // value={}
                                onChange={(value) => {
                                    this.setState({
                                        password: value,
                                        viewShow: false
                                    });
                                }}
                                placeholder="请输入登录密码"
                            >
                                密码
                            </InputItem>
                            <Button
                                loading={this.state.loading}
                                disabled={this.state.disabled}
                                style={{
                                    margin: 15,
                                    height: 40

                                }}
                                onClick={() =>
                                    this._onClickLogin()
                                }
                                type="primary"
                            >
                                {
                                    this.state.text
                                }
                            </Button>
                            {
                                this.state.viewShow ? viewMsg() : <Text/>

                            }

                        </Flex.Item>
                        <Flex.Item
                            style={{
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                width: width
                            }}
                        >
                        </Flex.Item>
                    </Flex>
                </View>
            </ScrollView>
        );
    }


    componentWillReceiveProps(np) {
        const {login, navigation} = np
        const {regStatus, loading, disabled, regBtnTxt} = login

        this.setState({
            loading: loading,
            disabled: disabled,
            loginBtnTxt: regBtnTxt
        });

        if (regStatus) {
            this.timer = setTimeout(() => {
                navigation.goBack()
            }, 2000)
        }
    }

    componentWillUnmount() {

        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },

});
const mapStateToProps = (state) => {
    "use strict";

    return {

        ...state,
        regData: state.regData,
        regStatus: state.regData,
        loadingreg: state.loadingreg,
        disabledreg: state.disabledreg

    }

}
export default connect(mapStateToProps)(SignUp)