/**
 * Created by bear on 2017/12/12.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {contactIndexFilter, sectionListArr} from '../../../utils/filter'
import {
    View,
    Text,
    Animated,
    SectionList,
} from 'react-native';
const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
import SectionHeader from '../../../components/SectionHeader'
import ContactItem from '../../../components/ContactItem'
import ContactIndexList from '../../../components/ContactIndexList'
import Icon from 'react-native-vector-icons/Ionicons';
import * as  contacts from "../../../actions/contact"
import {styles} from '../styleSheet/index'
@connect(
    state => {
        return {...state.contacts}
    },
    dispatch => bindActionCreators({...contacts}, dispatch)
)
export  default  class Contact extends Component {
    constructor(props, context) {
        super(props, context)
        this._scrollPos = new Animated.Value(0);
        this._scrollSinkY = Animated.event([{
                nativeEvent: {
                    contentOffset: {y: this._scrollPos}
                }
            }],
            {useNativeDriver: true});
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
        const {data} = this.props;
        return (
            <View style={styles.contentContainer}>
                <AnimatedSectionList
                    onRefresh={() => console.log('onRefresh: nothing to refresh :P')}
                    onScroll={this._scrollSinkY}
                    refreshing={false}
                    renderItem={({item}) => <ContactItem item={item} key={item.key}/>}
                    renderSectionHeader={({section}) => <SectionHeader section={section}/>}
                    stickySectionHeadersEnabled
                    sections={data || []}
                    viewabilityConfig={{
                        minimumViewTime: 3000,
                        viewAreaCoveragePercentThreshold: 100,
                        waitForInteraction: true,
                    }}
                />
                <ContactIndexList letters={sectionListArr(data)}/>
            </View>
        );
    }

}


