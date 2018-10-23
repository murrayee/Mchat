import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-navigation'
import CircleProgressView from '../../../components/Art/Fan'
import ArtDemo from '../../../components/bubble/art'
// import ArtLine from '../../../components/bubble'


class User extends Component {
  constructor(props, context) {
    super(...arguments);
  }

  render() {

    return (
      <SafeAreaView style={{ flex: 1}}>
      <ScrollView
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1}}
      >
        <View>
          {/*<Text>Dynamic</Text>*/}
          <View style={{ backgroundColor: 'black'}}>
            <CircleProgressView progress={100}/>
          </View>
          <ArtDemo/>
          {/*<View style={{ height: 20}}></View>*/}
          {/*<ArtLine></ArtLine>*/}
        </View>
      </ScrollView>
      </SafeAreaView>
    );
  }
}

export default User;
