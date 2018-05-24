import React, {Component} from "react"
import {AsyncStorage, View} from "react-native"

export default class AuthLoading extends Component {
    constructor(props){
        super(props);
        this._hasAccessToken();
    }
    _hasAccessToken=async ()=>{
        const profile = await AsyncStorage.getItem('murrayUserProfile');
        this.props.navigation.navigate(profile ? 'App' : 'Auth');
    };
    render() {
        return (<View />)
    }
}
