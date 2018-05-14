/**
 * Created by bear on 2018/2/5.
 */
import React, {Component} from 'react';
import {
  BackHandler,
  ToastAndroid,
  AppState,
  Platform
} from 'react-native';
import {connect} from 'react-redux';
import {addNavigationHelpers, NavigationActions,} from 'react-navigation';
import * as socketActions from '../actions/socket';
import {createReduxBoundAddListener} from 'react-navigation-redux-helpers';
import Routers from './navigator';
import NavigatorService from '../services/navigatorService';

@connect(state => ({ ...state,
  nav: state.nav,
  ...state.io
}))
export default class AppWithNavigationState extends Component {
  componentDidMount() {
    const {
      dispatch,
        nav,
      sessionListMap
    } = this.props;
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
    const {dispatch, nav} = this.props;
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
    const {socket, sessionListMap, dispatch} = this.props;
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

  _addHelpers=()=>{
      const {dispatch, nav} = this.props;
      const addListener = createReduxBoundAddListener('root');
      const navigation = addNavigationHelpers({
          dispatch,
          state: nav,
          addListener
      });
      return navigation
  }
  render() {
    return <Routers  navigation = {this._addHelpers()} ref = {el =>NavigatorService.setContainer(el)}/>;
  }
}