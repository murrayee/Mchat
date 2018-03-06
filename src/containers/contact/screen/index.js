/**
 * Created by bear on 2017/12/12.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as  contacts from "../../../actions/contact"
// import List from '../../../components/common/Main'
import List from '../../../components/common/sectionList'
// import List from '../../../components/common/flatList'
// import List from '../../../components/common/list'
@connect(
    state => {
        return {...state.contacts}
    },
    dispatch => bindActionCreators({...contacts}, dispatch)
)
export  default  class Contact extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {getCsList} = this.props
        getCsList()
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
                <List/>
            </View>
        );
    }

}


