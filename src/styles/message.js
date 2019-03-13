"use strict";

import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const messageStyles = StyleSheet.create({
  info: {
    backgroundColor: "#fff"
  },
  thumb: {
    width: 40,
    height: 40
  },
  wrapper: {
    flex: 1,
    paddingLeft: 10
  },
  item: {
    height: 66,
    flex: 1,
    flexDirection: "row"
  },
  extra: {
    // width: ,
    paddingRight: 10
  },
  desc: {
    fontSize: 10,
    color: "rgb(177,177,177)",
    textAlign: "center",
    paddingTop: 2
  },
  title: {
    color: "black",
    fontSize: 16
  },

  brief: {
    marginTop: 6,
    color: "rgb(153,153,153)",
    fontSize: 13
  },
  icon: {
    color: "rgb(177,177,177)",
    fontSize: 13,
    textAlign: "center",
    marginTop: 12
  },
  itemInfo: {
    height: 66,
    paddingTop: 8
  }
});
