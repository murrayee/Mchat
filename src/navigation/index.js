/**
 * Created by bear on 2018/2/5.
 */
import React, {Component} from 'react';
import {BackHandler, ToastAndroid} from "react-native";
import {connect} from 'react-redux';
import {addNavigationHelpers, NavigationActions} from 'react-navigation';
import {bindActionCreators} from 'redux'
import * as socket from '../actions/socket'
import {
    createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
import Routers from './navigator';
@connect(
    state => ({...state, nav: state.nav})
)
export default class AppWithNavigationState extends Component {
    componentDidMount() {
        const {dispatch} = this.props
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        //注册socket.io
        dispatch(socket.registerSocket())
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
        this.lastBackPressed = null
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

    render() {
        const {dispatch, nav} = this.props;
        const addListener = createReduxBoundAddListener("root");
        const navigation = addNavigationHelpers({
            dispatch,
            state: nav,
            addListener
        });
        return (
            <Routers navigation={navigation}/>
        );
    }
}
