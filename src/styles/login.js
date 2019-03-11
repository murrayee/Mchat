"use strict";

import { Dimensions, StyleSheet } from "react-native";

export const { width, height } = Dimensions.get("window");

export const loginStyles = StyleSheet.create({
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 5
  },
  inputTitle: {
    width: 70,
    textAlign: "left",
    paddingRight: 3,
    color: "#636363",
    fontSize: 14
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    borderColor: "#e2e2e0",
    borderBottomWidth: 1
  },
  inputItem: {
    height: 40,
    flex: 1,
    paddingLeft: 5,
    color: "#404040"
  },
  icon: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    height: 40
  },
  button: {
    padding: 15
  },
  forget: {
    alignItems: "center",
    justifyContent: "center"
  },
  more: {
    marginBottom: 10
  },
  color: {
    color: "rgb(61,142,226)"
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#108ee9"
  }
});
