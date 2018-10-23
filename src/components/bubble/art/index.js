import React from 'react';
import {
  View,
  Button,
  StyleSheet
} from 'react-native';



import ArtText from './ArtText';
import Circle from './Circle';
import DashLine from './DashLine';
import Fan from './Fan';
import FillRect from './FillRect';
import GroupView from './Group';
import Line from './Line';
import LinearGradientView from './LinearGradientView';
import RadialGradientView from './RadialGradientView';
import TransformView from './TransformView';

 export default class Demo extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <ArtText></ArtText>
        </View>

        <View style={styles.button}>
          <Circle></Circle>
        </View>
        <View style={styles.button}>
          <DashLine></DashLine>
        </View>

        <View style={styles.button}>
            <Fan></Fan>
        </View>

        <View style={styles.button}>
          <FillRect></FillRect>
        </View>

        <View style={styles.button}>
          <GroupView></GroupView>
        </View>
        <View style={styles.button}>
          <Line></Line>
        </View>
        <View style={styles.button}>
          <LinearGradientView></LinearGradientView>
        </View>
        <View style={styles.button}>
          <RadialGradientView></RadialGradientView>
        </View>
        <View style={styles.button}>
          <TransformView></TransformView>
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  button: {
    marginBottom: 10
  }
});
