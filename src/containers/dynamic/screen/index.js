import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-navigation'
import ArtDemo from '../../../components/bubble/example'


class User extends Component {
  constructor(props, context) {
    super(...arguments);
  }

  render() {

    return (
      <SafeAreaView>
      <ScrollView
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text>Dynamic</Text>
          <ArtDemo></ArtDemo>
        </View>
      </ScrollView>
      </SafeAreaView>
    );
  }
}

export default User;
