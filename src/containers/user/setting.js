"use strict";

import React, { PureComponent } from "react";
import { View, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import { WhiteSpace, List, ActionSheet, Toast } from "@ant-design/react-native";
import { Storage } from "@utils";
import BaseLayout from "@components/BaseLayout";

const Item = List.Item;
const Brief = Item.Brief;

@connect(state => ({ ...state.user }))
export default class Setting extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.timer = null;
  }

  static navigationOptions = {
    title: "设置"
  };
  logout = index => {
    if (index === 0) {
      Toast.loading("正在退出...", 1, () => {
        Storage.remove("murray/user").then(() =>
          this.props.navigation.navigate("loading")
        );
      });
    }
  };
  showActionSheet = () => {
    const BUTTONS = ["退出", "取消"];
    ActionSheet.showActionSheetWithOptions(
      {
        message: "退出后,您将收不到离线消息",
        options: BUTTONS,
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0
      },
      buttonIndex => {
        this.logout(buttonIndex);
      }
    );
  };
  clearCache = async () => {
    await Storage.clear();
    Toast.info("清除成功", 1);
  };

  render() {
    return (
      <BaseLayout>
        <ScrollView
          style={{ backgroundColor: "#f1f1f1" }}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1 }}>
            <WhiteSpace />
            <List>
              <Item arrow="horizontal">修改密码</Item>
            </List>
            <WhiteSpace />
            <List>
              <Item extra={`${"已开启"}`} arrow="horizontal">
                消息通知
              </Item>
              <Item arrow="horizontal">聊天记录</Item>
            </List>
            <WhiteSpace />
            <List>
              <Item extra={`${"简体中文"}`} arrow="horizontal">
                语言选择
              </Item>
              <Item
                extra={
                  <Image
                    source={{
                      uri:
                        "https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
                    }}
                    style={{ width: 20, height: 20 }}
                  />
                }
                arrow="horizontal"
              >
                主题选择
              </Item>
            </List>
            <WhiteSpace />
            <List>
              <Item arrow="horizontal">隐私</Item>
            </List>
            <WhiteSpace />
            <List>
              <Item arrow="horizontal">意见与反馈</Item>
              <Item arrow="horizontal">关于</Item>
              <Item arrow="horizontal" onClick={this.clearCache}>
                清除缓存
              </Item>
            </List>
            <WhiteSpace />
            <List>
              <Item onClick={() => this.showActionSheet()}>
                <Brief style={{ textAlign: "center", color: "black" }}>
                  退出当前账号
                </Brief>
              </Item>
            </List>
          </View>
        </ScrollView>
      </BaseLayout>
    );
  }
}
