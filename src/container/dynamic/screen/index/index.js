/**
 * Created by bear on 2017/12/12.
 */

import React,{Component} from 'react'
import {View, Text} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

import WebExample from '../../../../compoents/common/webView'

class Dynamic extends Component{

    constructor(props) {
        super(props)
    }

    static navigationOptions = ({ navigation }) => {
        const { state, setParams } = navigation;
        return {
            header: null,
            tabBarIcon: ({tintColor, focused}) => (
                <Icon
                    name={focused ? 'ios-add-circle' : 'ios-add-circle'}
                    size={45}
                    style={{color: tintColor, marginTop: -20}}
                />
            ),
            tabBarLabel: '动态',
        };
    };


    render () {

        return  (<WebExample/>)
    }

}


export  default  Dynamic