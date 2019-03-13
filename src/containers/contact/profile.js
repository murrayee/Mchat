import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Header } from "react-navigation";
import HeaderImageScrollView from "react-native-image-header-scroll-view";
import { WhiteSpace, List, Button } from "@ant-design/react-native";
import { profileStyles } from "@styles";
import { Storage } from "@utils";

const MIN_HEIGHT = Header.HEIGHT + 24;
const MAX_HEIGHT = 200;
const Item = List.Item;
export default class contactInfo extends Component {
  static navigationOptions = {
    headerTintColor: "white",
    headerStyle: { position: "absolute", top: 0 }
  };

  render() {
    const { navigation } = this.props;
    const profile = navigation.state.params.profile;
    return (
      <View style={profileStyles.container}>
        <HeaderImageScrollView
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          maxOverlayOpacity={0.1}
          minOverlayOpacity={0.3}
          fadeOutForeground
          renderHeader={() => (
            <Image
              source={require("@assets/images/header.jpg")}
              style={profileStyles.image}
            />
          )}
          renderForeground={() => (
            <View style={profileStyles.titleContainer}>
              <Image
                source={require("@assets/images/header.jpg")}
                style={profileStyles.avatar}
              />
              <Text style={profileStyles.username}> {profile.username} </Text>
            </View>
          )}
          scrollViewBackgroundColor="rgb(240,241,241)"
        >
          <View style={profileStyles.content}>
            <WhiteSpace />
            <List>
              <Item extra={`${"未填写"}`} arrow="horizontal">
                个性签名
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
                我的二维码
              </Item>
            </List>
            <WhiteSpace />
            <List>
              <Item extra={`${"软件部"}`} arrow="horizontal">
                部门
              </Item>
              <Item extra={`${"软件工程师"}`} arrow="horizontal">
                职务
              </Item>
              <Item extra={`${"18500000000"}`} arrow="horizontal">
                手机号码
              </Item>
              <Item extra={`${"murrayee@163.com"}`} arrow="horizontal">
                邮箱地址
              </Item>
            </List>
            <View style={profileStyles.buttonWrap}>
              <Button
                type="primary"
                onPress={() =>
                  navigation.navigate("chat", { profile: profile })
                }
              >
                发送消息
              </Button>
              <WhiteSpace />
              <Button>视频聊天</Button>
            </View>
          </View>
        </HeaderImageScrollView>
      </View>
    );
  }
}
