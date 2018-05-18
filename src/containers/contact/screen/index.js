/**
 * Created by bear on 2017/12/12.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { sectionListArr} from '../../../utils/filter'
import {
    View,
    Animated,
    SectionList,

} from 'react-native';
const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
import SectionHeader from '../../../components/SectionHeader'
import ContactItem from '../../../components/ContactItem'
import ContactIndexList from '../../../components/ContactIndexList'
import SearchBox from '../../../components/SearchBox'
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
        const {getCsList} = this.props;
        getCsList()
    }
    _scrollToSection = (sectionIndex, itemIndex) => {
        this._sectionView.getNode().scrollToLocation({sectionIndex, itemIndex});
    }
    render() {
        const {data,section,navigation} = this.props;
        return (
            <View style={styles.contentContainer}>
                <AnimatedSectionList
                    ref={el => this._sectionView = el}
                    onRefresh={() => console.log('onRefresh: nothing to refresh :P')}
                    onScroll={this._scrollSinkY}
                    refreshing={false}
                    showsVerticalScrollIndicator={false}//隐藏竖直滚动条
                    renderItem={({item}) => <ContactItem item={item} navigation={navigation}/>}
                    renderSectionHeader={({section}) => <SectionHeader section={section}/>}
                    ListHeaderComponent={<SearchBox/>}
                    stickySectionHeadersEnabled
                    sections={data || []}
                    enableEmptySections={true}
                    removeClippedSubviews={false}
                    keyExtractor={item => item._id}
                    viewabilityConfig={{
                        minimumViewTime: 3000,
                        viewAreaCoveragePercentThreshold: 100,
                        waitForInteraction: true,
                    }}
                />
                <ContactIndexList letters={sectionListArr(data)} scrollToSection={this._scrollToSection} section={section}/>
            </View>
        );
    }

}


