/**
 * Created by bear on 2017/7/23.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    PixelRatio,
    ScrollView,
    View,
    TextInput,
    Alert,
    StatusBar,
    Dimensions,
    Image,

} from 'react-native';
import {NavigationActions} from 'react-navigation'
import {connect} from 'react-redux'
import  {fetchSignIn, nameChange, pwdChange} from "../../action/login"
import {storage} from '../../utils/asyncStorage'
import {Flex, Button, InputItem, WingBlank, WhiteSpace, ActionSheet} from 'antd-mobile'

const {width, height} = Dimensions.get("window")

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            username: '',
            password: "",
            focused: false,
            loginBtnTxt: "",
            disabled: '',
            loading: ''
        };
    }

    //
    componentWillMount() {

        console.log(this.props)
        const {login} = this.props
        const {loginBtnTxt, disabled, loading,userInfo} = login

        //
        // storage.load({
        //     key: 'loginState',
        //
        //     // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
        //     autoSync: true,
        //
        //     // syncInBackground(默认为true)意味着如果数据过期，
        //     // 在调用sync方法的同时先返回已经过期的数据。
        //     // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
        //     syncInBackground: true,
        //
        //     // 你还可以给sync方法传递额外的参数
        //     syncParams: {
        //         extraFetchOptions: {
        //             // 各种参数
        //         },
        //         someFlag: true,
        //     },
        // }).then(ret => {
        //     // 如果找到数据，则在then方法中返回
        //     // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
        //     // 你只能在then这个方法内继续处理ret数据
        //     // 而不能在then以外处理
        //     // 也没有办法“变成”同步返回
        //     // 你也可以使用“看似”同步的async/await语法
        //    let loginStatus = ret.loginStatus
        //     if(loginStatus)
        //     {
        //         const resetActions = NavigationActions.reset({
        //             index: 0,
        //             key: null,
        //             actions: [NavigationActions.navigate({routeName: 'main'})]
        //         });
        //         this.props.navigation.dispatch(resetActions);
        //
        //     }
        // }).catch(err => {
        //
        //     return false
        //     // //如果没有找到数据且没有sync方法，
        //     // //或者有其他异常，则在catch中返回
        //     // // console.warn(err.message);
        //     // switch (err.name) {
        //     //     case 'NotFoundError':
        //     //         // TODO;
        //     //         break;
        //     //     case 'ExpiredError':
        //     //         // TODO
        //     //         break;
        //     // }
        // })


        this.setState({
            loginBtnTxt: loginBtnTxt,
            disabled: disabled,
            loading: loading
        })

    }

    // componentDidMount() {
    //
    //
    // }


    _onClickLogin = () => {
        const {dispatch} = this.props
        const username = this.state.username
        const password = this.state.password
        if (username == '' || password == '') {

            Alert.alert("用户名或者密码不能为空")

        } else {

            let data = {
                username: username,
                password: password
            };
            dispatch(fetchSignIn(data))
        }


    }
    _reg = (index) => {
        const {navigation} = this.props;

        if (index == 2) {

            navigation.navigate('signUp')
        } else if(index==1||index==0){


            Alert.alert('功能开发中')
        }

    }

    showActionSheet = () => {
        const BUTTONS = ['手势登录', '遇到问题？', '注册', '取消'];
        ActionSheet.showActionSheetWithOptions({
                // title: '标题',
                // message: '',
                options: BUTTONS,
                cancelButtonIndex: 3,
                // destructiveButtonIndex: 0,
            },
            (buttonIndex) => {
                this._reg(buttonIndex)
            });
    }

    render() {
        const {dispatch} = this.props
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
                            <Image
                                source={{uri: 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png'}}
                                style={{width: 65, height: 65, borderRadius: 5, marginTop: 15}}
                            />
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
                                type="text"
                                onChange={(value) => {
                                    dispatch(nameChange(value))
                                    this.setState({
                                        username: value,
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
                                    dispatch(pwdChange(value))
                                    this.setState({
                                        password: value,
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
                                    this.state.loginBtnTxt
                                }
                            </Button>

                            <Text style={{textAlign: 'center', color: '#ababab'}}>忘记密码?</Text>


                        </Flex.Item>
                        <Flex.Item
                            style={{
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                width: width
                            }}
                        >


                            <TouchableWithoutFeedback

                                onPress={() => this.showActionSheet()}
                            >
                                <View
                                    style={{
                                        paddingBottom:20,
                                        // color: 'rgb(61,142,226)'
                                    }}

                                >
                                <Text
                                    style={{
                                        // paddingBottom:20,
                                        color: 'rgb(61,142,226)'
                                    }}

                                >更多
                                </Text>
                            </View>
                            </TouchableWithoutFeedback>

                        </Flex.Item>
                    </Flex>
                </View>
            </ScrollView>
        );
    }

    componentWillReceiveProps(np) {
        const {login} = np
        const {loginStatus, navigator, loading, disabled, loginBtnTxt} = login

        this.setState({
            loading: loading,
            disabled: disabled,
            loginBtnTxt: loginBtnTxt
        })

        if (loginStatus) {

            const resetActions = NavigationActions.reset({
                index: 0,
                key: null,
                actions: [NavigationActions.navigate({routeName: 'main'})]
            });
            this.props.navigation.dispatch(resetActions);
            storage.save({
                key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
                data: {
                    loginStatus: loginStatus,
                },

                // 如果不指定过期时间，则会使用defaultExpires参数
                // 如果设为null，则永不过期
                expires: null
            });
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //
    //
    //     return this.props.login.inputValue !== nextProps.login.inputValue;
    //
    //
    // }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },

});

const mapStateToProps = (state) => {

    return {
        ...state,
        userData: state.userData,
        loginStatus: state.loginStatus,
        inputValue: state.inputValue,
        loading: state.loading,
        disabled: state.disabled,
        loginBtnTxt: state.loginStatus,
        regData:state.regData
    }
}


export default connect(mapStateToProps)(SignIn)