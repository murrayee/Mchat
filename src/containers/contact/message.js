"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlatList, Image, Text, View } from "react-native";
import { List, SwipeAction } from "@ant-design/react-native";
import SearchBox from "@components/SearchBox";
import { Icon } from "@components/Icon";
import { createAction, formatDate } from "@utils";
import { messageStyles, commonStyles } from "@styles";

@connect(
  state => ({ ...state.contact }),
  dispatch =>
    bindActionCreators(
      { fetchList: createAction("contact/messages") },
      dispatch
    )
)
export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true,
      swipeOutDisable: false,
      modalVisible: false
    };
    this.props.fetchList();
  }

  static navigationOptions = {
    title: "消息"
  };
  swipeScrollEvent = scrollEnabled => {
    this.setState({ scrollEnabled: scrollEnabled });
  };
  itemOnPress = item => {
    const { navigation } = this.props;
    navigation.navigate("chat", { profile: item });
  };
  rightButton = () => {
    return [
      {
        text: "标记未读",
        onPress: () => console.log("cancel"),
        style: {
          backgroundColor: "#ddd",
          color: "white"
        }
      },
      {
        text: "删除",
        onPress: () => console.log("delete"),
        style: {
          backgroundColor: "#F4333C",
          color: "white"
        }
      }
    ];
  };

  renderItemComponent = ({ item }) => {
    return (
      <SwipeAction
        style={messageStyles.info}
        autoClose
        // disabled={swipeOutDisable}
        // onScroll={this.swipeScrollEvent}
        right={this.rightButton()}
      >
        <List.Item
          onPress={() => this.itemOnPress(item)}
          style={messageStyles.itemInfo}
        >
          <View style={messageStyles.item}>
            <Image style={messageStyles.thumb} source={{ url: item.avatar }} />
            <View style={messageStyles.wrapper}>
              <View
                style={[
                  commonStyles.flexSpaceBetween,
                  commonStyles.flexRowContainer
                ]}
              >
                <Text numberOfLines={1} style={messageStyles.title}>
                  {item.username}
                </Text>
                <Text numberOfLines={1} style={messageStyles.desc}>
                  {formatDate(item.date)}
                </Text>
              </View>
              <View style={messageStyles.desc}>
                <Text numberOfLines={1} style={messageStyles.brief}>
                  {item.message}
                </Text>
                <View style={messageStyles.icon} />
              </View>
            </View>
          </View>
        </List.Item>
      </SwipeAction>
    );
  };

  render() {
    const { navigation, messages } = this.props;
    return (
      <View style={commonStyles.theme}>
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={true} //隐藏竖直滚动条
          scrollEnabled={this.state.scrollEnabled}
          ListHeaderComponent={
            <SearchBox onPress={() => navigation.navigate("search")} />
          }
          renderItem={this.renderItemComponent}
        />
      </View>
    );
  }
}
