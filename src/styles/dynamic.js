"use strict";

import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const dynamicStyles = StyleSheet.create({
  footer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  }
});

export const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10
  },
  header: {
    flexDirection: "row",
    marginBottom: 10
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 2
  },
  titleWrapper: {
    paddingLeft: 10,
    flex: 1
  },
  top: {
    height: 14,
    fontSize: 10,
    color: "#f2645d",
    borderWidth: 0.5,
    borderColor: "#f2645d",
    justifyContent: "center",
    padding: 1,
    borderRadius: 1
  },
  title: {
    fontSize: 14,
    color: "#333333",
    paddingBottom: 4
  },
  extra: {
    fontSize: 12,
    color: "rgb(177,177,177)"
  },
  content: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 10
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  footerText: {
    flexDirection: "row",
    fontSize: 12,
    color: "#878787",
    paddingLeft: 2
  },
  footerLeft: {
    justifyContent: "center",
    alignItems: "center"
  },
  wrap: {
    flexDirection: "row",
    alignItems: "center"
  }
});
