import { Dimensions, StyleSheet } from "react-native";

export const { width, height } = Dimensions.get("window");

export const commonStyles = StyleSheet.create({
  theme: {
    backgroundColor: "#f1f1f1"
  },
  flexContainer: {
    flex: 1
  },
  flexColumnContainer: {
    flexDirection: "column"
  },
  flexRowContainer: {
    flexDirection: "row"
  },
  flexCenter: {
    justifyContent: "center",
    alignItems: "center"
  },
  flexJusEnd: {
    justifyContent: "flex-end"
  },
  fleAlignEnd: {
    alignItems: "flex-end"
  },
  flexSpaceBetween: {
    justifyContent: "space-between"
  }
});
