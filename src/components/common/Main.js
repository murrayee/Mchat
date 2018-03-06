import React, {Component} from 'react'
import {SectionList, Text, View, StyleSheet, Platform} from 'react-native'
import CitySectionList from './CitySectionList'

const ITEM_HEIGHT = 50; //item的高度
const HEADER_HEIGHT = 24;  //分组头部的高度
const SEPARATOR_HEIGHT = 0;  //分割线的高度

export  default  class Main extends Component {

    async getCityInfos() {
        let data = await require('../../assets/json/city.json');
        let jsonData = data.data
        //每组的开头在列表中的位置
        let totalSize = 0;
        //SectionList的数据源
        let cityInfos = [];
        //分组头的数据源
        let citySection = [];
        //分组头在列表中的位置
        let citySectionSize = [];
        for (let i = 0; i < jsonData.length; i++) {
            citySectionSize[i] = totalSize;
            //给右侧的滚动条进行使用的
            citySection[i] = jsonData[i].title;
            let section = {}
            section.key = jsonData[i].title;
            section.data = jsonData[i].city;
            for (let j = 0; j < section.data.length; j++) {
                section.data[j].key = j
            }
            cityInfos[i] = section;
            //每一项的header的index
            totalSize += section.data.length + 1
        }
        this.setState({data: cityInfos, sections: citySection, sectionSize: citySectionSize})
    }


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            sections: [],
            sectionSize: []
        }
        this.getCityInfos()
    }
    _sectionListRef;

    _captureRef = (ref) => { this._sectionListRef = ref; };
    render() {
        if (this.state.data.length > 0) {
            return (
                <View style={{paddingTop: Platform.OS === 'android' ? 0 : 20}}>
                    <View>
                        <SectionList
                            ref={this._captureRef}
                            enableEmptySections
                            renderItem={this._renderItem}
                            renderSectionHeader={this._renderSectionHeader}
                            sections={this.state.data}
                            getItemLayout={this._getItemLayout}/>

                        <CitySectionList sections={ this.state.sections}
                            onSectionSelect={this._onSectionselect}/>
                    </View>
                </View>
            )
        } else {
            return <View/>
        }
    }

    //这边返回的是A,0这样的数据
    _onSectionselect = (section, index) => {
        //跳转到某一项
        this._sectionListRef.getNode().scrollToLocation({animated: true, index: this.state.sectionSize[index]})
        // this.refs.list.scrollToIndex({animated: true, index: this.state.sectionSize[index]})
    }

    _getItemLayout(data, index) {
        let [length, separator, header] = [ITEM_HEIGHT, SEPARATOR_HEIGHT, HEADER_HEIGHT];
        return {length, offset: (length + separator) * index + header, index};
    }

    _renderItem = (item) => {
        return (
            <View style={styles.itemView}>
                <Text style={{marginLeft: 30, fontSize: 16, color: '#333'}}>
                    {item.item.city_child}
                </Text>
                <Text style={{marginLeft: 25, fontSize: 15, color: '#999'}}>
                    {item.item.city_parent}
                </Text>
                <Text style={{marginLeft: 25, fontSize: 13, color: '#999'}}>
                    {item.item.provcn}
                </Text>
            </View>
        )
    }

    _renderSectionHeader = (section) => {
        return (
            <View style={styles.headerView}>
                <Text style={styles.headerText}>{section.section.key}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    headerView: {
        justifyContent: 'center',
        height: HEADER_HEIGHT,
        paddingLeft: 20,
        backgroundColor: '#eee'
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#3cb775'
    },
    itemView: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
        height: ITEM_HEIGHT
    }
});