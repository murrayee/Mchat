import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Text,
  Alert,
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {
  Button,
  ActionSheet,
} from 'antd-mobile-rn';
import { authStyles } from '../styleSheet/index';
import { Icon } from '../../../components/Icon';
import { createAction } from '../../../utils';

@connect(
  state => ({
    ...state.auth,
    loading: state.loading.effects['auth/login'] || false,
  }),
  dispatch => bindActionCreators({
    fetchLogin: createAction('auth/login'),
  }, dispatch),
)
export default class Authorize extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: 'Admin',
      password: '123456',
      showLocalUser: false,
      showPassword: false,
    };
    this.BUTTONS = ['手势登录', '遇到问题？', '注册', '取消'];
  }

  actionControl = (index) => {
    const { navigation } = this.props;
    if (index === 2) navigation.navigate('register');
  };
  showActionSheet = () => {
    ActionSheet.showActionSheetWithOptions({
        options: this.BUTTONS,
        cancelButtonIndex: 3,
      },
      buttonIndex => this.actionControl(buttonIndex)
      ,
    );
  };
  submit = () => {
    const { fetchLogin } = this.props;
    const { username, password } = this.state;
    if (username && password) {
      fetchLogin({ username, password });
    } else {
      Alert.alert('用户名或者密码不能为空');
    }

  };
  localHandle = () => {
    this.setState({ showLocalUser: !this.state.showLocalUser });
  };

  render() {
    const { username, password } = this.state;
    return (
      <SafeAreaView style={authStyles.contentContainer}>
        <View style={authStyles.itemInfo}>
          <Image source={{ uri: 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png' }}
                 style={authStyles.heads}/>
        </View>
        <View>
          <View style={[authStyles.input]}>
            <Text style={authStyles.inputTitle}> 账户 </Text>
            <TextInput
              style={authStyles.inputItem}
              value={username}
              onChangeText={v => {
                this.setState({ username: v });
              }}
              placeholder="请输入用户名"
            />
            <View style={authStyles.icon}>
              <TouchableOpacity onPress={() => this.localHandle()}>
                <Icon name={`iconfont|${this.state.showLocalUser ? 'shang' : 'xia'}`} size={18} color="#404040"/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={authStyles.input}>
            <Text style={authStyles.inputTitle}> 密码 </Text>
            <TextInput
              style={authStyles.inputItem}
              secureTextEntry={!this.state.showPassword}
              value={password}
              onChangeText={v => {
                this.setState({ password: v });
              }}
              placeholder="请输入登录密码"
            />
            <View style={authStyles.icon}>
              <TouchableOpacity onPress={() => this.setState({ showPassword: !this.state.showPassword })}>
                <Icon name={`iconfont|${this.state.showPassword ? 'mimakejian' : 'iconfont32pxmimabukejian'}`} size={18}
                      color={this.state.showPassword ? '#108ee9' : '#704040'}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={authStyles.button}>
            <Button
              style={{ height: 40 }}
              loading={this.state.loading}
              type="primary"
              onClick={() => this.submit()}>
              登录
            </Button>
          </View>
          <TouchableOpacity
            onPress={() => this.showActionSheet()}
            style={authStyles.forget}>
            <Text style={authStyles.color}> 忘记密码？ </Text>
          </TouchableOpacity>
        </View>
        <View style={[authStyles.itemInfo, { justifyContent: 'flex-end' }]}>
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
