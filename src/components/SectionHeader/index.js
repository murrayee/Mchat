import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './style';

export default (props) => {
  return (
    <View style={styles.info}>
      <Text style={styles.letter}>{props.section.key}</Text>
    </View>

  );

}
