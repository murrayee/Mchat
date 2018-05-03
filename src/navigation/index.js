/**
 * Created by bear on 2018/2/5.
 */
import React, { Component } from 'react';
import { BackHandler, ToastAndroid, AppState, Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  addNavigationHelpers,
  NavigationActions,
  SafeAreaView
} from 'react-navigation';
import { bindActionCreators } from 'redux';
import * as socketActions from '../actions/socket';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import Routers from './navigator';

@connect(state => ({ ...state, nav: state.nav, ...state.io }))
export default class AppWithNavigationState extends Component {
  componentDidMount() {
    const { dispatch, sessionListMap } = this.props;
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    //注册socket.io
    dispatch(socketActions.registerSocket(sessionListMap));
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    this.lastBackPressed = null;
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        return false;
      }
      this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
    }
    dispatch(NavigationActions.back());
    return true;
  };
  _handleAppStateChange = appState => {
    const { socket, sessionListMap, dispatch } = this.props;
    if (Platform.OS === 'ios' && appState === 'inactive') {
      socket.close();
      dispatch(socketActions.saveSession(sessionListMap));
    }
    if (Platform.OS === 'android' && appState === 'background') {
      socket.close();
      dispatch(socketActions.saveSession(sessionListMap));
    }
    if (appState === 'active') {
      socket.open();
    }
  };

  render() {
    const { dispatch, nav } = this.props;
    const addListener = createReduxBoundAddListener('root');
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav,
      addListener
    });
    return <Routers navigation={navigation} />;
  }
}
