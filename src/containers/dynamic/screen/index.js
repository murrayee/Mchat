import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Bubble from '../../../components/Bubble';


class User extends Component {
  constructor(props, context) {
    super(...arguments);
    this.state = {};
  }

  render() {

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}>
          <Bubble y={40}/>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default User;
