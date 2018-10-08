import React, { PureComponent } from 'react';
import { AsyncStorage, View, ActivityIndicator } from 'react-native';
import curVersion from '../../config/version';

export default class AuthLoading extends PureComponent {
  constructor() {
    super();
    this.hasChange();
  }

  hasChange = async () => {
    const local = await AsyncStorage.getItem('murray/version');
    const user = await AsyncStorage.getItem('murray/user');
    if (local) {
      const oldVersion = JSON.parse(local);
      if (parseInt(curVersion.version) > parseInt(oldVersion.version)) {
        this.props.navigation.navigate('guide', { version: curVersion });
        return ;
      } else {
        if (user) {
          this.props.navigation.navigate('app');
          return ;
        }
        else {
          this.props.navigation.navigate('authorization');
          return ;
        }
      }
    }
    this.props.navigation.navigate('guide', { version: curVersion });
  };

  render() {
    return <View><ActivityIndicator/></View>;
  }
}
