import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import {createAction} from '../../../utils';


@connect(
  state => ({ ...state.app }),
)
class User extends Component {
  componentDidMount() {
    console.log(this.props);
  this.props.dispatch(createAction('auth/login')())
  }
  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text>123213</Text>
        </View>
      </ScrollView>
    );
  }
}

export default User;
