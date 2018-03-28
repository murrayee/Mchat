import React from 'react';
import { WebView } from 'react-native';

export default class WebViewScreen extends React.Component {
    render() {
        return (
            <WebView source={require('../../assets/index.html')} />
        )
    }
}