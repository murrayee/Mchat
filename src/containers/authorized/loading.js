import React, { PureComponent } from "react";
import {  View, ActivityIndicator } from "react-native";
import curVersion from "@config/version";
import { Storage } from '@utils';

export default class AuthLoading extends PureComponent {
  constructor() {
    super();
    this.hasChange();
  }

  hasChange = async () => {
    const local = await Storage.get("murray/version");
    const user = await Storage.get("murray/user");
    if (local) {
      const oldVersion = local;
      if (parseInt(curVersion.version) > parseInt(oldVersion.version)) {
        this.props.navigation.navigate("guide", { version: curVersion });
        return;
      } else {
        if (user) {
          this.props.navigation.navigate("app");
          return;
        } else {
          this.props.navigation.navigate("authorization");
          return;
        }
      }
    }
    this.props.navigation.navigate("guide", { version: curVersion });
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}
