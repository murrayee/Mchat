import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as users from '../../../actions/index';


@connect(
  state => {
    return {
      ...state.users
    };
  },
  dispatch => bindActionCreators({
    getUsers:users.getUsers.request
  }, dispatch)
)


class User extends Component {
  constructor(props, context) {
    super(...arguments);
  }

  componentDidMount() {
    this.props.getUsers()
  }
  render() {
  console.log(this.props);
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