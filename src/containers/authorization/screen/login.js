/**
 * Created by bear on 2017/7/23.
 */
import React, {
    Component
} from 'react';
import {bindActionCreators} from 'redux';
import {
    Text,
    Alert,
    Image,
    View,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
} from 'react-native';
import * as auth from '../../../actions/auth';
import {connect} from 'react-redux';
import {
    Button,
    ActionSheet,
} from 'antd-mobile-rn';
import {authStyles} from '../styleSheet/index';
import {Icon} from '../../../components/Icon';
@connect(
    state => {
        return {
            ...state.auth,
            ...state.io
        };
    },
    dispatch => bindActionCreators({
        ...auth
    }, dispatch)
)
export default class Authorize extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: 'Admin',
            password: '123456',
            isShow:false,
            ishPassword:false
        };
    }
    _onClickLogin = () => {
        const {
            userLogin,
            navigation,
            socketId
        } = this.props;
        let username = this.state.username;
        let password = this.state.password;
        if (username === '' || password === '') {
            Alert.alert('用户名或者密码不能为空');
            return false;
        }
        userLogin({username, password}, navigation, socketId);
    };
    showActionSheet = () => {
        const BUTTONS = ['手势登录', '遇到问题？', '注册', '取消'];
        const {
            navigation
        } = this.props;
        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: 3
            },
            buttonIndex => {
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
            }
        );
    };
    _selectLocalAccount=()=>{

        this.setState({isShow:!this.state.isShow})
    }
    _disabled=()=>{
        return !this.state.username&&!this.state.password
    }
    render() {
        return (
            <SafeAreaView style={authStyles.contentContainer}>
                <View style={authStyles.itemInfo}>
                    <Image source={{uri: 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png'}}
                           style={authStyles.heads}/>
                </View>
                <View>
                    <View style={[authStyles.input]}>
                        <Text style={authStyles.inputTitle}> 账户 </Text>
                        <TextInput
                            style={authStyles.inputItem}
                            value={this.state.username}
                            onChangeText={v => {this.setState({username: v});}}
                            placeholder="请输入用户名"
                        />
                        <View style={authStyles.icon}>
                            <TouchableOpacity onPress={()=>this._selectLocalAccount()}>
                                <Icon name={`iconfont|${this.state.isShow?'shang':'xia'}`}  size={18} color="#404040"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={authStyles.input}>
                        <Text style={authStyles.inputTitle}> 密码 </Text>
                        <TextInput
                            style={authStyles.inputItem}
                            secureTextEntry={!this.state.ishPassword}
                            value={this.state.password}
                            onChangeText={v => {this.setState({password: v});}}
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
                            // disabled={this._disabled()}
                            type="primary"
                            onClick={() => this._onClickLogin()}>

                            登录
                        </Button>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.showActionSheet()}
                        style={authStyles.forget}>
                        <Text style={authStyles.color}> 忘记密码？ </Text>
                    </TouchableOpacity>
                </View>
                <View style={[authStyles.itemInfo, {justifyContent: 'flex-end'}]}>
                    <TouchableOpacity
                        onPress={() => this.showActionSheet()}
                        style={authStyles.more}>
                        <Text style={authStyles.color}> 更多 </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}