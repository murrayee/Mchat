/**
 * Created by bear on 2017/6/28.
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Button,
    TouchableWithoutFeedback
} from 'react-native';

import { Tabs} from 'antd-mobile';


import WebViewExample from './webView'

const TabPane = Tabs.TabPane;

function onChange(key) {
    console.log('onChange', key);
}

function onTabClick(key) {
    console.log('onTabClick', key);
}



class Row extends Component {
    onClick = () => {
        this.props.onClick(this.props.data);
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.onClick} >
                <View style={styles.row}>
                    <Text style={styles.text}>
                        {this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
class Dynamic extends Component {

    constructor(props) {
        super(props);
        this.diplayName = "Dynamic";
        this.state={
            isRefreshing: false,
            loaded: 0,
            rowData: Array.from(new Array(20)).map(
                (_val, i) => ({ text: 'Initial row ' + i, clicks: 0 })),
            title:"最近更新:21:00"
        }
    }

    onClick=(row)=> {
        row.clicks++;
        this.setState({
            rowData: this.state.rowData,
        });
    }

    render() {
        const rows = this.state.rowData.map((row, ii) => {
            return <Row key={ii} data={row} onClick={this.onClick} />;
        });

        return (
            <View style={{ flex: 1 }}>

                <WebViewExample/>
                {/*<Tabs defaultActiveKey="1" onChange={onChange} onTabClick={onTabClick}>*/}
                    {/*<TabPane tab="选项卡一" key="1">*/}
                        {/*/!*<ScrollView*!/*/}
                            {/*/!*style={styles.scrollview}*!/*/}
                            {/*/!*refreshControl={rcEl}*!/*/}
                        {/*/!*>*!/*/}
                            {/*/!*{rows}*!/*/}
                        {/*/!*</ScrollView>*!/*/}
                    {/*</TabPane>*/}
                    {/*<TabPane tab="选项卡二" key="2">*/}
                        {/*<ScrollView>*/}
                        {/*<View style={{ alignItems: 'center', justifyContent: 'center', height: 1000 }}>*/}
                            {/*<Text>选项卡二内容</Text>*/}
                        {/*</View>*/}
                    {/*</ScrollView>*/}
                    {/*</TabPane>*/}
                    {/*<TabPane tab="选项卡三" key="3">*/}
                        {/*<ScrollView>*/}
                        {/*<View style={{ alignItems: 'center', justifyContent: 'center', height: 1000 }}>*/}
                            {/*<Text>选项卡三内容</Text>*/}
                        {/*</View>*/}
                    {/*</ScrollView>*/}
                    {/*</TabPane>*/}
                    {/*<TabPane tab="选项卡四" key="4">*/}
                        {/*<ScrollView>*/}
                        {/*<View style={{ alignItems: 'center', justifyContent: 'center', height: 1000 }}>*/}
                            {/*<Text>选项卡四内容</Text>*/}
                        {/*</View>*/}
                        {/*</ScrollView>*/}
                    {/*</TabPane>*/}

                {/*</Tabs>*/}
            </View>
        );

    }
    onRefresh=()=> {
        this.setState({ isRefreshing: true });
        setTimeout(() => {
            // prepend 10 items
            const rowData = Array.from(new Array(10))
                .map((_val, i) => ({
                    text: 'Loaded row ' + (+this.state.loaded + i),
                    clicks: 0,
                }))
                .concat(this.state.rowData);

            this.setState({
                loaded: this.state.loaded + 10,
                isRefreshing: false,
                rowData: rowData,
            });
        }, 1000);
    }
}


const styles = StyleSheet.create({
    // containers: {},
    wrapper: {
        backgroundColor: '#fff',
    } ,
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height:1000,
    } ,
    text: {
        color: '#fff',
        fontSize: 36,

    } ,
    row: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 20,
        backgroundColor: '#3a5795',
        margin: 5,
    },
    // scrollview: {
    //     flex: 1,
    // },
});

export default  Dynamic

