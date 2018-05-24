/**
 * Created by bear on 2017/12/12.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
    View,
    ScrollView,
    Text,
} from 'react-native';

import * as  contacts from "../../../actions/contact"
import {styles} from '../styleSheet/index'
@connect(
    state => {
        return {...state.contacts}
    },
    dispatch => bindActionCreators({...contacts}, dispatch)
)
export  default  class Search extends Component {
    constructor(props, context) {
        super(props, context)
    }
    render() {

        return (
            <ScrollView style={styles.contentContainer}>
                <View>
                    <Text>searchBox</Text>
                </View>
            </ScrollView>
        );
    }

}


