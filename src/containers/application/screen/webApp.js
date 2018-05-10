import React, { Component } from 'react';
import { View, Text } from 'react-native';
// import WebExample from '../../../components/common/webViewHtml'
import WebExample from '../../../components/common/webView';
import IconDemo from '../../../components/Icon/example';
class WebApp extends Component {
  constructor(props) {
    super(props);
  }
  // static navigationOptions = {
  //   back: false,
  //   // headerTintColor: '#f3977c',
  //   headerStyle: { position: 'absolute', top: 0 }
  // };
  render() {
    return (
        <View style={{flex:1}}>

      <WebExample
        url={
          'http://mywifi.mercku.tech/?fromapp=1#/wan-hand/'
        }
      />
        </View>
    );
  }
}

export default WebApp;
