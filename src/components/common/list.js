/**
 * Created by bear on 2017/7/14.
 */

import React, {Component} from 'react';
import {
    View, Image, TouchableOpacity, Modal, Text, ListView, Platform, Dimensions, StyleSheet, Alert, PanResponder
} from 'react-native';

import {Toast} from 'antd-mobile'

const {width, height} = Dimensions.get('window')

const SECTIONHEIGHT = 30, ROWHEIGHT = 40

class List extends Component {

    constructor(props) {
        super(props);
        var getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };
        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[rowID];
        };
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this.onShouldSetPanResponder.bind(this),
            onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder.bind(this),
            onPanResponderMove: this.onPanResponderMove.bind(this),
        })
        this.state = {
            dataSource: new ListView.DataSource({
                getRowData: getRowData,
                getSectionHeaderData: getSectionData,
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            }),
            data: [],
            letters: [],
            totalheight: [],
            newData: [],
            isRefreshing: false,
            loaded: 0,
            title:"最近更新:21:00"



        }


    }

    onShouldSetPanResponder(e, gestureState) {
        return true
    }

    onMoveShouldSetPanResponder(e, gestureState) {
        return true;
    }

    onPanResponderMove(e, gestureState) {

        // console.log(this.state.viewTop)
        const py = e.nativeEvent.pageY - 70
        const px = e.nativeEvent.locationX
        const index = Math.floor(py / 15)
        this._touchMove(py, px, index)

    }

    onRefresh=()=> {
        this.setState({ isRefreshing: true });
        setTimeout(() => {
            // prepend 10 items
            // const rowData = Array.from(new Array(10))
            //     .map((_val, i) => ({
            //         text: 'Loaded row ' + (+this.state.loaded + i),
            //         clicks: 0,
            //     }))
            //     .concat(this.state.rowData);

            this.setState({
                // loaded: this.state.loaded + 10,
                isRefreshing: false,
                // rowData: rowData,
            });
        }, 1000);
    }
    _touchMove = (py, px, index) => {
        const letters = this.state.letters;
        // const newData = this.state.newData;
        // this.scrollTo(index)
        if (index < 0 || index > letters.length) {
            return false
        } else {
            const letterWidth = 30
            if (px > 0 || px < letterWidth) {
                // if (index < newData.length) {
                this.scrollTo(index)
                Toast.info(letters[index], .5, null, false)
                // }
            }
        }

    }

    _getList = (result) => {
        let letters = [];
        let data = [];
        let newData = [];
        result.forEach((n, i) => {
            letters.push(n.CN)
            data.push(n.username)
        })
        letters = letters.sort().concat(['#'])

        let imp = ["☆"]
        letters = imp.concat(letters)
        letters = [...new Set(letters)]

        // 把单个列表放到对应的字母中
        for (let j = 0; j < letters.length; j++) {
            let each = []
            for (let i = 0; i < result.length; i++) {

                if (letters[j] == result[i].CN) {

                    each.push(result[i].username);
                }
            }

            let _data = {}
            _data.index = letters[j]
            _data.name = each
            newData.push(_data)
        }


        var dataBlob = {};
        var sectionIDs = [];
        var rowIDs = [];
        var totalheight = []

        for (let ii = 0; ii < newData.length; ii++) {
            var sectionName = 'Section ' + ii;
            sectionIDs.push(sectionName)
            dataBlob[sectionName] = letters[ii]
            rowIDs[ii] = [];

            for (let j = 0; j < newData[ii].name.length; j++) {
                var rowName = ii + '-' + j;
                rowIDs[ii].push(rowName)
                dataBlob[rowName] = newData[ii].name[j]
            }
            //计算每个字母和列表的总高度，递增放到数组中
            // var eachheight = this.props.sectionHeight+this.props.rowHeight*newcity.length
            var eachheight = SECTIONHEIGHT + ROWHEIGHT * newData[ii].name.length
            totalheight.push(eachheight);

        }


        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),

            letters: letters,
            totalheight: totalheight
        })

    }


    renderSectionHeader = (sectionData, sectionID) => {
        return (
            <View style={{
                height: SECTIONHEIGHT,
                justifyContent: 'center',
                paddingLeft: 5,
                opacity: 0.9,
                backgroundColor: "#F0F1F1",
                // borderColor: '#c1c1c1',
                // borderWidth: 0.5
            }}>
                <Text style={{color: '#a9a9a9', lineHeight: SECTIONHEIGHT}}>
                    {sectionData}
                </Text>
            </View>
        )
    }
    // render ringht index Letters
    renderLetters(letter, index) {
        return (
            <TouchableOpacity key={index} activeOpacity={0.6}
                              onPress={() => {
                                  this.scrollTo(index);
                                  // console.log(index);
                                  Toast.info(letter, .5, null, false)
                              }}
            >
                <View style={styles.letter}>
                    <Text style={styles.letterText}>{letter}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderRow = (rowData, rowId) => {
        const {navigation} = this.props
        return (
            <TouchableOpacity
                key={rowId}
                style={{
                    height: ROWHEIGHT,
                    justifyContent: 'center',
                    paddingLeft: 20,
                    borderWidth: 0
                }}
                onPress={() => {
                    navigation.navigate('userDetail', {
                        payload: rowData
                    })
                }}>
                <View style={[{flexDirection: 'row'}, {
                    borderBottomColor: '#F0F1F1',
                    borderBottomWidth: 0.5
                }]}>
                    <Image source={{}}/>
                    <View style={styles.rowdata}><Text style={styles.rowdatatext}>{rowData}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    //touch right indexLetters, scroll the left
    scrollTo = (index) => {
        let position = 0;
        for (let i = 0; i < index; i++) {
            position += this.state.totalheight[i]
        }

        console.log(position)
        this._listView.scrollTo({
            y: position,
            animated: false
        })
    }

    _onLayout(event) {
        this.state.viewTop = (height - event.nativeEvent.layout.height) / 2;
    }

    componentWillMount() {

        // // es6 排序
        // var arr1=[1,3,3,5,9,4,6,7];
        //
        // let s=new Set(arr1);
        //
        // let arr = [...s];
        const {data} = this.props
        const result = data
        if (result || result.length > 0) {

            this._getList(result)

        }
    }


    componentDidMount() {


    }

    render() {

        return (
            <View>
                <ListView
                    contentContainerStyle={styles.contentContainer}
                    ref={listView => this._listView = listView}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                    enableEmptySections={true}
                    initialListSize={500}
                    removeClippedSubviews={false}
                />
                <View
                    style={styles.letters}
                    onLayout={(event) => this._onLayout(event)}
                    {...this.panResponder.panHandlers}
                >
                    {this.state.letters.map((letter, index) => this.renderLetters(letter, index))}
                </View>


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
    letters: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'transparent',
        // justifyContent: 'center',
        // alignItems: 'center',
        // borderWidth: 1,
        // borderColor: "red"
    },
    letter: {
        height: 15,
        width: 30,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    letterText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#a9a9a9'
    },
    rowdata: {},
    rowdatatext: {
        color: 'gray',
        lineHeight: ROWHEIGHT - 1
    }
})


export default List