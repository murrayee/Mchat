/**
 * Created by Daemon1993 on 16/12/18.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated
} from 'react-native';


const Tag = "CenterView";


export default class AText extends Component {
  static propTypes = {
    value:0,
  };

  render() {
    return (
      <View>
        <Text>{Math.ceil(this.props.value)}</Text>
      </View>
    );
  }
}
