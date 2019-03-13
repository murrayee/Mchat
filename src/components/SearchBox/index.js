"use strict";

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";
import { Icon } from "../Icon";

export default props => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.searchInfo}
      onPress={() => props.onPress()}
    >
      <View style={styles.box}>
        <Icon name="ionicons|ios-search" size={16} style={styles.searchIcon} />
        <Text style={styles.text}>搜索</Text>
        <Icon name="ionicons|ios-mic" size={18} style={styles.voiceIcon} />
      </View>
    </TouchableOpacity>
  );
};
