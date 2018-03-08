/**
 * Created by bear on 2017/12/12.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Platform,Alert
} from 'react-native'
import {  Button, ActionSheet, List,WhiteSpace} from 'antd-mobile';
import Icon from 'react-native-vector-icons/Ionicons';
import {indexStyles} from '../styleSheet/index'
const Item = List.Item;
const Brief = Item.Brief;
class User extends Component{
    constructor(props) {
        super(props)
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
            <ScrollView
                        automaticallyAdjustContentInsets={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
            >
                <View style={indexStyles.container}>
                    <WhiteSpace/>
                    <List>
                        <Item onClick={()=>navigation.navigate('userInfo')}
                            extra={<Image source={{uri: 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png'}} style={{width: 20, height: 20}}/>}
                            arrow="horizontal"
                            multipleLine
                            thumb={<Image source={{uri: 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png'}} style={{width: 50, height: 50,marginRight:10}}/>}
                        >
                            <Brief />强桓狗<Brief style={{fontSize:12,marginTop:10}}>辅助文字内容</Brief><Brief />
                        </Item>
                    </List>
                    <WhiteSpace/>
                    <List >
                        <Item thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" arrow="horizontal">钱包</Item>
                        <Item thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" arrow="horizontal">我的文件</Item>
                        <Item thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" arrow="horizontal">企业信息</Item>
                    </List>
                    <WhiteSpace/>
                    <List >
                        <Item thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" arrow="horizontal">帮助中心</Item>
                        <Item onClick={()=>this.showShareActionSheet()} thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" arrow="horizontal">推荐给朋友使用</Item>
                    </List>
                    <WhiteSpace/>
                    <List>
                        <Item onClick={()=>navigation.navigate('setting')} thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" arrow="horizontal">设置</Item>
                    </List>
                </View>
            </ScrollView>
        )
    }
}
export  default  User