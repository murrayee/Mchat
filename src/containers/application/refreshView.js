"use strict";

import React, {Component} from "react";
import {Dimensions, StyleSheet, Text, View} from "react-native";


export class RefreshView extends Component {
  render() {
    return (
      <View style={styles.RefreshContainer}>
        <View style={styles.TextContainer}>
          <Text style={styles.Title}>{this.props.title}</Text>
          <Text style={styles.RefreshTime}>{this.getTimeString()}</Text>
        </View>
      </View>
    );
  }

  getTimeString() {
    const now = new Date();
    return `${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
  }
}

const styles = StyleSheet.create({
  RefreshContainer: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "center",
  },
  TextContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  Title: {
    fontSize: 13,
    color: "#454545",
  },
  RefreshTime: {
    fontSize: 13,
    color: "#9b9b9b",
  },
});
