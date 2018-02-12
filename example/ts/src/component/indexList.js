/**
 * Created by bear on 2017/7/18.
 */

import React, {Component, PropTypes} from 'react'
import {
    StyleSheet,
    View,
    ListView,
    Text,
    TouchableOpacity,
    PanResponder,
    Alert,
} from 'react-native'
import _ from 'lodash'
import {Toast} from 'antd-mobile'

export default class StickySearchList extends Component {
    constructor(props) {
        super(props);
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this.onShouldSetPanResponder.bind(this),
            onMoveShouldSetPanResponder: this.onShouldSetPanResponder.bind(this),
            onPanResponderMove: this.onPanResponderMove.bind(this),
        })
        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }

    onShouldSetPanResponder(e, gesture) {
        return true


    }

    onPanResponderMove(e, gesture) {
        const {data} = this.props
        const py = e.nativeEvent.pageY-120
        const px = e.nativeEvent.locationX
        const index = Math.floor(py / 15)
        if (index < 0 || index > data.length) {

            return false
        }

        else {

            if (px > 0 && px < 20) {
                if (index < data.length) {
                    this.listView.scrollTo({y: this[`offsetYFor${_.keys(data[index])[0]}`], animated: false})
                }
            }

        }



    }

    _renderRow(data, sectionID, rowID, highlightRow) {
        return (
            <View onLayout={this._onCellLayout.bind(this, rowID)}>
                {this.props.renderRow(data, sectionID, rowID, highlightRow)}
            </View>
        )
    }

    _onCellLayout(index, event) {
        const {data} = this.props
        this[`offsetYFor${_.keys(data[index])[0]}`] = event.nativeEvent.layout.y



        this._viewTop = event.nativeEvent.layout.height
    }

    _handleSwitch(index) {
        const {data} = this.props
        this.listView.scrollTo({y: this[`offsetYFor${_.keys(data[index])[0]}`], animated: false})
        Toast.info(`${_.keys(data[index])[0]}`, .5, null, false)    }

    render() {
        const {
            data,
            searchBarBackgroundColor,
            searchBarWidth,
            searchBarTextStyle,
        } = this.props
        return (
            <View style={styles.container}>
                <ListView
                    ref={ lv => this.listView = lv}
                    dataSource={this.dataSource.cloneWithRows(data)}
                    renderRow={this._renderRow.bind(this)}
                    enableEmptySections={true}
                    // initialListSize={500}
                    removeClippedSubviews={false}
                />


                <View
                    {...this.panResponder.panHandlers}
                    style={[
                        styles.searchBar,
                        searchBarBackgroundColor ? {backgroundColor: searchBarBackgroundColor} : {},
                        searchBarWidth ? {width: searchBarWidth} : {}
                    ]}
                >
                    {
                        data.map((item, index) => (
                            <TouchableOpacity onPress={this._handleSwitch.bind(this, index)} key={index}
                                              style={styles.searchBarItem}>
                                <Text style={[{fontSize: 12}, searchBarTextStyle]}>{_.keys(item)[0]}</Text>
                            </TouchableOpacity>)
                        )
                    }
                </View>


            </View>
        )
    }
}

StickySearchList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    searchBarBackgroundColor: PropTypes.string,
    searchBarWidth: PropTypes.number,
    searchBarTextStyle: PropTypes.object,
    renderRow: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },

    searchBar: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        position: 'absolute',
        top: 50,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        // backgroundColor:"red"
    },
    searchBarItem: {
        height: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
})