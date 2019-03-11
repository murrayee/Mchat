/**
 * Created by bear on 2017/7/23.
 */
import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Toast } from "@ant-design/react-native";
import { commonStyles, loginStyles } from "@styles";
import { Icon } from "@components/Icon";
import { createAction, Storage } from "@utils";
import BaseLayout from "@components/BaseLayout";

@connect(
  state => ({ loading: state.loading }),
  dispatch =>
    bindActionCreators(
      { fetchRegister: createAction("user/register") },
      dispatch
    )
)
export default class Register extends Component {
  static navigationOptions = {
    headerStyle: {
      position: "absolute",
      top: 0
    }
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      username: "admin",
      password: "123456"
    };
  }

  submit = () => {
    const { fetchRegister } = this.props;
    const { username, password } = this.state;
    if (username && password) {
      fetchRegister({ username, password });
    } else {
      Toast.info("用户名或者密码不能为空");
    }
  };
  render() {
    return (
      <BaseLayout>
        <View style={[commonStyles.flexContainer, commonStyles.flexCenter]}>
          <Text style={loginStyles.title}>注册</Text>
        </View>
        <View>
          <View style={[loginStyles.input]}>
            <Text style={loginStyles.inputTitle}> 账户 </Text>
            <TextInput
              style={loginStyles.inputItem}
              value={this.state.username}
              onChangeText={v => {
                this.setState({ username: v });
              }}
              placeholder="请输入用户名"
            />
            <View style={loginStyles.icon} />
          </View>

          <View style={loginStyles.input}>
            <Text style={loginStyles.inputTitle}> 密码 </Text>
            <TextInput
              style={loginStyles.inputItem}
              secureTextEntry={!this.state.ishPassword}
              value={this.state.password}
              onChangeText={v => {
                this.setState({ password: v });
              }}
              placeholder="请输入登录密码"
            />
            <View style={loginStyles.icon}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({ ishPassword: !this.state.ishPassword })
                }
              >
                <Icon
                  name={`iconfont|${
                    this.state.ishPassword
                      ? "mimakejian"
                      : "iconfont32pxmimabukejian"
                  }`}
                  size={18}
                  color={this.state.ishPassword ? "#108ee9" : "#704040"}
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
              注册
            </Button>
          </View>
          <View style={loginStyles.forget}>
            <TouchableOpacity>
              <Text style={loginStyles.color}> </Text>
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
          <TouchableOpacity style={loginStyles.more}>
            <Text style={loginStyles.color}> </Text>
          </TouchableOpacity>
        </View>
      </BaseLayout>
    );
  }
}
