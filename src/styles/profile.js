"use strict";

import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const MAX_HEIGHT = 200;

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    width: width,
    backgroundColor: "#f0f1f1",
    position: "absolute"
  },
  image: {
    height: MAX_HEIGHT,
    width: width,
    alignSelf: "stretch",
    resizeMode: "cover"
  },
  titleContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center"
  },
  username: {
    color: "white",
    backgroundColor: "transparent",
    fontSize: 18
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  buttonWrap: {
    padding: 20
  }
});
