/**
 * Created by bear on 2017/6/28.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ScrollView,
    Platform,Alert

} from 'react-native'

import {WhiteSpace, WingBlank, Button, ActionSheet, List} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class Auth extends Component{
    constructor() {
        super();
        this.state = {
            clicked: 'none',
            text: '',
        };
    }
    showShareActionSheet = () => {
        const opts = {
            url: 'https://www.alipay.com/',
            message: 'message to go with the shared url',
            excludedActivityTypes: [
                <Button onClick={() => ActionSheet.close()}>close ActionSheet</Button>,
            ] ,
            subject: (null),
        };
        if (Platform.OS === 'ios') {
            opts.subject = 'a subject to go in the email heading';
            opts.excludedActivityTypes = [
                'com.apple.UIKit.activity.PostToTwitter',
            ];
        }
        ActionSheet.showShareActionSheetWithOptions(opts,
            (error) => Alert.alert(error),
            (success, method) => {
                let text;
                if (success) {
                    text = `通过 ${method} 分享`;
                } else {
                    text = '您没有分享';
                }
                this.setState({ text });
            });
    }
    render() {
        const {navigation}=this.props
        return (
            <ScrollView style={{backgroundColor: "#f0f1f1"}}
                        automaticallyAdjustContentInsets={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <WhiteSpace/>

                    <List>
                        <Item
                            onClick={()=>navigation.navigate('authCenter')}
                            extra={<Image
                            source={{uri: 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png'}}
                            style={{width: 20, height: 20}}
                        />}
                              arrow="horizontal"
                              multipleLine
                              thumb={<Image
                                  source={{uri: 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png'}}
                                  style={{width: 50, height: 50,marginRight:10}}
                              />}
                        >
                            <Brief ></Brief>
                            李佳鑫
                            <Brief style={{fontSize:12,marginTop:10}}>辅助文字内容</Brief>
                            <Brief ></Brief>
                        </Item>

                    </List>
                    <WhiteSpace/>
                    <List >
                        <Item
                            thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
                            arrow="horizontal"
                        >
                            钱包
                        </Item>
                        <Item
                            thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
                            arrow="horizontal"
                        >
                            我的文件
                        </Item>
                        <Item
                            thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
                            arrow="horizontal"
                        >
                            企业信息
                        </Item>

                    </List>
                    <WhiteSpace/>
                    <List >
                        <Item
                            thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
                            arrow="horizontal"
                        >
                            帮助中心
                        </Item>
                        <Item
                            onClick={()=>this.showShareActionSheet()}
                            thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
                            arrow="horizontal"
                        >
                            推荐给朋友使用
                        </Item>

                    </List>
                    <WhiteSpace/>
                    <List>
                        <Item
                            onClick={()=>navigation.navigate('setting')}
                            thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png"
                            arrow="horizontal"
                        >
                            设置
                        </Item>

                    </List>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',

    },
    ListInfo: {
        padding: 8,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e9',
        borderTopWidth: 1,
        borderTopColor: '#e8e8e9',
    },
    extra: {
        fontSize: 14,
        color: "#919191"

    },
    head: {
        lineHeight: 25

    },
    Item:{

        fontSize:16
    }

});


export default  Auth
