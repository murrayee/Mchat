"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View } from "react-native";
import AlphabetListView from "@components/AlphabetListView";
import { contactsStyles, commonStyles } from "@styles";
import { createAction, formatUserGroup } from "@utils";

@connect(
  state => ({ ...state.contact }),
  dispatch =>
    bindActionCreators(
      { fetchContact: createAction("contact/users") },
      dispatch
    )
)
export default class Contacts extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modalVisible: false
    };
  }

  static navigationOptions = {
    title: "联系人"
  };

  componentDidMount() {
    this.props.fetchContact();
  }

  onPressItem = item => {
    this.props.navigation.navigate("contactProfile", { profile: item });
  };
  onPressListHeader = () => {
    this.props.navigation.navigate("search");
  };
  scroll = (sectionIndex, itemIndex) => {
    this.sectionView.getNode().scrollToLocation({ sectionIndex, itemIndex });
  };

  render() {
    const { users } = this.props;
    return (
      <View style={commonStyles.theme}>
        <AlphabetListView
          total={users.length}
          data={formatUserGroup(users)}
          onPressItem={this.onPressItem}
          onPressListHeader={this.onPressListHeader}
        />
      </View>
    );
  }
}
