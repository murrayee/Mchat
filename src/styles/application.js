"use strict";
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const appStyles = StyleSheet.create({
  gridWrapper: {
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    padding: 20
  },
  item: {
    justifyContent: "center",
    alignItems: "center"
  },
  itemText: {
    fontSize: 14,
    color: "#333"
  },
  icon: {
    width: 35,
    height: 35,
    marginBottom: 6
  }
});
