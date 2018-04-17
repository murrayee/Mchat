/**
 * Created by bear on 2018/2/5.
 */
import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import { map } from '../custom/iconfont.js';
import { Icon } from '../index.js';
import { View } from 'react-native';
export default class HeaderRight extends PureComponent {
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {Object.keys(map).map((v, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => console.log(v)}
            style={{ flexDirection: 'row', paddingRight: 10 }}
          >
            <Icon name={`iconfont|${v}`} size={30} color="#f2645d" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}
