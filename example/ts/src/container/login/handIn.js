/**
 * Created by bear on 2017/7/23.
 */
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
import {NavigationActions} from 'react-navigation'

import {Flex, Button,InputItem,WingBlank,WhiteSpace,ActionSheet} from 'antd-mobile'
const {width, height} = Dimensions.get("window")
// import { fetchRequest, AUTH_ERR_MSG, ERR_MSG } from '../../lib/network/request';
// import config from '../../config';
// import Home from './Home';
// import storage from '../../storage/storage';
// import { initialSocket } from '../consultant/gifted-chat/ConsultSocket';
//

class HandLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login:true,
            value: '',
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            labelnum1: '',
            labelnum2: '',
            labelnum3: '',
            bankCard: '',
            phone: '',
            password: '',
            number: '',
            focused: false,

            text:"登录",
            disabled:false,
            loading:false
        };
        this.loginStatus={

            text:"登录",
            disabled:false,
            loading:false
        }
    }

    //
    componentWillMount() {

        // StatusBarIOS.setHidden(true)

    }

    // // 跳转到第二个页面去
    // onLoginSuccess = () => {
    //     // socket 初始化
    //     initialSocket(this.state.token);
    //     const { navigator } = this.props;
    //     if (navigator) {
    //         navigator.replace({
    //             name: 'Home',
    //             component: Home
    //         });
    //     }
    // }
    //
    // clickLoginBtn() {
    //     // 判断密码是否为空
    //     if (this.state.username === '' || this.state.password === '') {
    //         Alert.alert('账号或密码不能为空');
    //         return;
    //     }
    //     fetchRequest(`${config.apiPrefix}/auth/consultant`, {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             username: this.state.username,
    //             password: this.state.password
    //         })
    //     }, false).then((json) => {
    //         if (json.retCode === 0) {
    //             // 保存token
    //             this.setState({
    //                 token: json.data.token
    //             });
    //             storage.save({
    //                 key: 'identity',
    //                 rawData: {
    //                     token: json.data.token,
    //                     headImg: json.data.userProfile.headImg,
    //                     userType: json.data.userProfile.userType,
    //                     name: json.data.userProfile.name
    //                 },
    //                 expires: json.data.ttl
    //             }).then(() => {
    //                 // 保存account信息
    //                 storage.save({
    //                     key: 'account',
    //                     rawData: {
    //                         username: this.state.username,
    //                         password: this.state.password,
    //                         isAutoLogin: true
    //                     }
    //                 });
    //             }).then(() => {
    //                 // 登录成功
    //                 this.onLoginSuccess();
    //             })
    //                 .catch((err) => {
    //                     console.log(err);
    //                     throw new Error();
    //                 });
    //         } else if (json.retCode === -2) {
    //             // 用户名或密码错误
    //             global.alert('账号或密码不能为空');
    //         } else if (json.retCode === 5001) {
    //             Alert.alert('账号或密码错误');
    //         } else {
    //             throw new Error();
    //         }
    //     }).catch((err) => {
    //         if (err.message !== AUTH_ERR_MSG) {
    //             // 出错的处理逻辑
    //             Alert.alert(ERR_MSG);
    //             console.error(err);
    //         } else {
    //             console.log(err);
    //         }
    //     });
    // }

    onLoginSuccess = () => {
        if(this.state.login){
            const resetActions = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'main'})]
            });
            this.props.navigation.dispatch(resetActions);

        }else {
            this.setState({
                text:"登录中...",
                disabled:true,
                loading:true
            })
        }
    }

    showActionSheet = () => {
        const BUTTONS = ['手势登录', '遇到问题？','注册', '取消'];
        ActionSheet.showActionSheetWithOptions({
                // title: '标题',
                // message: '',
                options: BUTTONS,
                cancelButtonIndex: 3,
                // destructiveButtonIndex: 0,
            },
            (buttonIndex) => {
                this.loginOut(buttonIndex)
            });
    }
    render() {
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
                            width:width
                        }}>
                            <Image
                                source={{uri: 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png'}}
                                style={{width: 65, height: 65, borderRadius: 5, marginTop: 15}}
                            />
                        </Flex.Item>
                        <Flex.Item style={{
                            // justifyContent: 'center',
                            // alignItems: 'center',
                            width:width
                        }} >

                            <InputItem
                                style={{
                                    marginRight:15

                                }}
                                clear
                                // value={}
                                onChange={(value) => {
                                    // this.setState({
                                    //     labelnum1: value,
                                    // });
                                }}
                                // labelNumber={2}
                                placeholder="请输入用户名"
                            >
                                姓名
                            </InputItem>
                            <InputItem
                                style={{
                                    marginRight:15

                                }}
                                clear
                                type="password"
                                // value={}
                                onChange={(value) => {
                                    // this.setState({
                                    //     password: value,
                                    // });
                                }}
                                placeholder="请输入登录密码"
                            >
                                密码
                            </InputItem>
                            <Button
                                loading={this.state.loading}
                                disabled={this.state.disabled}
                                style={{
                                    margin:15,
                                    height:40

                                }}
                                onClick={() =>
                                    this.onLoginSuccess()
                                }
                                type="primary"
                            >
                                {
                                    this.state.text
                                }
                            </Button>

                            <Text style={{textAlign:'center',color:'#ababab'}}>忘记密码?</Text>


                        </Flex.Item>
                        <Flex.Item
                            style={{
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                width:width
                            }}
                        >

                            <Text style={{

                                height:50,
                                lineHeight:50,
                                color:'rgb(61,142,226)'
                            }}
                                  onPress={()=>this.showActionSheet()}
                            >
                                更多
                            </Text>
                        </Flex.Item>
                    </Flex>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },

});

export default HandLogin