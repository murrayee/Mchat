import React, { Component } from 'react';
import { View, Text } from 'react-native';
// import WebExample from '../../../components/common/webViewHtml'
import WebExample from '../../../components/common/webView';
import IconDemo from '../../../components/Icon/example';
class WebApp extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    back: false,
    // headerTintColor: '#f3977c',
    headerStyle: { position: 'absolute', top: 0 }
  };
  render() {
    return (
      <WebExample
        url={
          'http://www.merckuwifi.org.s3-website.cn-north-1.amazonaws.com.cn/app/zh/'
        }
      />
    );
  }
}

export default WebApp;
