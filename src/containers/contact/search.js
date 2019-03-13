"use strict";
import React, { PureComponent } from "react";
import { SafeAreaView } from "react-native";
import { SearchBar, Toast } from "@ant-design/react-native";

// 这个搜索框 自己用TextInput定制吧 ，antd的样式难得改

export default class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputFocus: true,
      value: "operator"
    };
  }

  onChange = value => {
    this.setState({ value });
  };

  render() {
    return (
      <SafeAreaView>
        <SearchBar
          value={this.state.value}
          placeholder="搜索"
          onSubmit={value => Toast.info(value)}
          onCancel={() => this.props.navigation.goBack()}
          onChange={this.onChange}
          showCancelButton
        />
      </SafeAreaView>
    );
  }
}
