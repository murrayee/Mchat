/**
 * Created by bear on 2017/7/23.
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import * as  auth from '../../../actions/auth';
import { connect } from 'react-redux';
import { Button, InputItem } from 'antd-mobile-rn';
import { authStyles } from '../styleSheet/index';
import { Icon } from '../../../components/Icon';

@connect(
  state => {
    return { ...state.auth };
  },
  dispatch => bindActionCreators({ ...auth }, dispatch),
)
export default class Register extends Component {
  static navigationOptions = {
    headerStyle: {
      position: 'absolute',
      top: 0,
    },
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: '',
    };
  }

  _onClickLogin = () => {
    const { userSingUp, navigation } = this.props;
    const str = 'Joyce、Sally、Margaret、Rebecca、Teresa、Rita、Jessica、Paul、Sam、Francis、Lewis、Stephen、Andy、Scott、Ava、Christina、Judy、Susan、Grace、Alice、Richard、Howard Allen、Johnny、Robert、Martin、Jeff、Maria、Kate、Demi、Sunny、Wendy、Nick、Walt、John、Mark、Sam、Davis、Neil、Carl、 Lewis、Billy、Taylor、Wendy、Grace、Vivian、Caroline、Samantha、Richard、James、Charles、 Bruce、David、Ross、Julie、Gloria、Carol、Burt、Charlie、Elliot、George、Johnson、Shirley、Emily、Sophia、Vivian、Lillian、Joy、Johnson、Bruce、Robert、Peter、Bill、Joseph、John、Shelly、Mary、Dolly、Nancy、Jane、Barbara、Robert、Carl、Scott、Tom、Eddy、Kris、Pete、Melody、Helen、Debbie、Lisa、Yvonne、Kevin、Louis、John、George、Henry、Benjamin、Judy、Doris、Rudy、Amanda、Shirley、Joan、Tracy、Elizabeth、Kelly、May、Julie、Amanda、Fiona、Fred、Gary、William、Charles、Michael、Karl、Barbara、Elizabeth、Helen、Katharine、Lee、Ann、Diana、Fiona、Bob、John、Thomas、Dean、Paul、Jack、Brooke';
    const names = Array.from(new Set(str.split('、')));

    // const names = ['Admin'];
    names.forEach(v => {
      userSingUp({ username: v, password: '123456' }, navigation);
    });

    // let username = this.state.username;
    // let password = this.state.password;
    // if (username === '' || password === '') {
    //   Alert.alert('用户名或者密码不能为空');
    //   return false;
    // }
    // userSingUp({ username, password }, navigation);
  };
  _disabled = () => {
    return !this.state.username && !this.state.password;
  };

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
              onChange={v => {
                this.setState({ username: v });
              }}
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
              onChange={v => {
                this.setState({ password: v });
              }}
              placeholder="请输入登录密码"
            />
            <View style={authStyles.icon}>
              <TouchableOpacity onPress={() => this.setState({ ishPassword: !this.state.ishPassword })}>
                <Icon name={`iconfont|${this.state.ishPassword ? 'mimakejian' : 'iconfont32pxmimabukejian'}`} size={18}
                      color={this.state.ishPassword ? '#108ee9' : '#704040'}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={authStyles.button}>
            <Button
              style={{ height: 40 }}
              loading={this.state.loading}
              // disabled={this._disabled}
              type="primary"
              onClick={() => this._onClickLogin()}>

              注册
            </Button>
          </View>
        </View>
        <TouchableOpacity style={authStyles.itemInfo}/>
      </SafeAreaView>
    );
  }

}
