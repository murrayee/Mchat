/**
 * Created by bear on 2017/12/12.
 */

import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import List from '../../../../compoents/common/sectionList'


class Message extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {


    }

    static navigationOptions = ({navigation}) => {
        const {state, setParams} = navigation;
        return {
            header: null,
            tabBarIcon: ({tintColor, focused}) => (
                <Icon
                    name={focused ? 'ios-chatboxes' : 'ios-chatboxes-outline'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
            tabBarLabel: '消息',
        };
    };


    render() {
        return (<View style={[styles.container]}>

            <List/>
        </View>)
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});


export  default  Message