/**
 * Created by bear on 2017/12/12.
 */
import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
// import {styles} from '../../stylesheet/index'
import {
    View,
    Dimensions,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Toast, ActivityIndicator} from 'antd-mobile'
const {width, height} = Dimensions.get('window')

import * as  contacts from "../../../../actions/contact"
import List from '../../../../compoents/common/list'

@connect(
    state => {
        return {...state.contacts}
    },
    dispatch => bindActionCreators({...contacts}, dispatch)
)
class Contact extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {fetchCts} = this.props
        fetchCts()



    }

    static navigationOptions = ({navigation}) => {
        const {state, setParams} = navigation;
        return {
            headerTitle: '联系人',
            tabBarIcon: ({tintColor, focused}) => (
                <Icon
                    name={focused ? 'ios-people' : 'ios-people-outline'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
            tabBarLabel: '联系人',
        };
    }
    render() {
        const {data, navigation} = this.props;
        return (
            <View >
                {  data.length > 0 && <List data={data} navigation={navigation}/>}
            </View>
        );
    }

}


export  default  Contact

