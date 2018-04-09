/**
 * Created by bear on 2017/12/12.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, ScrollView, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import * as dynamic from '../../../actions/dynamic';
import { articleStyles } from '../styleSheet/index';
import { Icon } from '../../../components/Icon';

@connect(
  state => {
    return { ...state.dynamic };
  },
  dispatch => bindActionCreators({ ...dynamic }, dispatch)
)
export default class Release extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <SafeAreaView style={articleStyles.container}>
        <ScrollView style={articleStyles.container}>
          <Text>接口已经写好。UI火速开发中~</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
