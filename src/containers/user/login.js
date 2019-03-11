"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Text, Image, View, TouchableOpacity, TextInput } from "react-native";
import { Button, ActionSheet, Toast } from "@ant-design/react-native";
import { commonStyles, loginStyles } from "@styles";
import { Icon } from "@components/Icon";
import { createAction, Storage } from "@utils";
import BaseLayout from "@components/BaseLayout";

@connect(
  state => ({ ...state.user, loading: state.loading }),
  dispatch =>
    bindActionCreators({ fetchLogin: createAction("user/login") }, dispatch)
)
export default class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: "admin",
      password: "123456",
      showLocalUser: false,
      showPassword: false
    };
    this.BUTTONS = ["手势登录", "遇到问题？", "注册", "取消"];
  }

  actionControl = index => {
    const { navigation } = this.props;
    if (index === 2) navigation.navigate("register");
  };
  showActionSheet = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: this.BUTTONS,
        cancelButtonIndex: 3
      },
      buttonIndex => this.actionControl(buttonIndex)
    );
  };
  submit = () => {
    const { fetchLogin } = this.props;
    const { username, password } = this.state;
    if (username && password) {
      fetchLogin({ username, password });
    } else {
      Toast.info("用户名或者密码不能为空");
    }
  };
  localHandle = () => {
    this.setState({ showLocalUser: !this.state.showLocalUser });
  };

  render() {
    const { username, password } = this.state;
    return (
      <BaseLayout>
        <View style={[commonStyles.flexContainer, commonStyles.flexCenter]}>
          <Image
            source={{
              uri: "https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
            }}
            style={loginStyles.avatar}
          />
        </View>
        <View>
          <View style={[loginStyles.input]}>
            <Text style={loginStyles.inputTitle}> 账户 </Text>
            <TextInput
              style={loginStyles.inputItem}
              value={username}
              onChangeText={v => {
                this.setState({ username: v });
              }}
              placeholder="请输入用户名"
            />
            <View style={loginStyles.icon}>
              <TouchableOpacity onPress={this.localHandle}>
                <Icon
                  name={`iconfont|${
                    this.state.showLocalUser ? "shang" : "xia"
                  }`}
                  size={18}
                  color="#404040"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={loginStyles.input}>
            <Text style={loginStyles.inputTitle}> 密码 </Text>
            <TextInput
              style={loginStyles.inputItem}
              secureTextEntry={!this.state.showPassword}
              value={password}
              onChangeText={v => {
                this.setState({ password: v });
              }}
              placeholder="请输入登录密码"
            />
            <View style={loginStyles.icon}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({ showPassword: !this.state.showPassword })
                }
              >
                <Icon
                  name={`iconfont|${
                    this.state.showPassword
                      ? "mimakejian"
                      : "iconfont32pxmimabukejian"
                  }`}
                  size={18}
                  color={this.state.showPassword ? "#108ee9" : "#704040"}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={loginStyles.button}>
            <Button
              style={{ height: 40 }}
              loading={this.state.loading}
              type="primary"
              onPress={this.submit}
            >
              登录
            </Button>
          </View>
          <View style={loginStyles.forget}>
            <TouchableOpacity onPress={this.showActionSheet}>
              <Text style={loginStyles.color}> 忘记密码？ </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            commonStyles.flexCenter,
            commonStyles.flexJusEnd,
            commonStyles.flexContainer
          ]}
        >
          <TouchableOpacity
            onPress={this.showActionSheet}
            style={loginStyles.more}
          >
            <Text style={loginStyles.color}> 更多 </Text>
          </TouchableOpacity>
        </View>
      </BaseLayout>
    );
  }
}
