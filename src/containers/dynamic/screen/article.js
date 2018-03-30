/**
 * Created by bear on 2017/12/12.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, FlatList ,Text} from 'react-native';
import { SafeAreaView } from 'react-navigation';

import * as dynamic from '../../../actions/dynamic';
import { indexStyles } from '../styleSheet/index';

import { Icon } from '../../../components/Icon';

@connect(
    state => {
        return { ...state.dynamic };
    },
    dispatch => bindActionCreators({ ...dynamic }, dispatch)
)
export default class Article extends Component {
    constructor(props, context) {
        super(props, context);

    }

    render() {
        return (
            <SafeAreaView style={indexStyles.container}>
                <Icon name="iconfont|iconfontpinglun" size={50} />

            </SafeAreaView>
        );
    }
}
