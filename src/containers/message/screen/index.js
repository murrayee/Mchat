import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as users from '../../../actions/users';

@connect(
  state => ({ ...state.users }),
  dispatch => bindActionCreators({ userLogin: users.userLogin }, dispatch),
)
class User extends Component {
  componentDidMount() {
    this.props.userLogin({ username: 'Admin', password: '123456' });
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