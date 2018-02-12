/**
 * Created by bear on 2017/7/14.
 */

import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {
    View,
    Dimensions,
    StyleSheet,
    Text
} from 'react-native';
import {Toast, ActivityIndicator} from 'antd-mobile'
const {width, height} = Dimensions.get('window')
import * as  contacts from "../../../action/contacts"
import List from '../../../component/list'
@connect(
    state => {
        return {...state.contacts}
    },
    dispatch => bindActionCreators({...contacts}, dispatch)
)
export default class Contacts extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const {fetchCts} = this.props
        fetchCts()
    }

    render() {

        const {data, navigation} = this.props;
        return (
            <View style={{backgroundColor: "#F0F1F1"}}>

                {  data.length > 0 && <List data={data} navigation={navigation}/>}

            </View>
        );
    }

    componentWillReceiveProps(np) {

        // console.log(np)


    }

    shouldComponentUpdate(np, ns) {

        if (this.props !== np || this.state !== ns) {

            return true
        }

        return false

    }

}
;

const styles = StyleSheet.create({
    contentContainer: {
        width: width,
        backgroundColor: 'white',
    },

})



