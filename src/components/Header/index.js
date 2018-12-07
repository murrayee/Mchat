import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';


export default (props) => {
  return (<View style={styles.wrapper}><Text style={styles.title}>{props.title}</Text></View>);

}
