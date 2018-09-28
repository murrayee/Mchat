import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';


class User extends Component {
  constructor(props, context) {
    super(...arguments);
  }

  render() {

    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text>Dynamic</Text>
        </View>
      </ScrollView>
    );
  }
}

export default User;