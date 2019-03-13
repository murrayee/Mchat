"use strict";

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  searchInfo: {
    height: 46,
    flex: 1,
    backgroundColor: "#f1f1f1",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10
  },
  box: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 3
  },
  text: {
    textAlign: "center",
    color: "rgb(189,189,189)",
    marginLeft: 6,
    fontSize: 12
  },
  searchIcon: {
    color: "rgb(189,189,189)"
  },
  voiceIcon: {
    position: "absolute",
    lineHeight: 30,
    color: "rgb(189,189,189)",
    marginTop: 3,
    right: 0,
    marginRight: 10
  }
});
export default styles;
