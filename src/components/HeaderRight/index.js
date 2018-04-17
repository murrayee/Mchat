/**
 * Created by bear on 2018/2/5.
 */
import React, { PureComponent } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Icon } from '../Icon/index';
export default class HeaderRight extends PureComponent {
  render() {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('release')}
        style={{ flexDirection: 'row', paddingRight: 10 }}
      >
        <Icon name="iconfont|pinglun1" size={15} color="#f2645d" />
        <Text style={{ color: '#f2645d', fontSize: 14 }}>发表</Text>
      </TouchableOpacity>
    );
  }
}
