import React from "react";
import { SafeAreaView } from "react-navigation";
import { Provider } from "@ant-design/react-native";

export default class BaseLayout extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Provider theme={null}>{this.props.children}</Provider>
      </SafeAreaView>
    );
  }
}
