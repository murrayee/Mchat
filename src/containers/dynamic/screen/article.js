/**
 * Created by bear on 2017/12/12.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, ScrollView, Text, Image} from 'react-native';
import {SafeAreaView} from 'react-navigation';

import * as dynamic from '../../../actions/dynamic';
import {articleStyles} from '../styleSheet/index';
import {Icon} from '../../../components/Icon';

@connect(
    state => {
        return {...state.dynamic};
    },
    dispatch => bindActionCreators({...dynamic}, dispatch)
)
export default class Article extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static navigationOptions = (props) => {
        return {
            headerRight: <View><Text style={{color: '#fff'}}>··· &nbsp;</Text></View>,
            headerTitle: <View><Text style={{color: '#fff'}}>Murray</Text></View>,
            headerTintColor: "white",
            headerStyle: {
                backgroundColor: '#f2645d',
            }
        }
    };

    render() {
        return (
            <SafeAreaView style={articleStyles.container}>

                <ScrollView style={articleStyles.container}>
                    <View style={articleStyles.header}>
                        <View style={articleStyles.titleBox}>
                            <Text style={articleStyles.title}>我是测试标题长度我是测试标题长度</Text>
                        </View>
                        <View style={articleStyles.message}>
                            <Text style={[articleStyles.text, articleStyles.textLeft]}>作者 · murray</Text>
                            <Text style={[articleStyles.text, articleStyles.textRight]}>1231231 · 阅读</Text>
                        </View>

                    </View>
                    <View style={articleStyles.content}>

                    </View>
                </ScrollView>
                <View style={articleStyles.handle}>
                    <View style={articleStyles.box}>
                        <Icon name="iconfont|dianzan" size={18} color='#6a6a6a'/>
                        <Text style={articleStyles.handleText}>点赞·12312</Text>

                    </View>
                    <View style={articleStyles.box}>
                        <Icon name="iconfont|icon3" size={18} color='#6a6a6a'/>
                        <Text style={articleStyles.handleText}>感谢</Text>


                    </View>
                    <View style={articleStyles.box}>
                        <Icon name="iconfont|shoucang" size={18} color='#6a6a6a'/>
                        <Text style={articleStyles.handleText}>收藏</Text>

                    </View>
                    <View style={articleStyles.box}>
                        <Icon name="iconfont|pinglun" size={18} color='#6a6a6a'/>
                        <Text style={articleStyles.handleText}>评论·12313</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
