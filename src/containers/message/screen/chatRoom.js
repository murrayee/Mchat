/**
 * Created by bear on 2018/2/24.
 */
/**
 * Created by bear on 2017/8/20.
 */
//解决键盘遮挡
import React, {Component} from 'react';
import {
    KeyboardAvoidingView,
    RefreshControl,
    StyleSheet,
    ListView,
    Image,
    Text,
    TextInput,
    Platform,
    View,
    Button,
    ScrollView,
    TouchableOpacity,
    Dimensions
} from 'react-native';
// import io from 'socket.io-client'
const {width, height} = Dimensions.get('window')
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Animatable from 'react-native-animatable';
import {Grid, Tabs} from 'antd-mobile'
import MessageCell from '../../../components/MessageCell/messageCell'
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddIcon from 'react-native-vector-icons/Ionicons'
import uuid from 'uuid'
import {InputItem} from 'antd-mobile'
const emojiList = ['😅', '😂', '🙂', '🙃', '🙃', '😘', '😗', '😜', '😜', '😎', '😏', '😔', '🙁', '😶', '😢', '🤔', '👏', '🤝', '👍', '👎', '✌', '❤', '🐶', '🐱', '🐰', '🐭', '🐷', '🐸', '🙈',];
const data2 = emojiList.map((_val, i) => ({
    // icon:_val ,
    text: `${_val}`,
}));

const data1 = emojiList.map((_val, i) => ({
    // icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: `${_val}`,
}));
const data = Array.from(new Array(20)).map((_val, i) => ({
    remark: i % 2 === 0 ? 'me' : '',
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: '李佳鑫',
    des: `我是消息${i}`,

}));
const tabs2 = [
    {title: '表情一', sub: '1'},
    {title: '表情二', sub: '2'},
    {title: '表情三', sub: '3'},
];
let index = data.length - 1;

const NUM_ROWS = 20;
let pageIndex = 0;
@connect(
    state => {
        return {...state.io, ...state.auth}
    })
class Chat extends Component {

    constructor(props) {
        super(props);
        this.diplayName = "Chat"
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.rData = {};
        this._userReachEnd = true
        this._userHasBeenInputed = false
        this.state = {
            dataSource: dataSource.cloneWithRows(this.genData()),
            isLoading: false,
            textInputHeight: 40,
            inputValue: '',
            refreshing: false,
            emojiBoxState: false
        };


    }

    genData = (pIndex = 0) => {
        let dataBlob = data;
        // for (let i = 0; i < NUM_ROWS; i++) {
        //     const ii = (pIndex * NUM_ROWS) + i;
        //     dataBlob[`${ii}`] = `row - ${ii}`;
        // }
        return dataBlob;
    }

    renderRow = (rowData, rowId) => {
        return (
            <MessageCell
                data={rowData}
            />
        )
    }

    _scrollToBottom() {
        let scrollProperties = this._listView.scrollProperties;
        console.log(scrollProperties)
        // 如果组件没有挂载完全，则不进行内容偏移
        if (!scrollProperties.visibleLength) {
            return;
        }

        // 如果是刷新操作，则不进行滑动
        if (!this._userReachEnd) {
            return;
        }
        // 如果组件内元素还没渲染完全，则不进行底部偏移
        // if (socketStore.currentChatRoomHistory.length - this.currentMaxRowId > 11) {
        //     return;
        // }

        // 这里是一个大坑，在测试环境的时候，由于运行速度较慢，scrollProperties.contentLength 总能
        // 获取到正确的值，生产环境需要加个延时，用来保证 `renderRow` 执行完毕
        // 这里设置了 130ms 的延时
        setTimeout(() => {
            let offsetY = scrollProperties.contentLength - scrollProperties.visibleLength;
            this._listView.scrollTo({
                y: offsetY > 0 ? offsetY : 0,
                animated: this._userHasBeenInputed
            });
        }, this._userHasBeenInputed ? 0 : 130);
    }

    _onSubmitEditing = (event) => {

        const {navigation, socketService, authProfile} = this.props
        const {state} = navigation
        const toUserInfo = state.params.profile
        let userInfo = authProfile.data.data;
        let messageParams = {
            from: userInfo._id,
            to: toUserInfo._id,
            uuid: uuid.v4(),
            msg: {
                type: 'txt',
                content: this.state.inputValue
            },
            ext: {
                // avatar: userInfo.avatar,
                name: userInfo.username
            }
        };
        this._userHasBeenInputed = true
        socketService.socket.emit('message', [messageParams])
        console.log(socketService.socket.id)
        data.push({
            remark: "me",
            img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
            des: this.state.inputValue
        })
        let dataBlob = data
        this.setState({
                dataSource: this.state.dataSource.cloneWithRows(dataBlob),
                inputValue: ' '
            }
        );


    }

    render() {
        let content = (
            <View style={styles.container}>
                <ListView
                    // contentContainerStyle={styles.contentContainer}
                    ref={listView => this._listView = listView}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    // renderSectionHeader={this.renderSectionHeader}
                    enableEmptySections={true}
                    initialListSize={500}
                    removeClippedSubviews={false}
                    // refreshControl={rcEl}
                    onLayout={
                        (event) => {
                            this._scrollToBottom();
                        }
                    }
                    onContentSizeChange={
                        (event) => {
                            this._scrollToBottom();
                        }
                    }
                    onEndReached={() => {
                        this._userReachEnd = true;
                    }}

                />

                <View style={styles.flexContainer}>
                    <View style={styles.leftIcon}>
                        {/*<Text>1</Text>*/}
                        <Icon name="keyboard-voice" size={25} style={{color: '#b2b2b2', margin: 7}}/>
                    </View>
                    <View style={styles.cell}>
                        <TextInput
                            style={[styles.input, {
                                height: Math.max(40, this.state.textInputHeight < 180 ? this.state.textInputHeight : 180)
                            }]}
                            returnKeyType="send"
                            multiline={true}
                            numberOfLines={5}
                            controlled={true}
                            blurOnSubmit={false}
                            underlineColorAndroid="transparent"
                            value={this.state.inputValue}
                            placeholder="发送消息"
                            // ios only
                            enablesReturnKeyAutomatically={true}
                            onContentSizeChange={
                                (event) => {
                                    // this.setState({textInputHeight: event.nativeEvent.contentSize.height});
                                }
                            }
                            onChangeText={ (text) => {
                                this.setState({inputValue: text});
                            }}
                            onEndEditing={(event) => console.log("编辑完成")
                            }
                            onSubmitEditing={this._onSubmitEditing}
                        />
                    </View>
                    <View style={styles.rightIcon}>
                        <Icon name="tag-faces" size={25} style={{color: '#b2b2b2', margin: 7,}} onPress={() => {
                            this.setState({emojiBoxState: !this.state.emojiBoxState})
                        }}/>
                        <AddIcon name="ios-add-circle-outline" size={25} style={{color: '#b2b2b2', margin: 7}}/>
                    </View>
                </View>

                {/*<Animatable.View animation={this.state.emojiBoxState?'slideInUp':'slideInDown'}  direction="normal" duration={1000} style={{height:0}}>*/}
                {/*<View style={{height:0}}>*/}

                {/*<Tabs tabs={tabs2}*/}
                {/*initialPage={1}*/}
                {/*tabBarPosition="bottom"*/}
                {/*renderTab={tab => <Text>{tab.title}</Text>}*/}
                {/*>*/}
                {/*<Grid data={data1}*/}
                {/*isCarousel*/}
                {/*style={styles.emojiBox}*/}
                {/*onClick={_el => console.log(_el)}*/}
                {/*hasLine={false}*/}
                {/*itemStyle={styles.grid}*/}
                {/*carouselMaxRow={3}*/}
                {/*// columnNum={8}*/}
                {/*renderItem={(item) => (<Text style={styles.em}>{item.text}</Text>)}*/}
                {/*/>*/}
                {/*<Grid data={data1}*/}
                {/*isCarousel*/}
                {/*style={styles.emojiBox}*/}
                {/*onClick={_el => console.log(_el)}*/}
                {/*hasLine={false}*/}
                {/*itemStyle={styles.grid}*/}
                {/*carouselMaxRow={3}*/}
                {/*// columnNum={8}*/}
                {/*renderItem={(item) => (<Text style={styles.em}>{item.text}</Text>)}*/}
                {/*/>*/}
                {/*<Grid data={data1}*/}
                {/*isCarousel*/}
                {/*style={styles.emojiBox}*/}
                {/*onClick={_el => console.log(_el)}*/}
                {/*hasLine={false}*/}
                {/*itemStyle={styles.grid}*/}
                {/*carouselMaxRow={3}*/}
                {/*// columnNum={8}*/}
                {/*renderItem={(item) => (<Text style={styles.em}>{item.text}</Text>)}*/}
                {/*/>*/}
                {/*</Tabs>*/}

                {/*</View>*/}
                {/*</Animatable.View>*/}


            </View>
        );
        if (Platform.OS === 'ios') {
            return (
                <KeyboardAvoidingView
                    behavior="padding"
                    style={styles.KeyboardAvoidingView}
                    keyboardVerticalOffset={this.props.keyboardVerticalOffset || 64}
                >
                    {content}


                </KeyboardAvoidingView>
            );
        } else {
            return content;
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: "rgb(243,243,243)"
    },
    KeyboardAvoidingView: {
        flex: 1
    },
    bottomToolBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        backgroundColor: "white",
        borderColor: "#d7d7d7",
        marginTop: 50

    },
    sendButton: {
        marginHorizontal: 10,
        // backgroundColor: Color.WechatGreen,
        // borderColor: Color.WechatGreen
    },
    sendButtonText: {
        // color: Color.White
    },
    input: {
        flex: 1,
        borderWidth: 1,
        margin: 6,
        borderRadius: 4,
        borderColor: "#d7d7d7",
        fontSize: 12,
        paddingLeft: 8
    },
    messageCell: {
        marginTop: 5,
        marginBottom: 5,
    },
    messageCellText: {
        // fontSize: FontSize.Content
    },
    avatar: {
        borderRadius: 4,
        margin: 5,
        width: 40,
        height: 40
    },
    contentView: {
        borderRadius: 4,
        padding: 4,
        paddingHorizontal: 8,
        overflow: 'hidden',
        flex: 1,
        margin: 5,
        justifyContent: 'center'
    },
    endBlankBlock: {
        margin: 5,
        width: 50,
        height: 40
    },

    //dasd
    flexContainer: {

        flexDirection: 'row',
        borderTopWidth: 1,
        backgroundColor: "white",
        borderColor: "#d7d7d7",
        // marginTop: 50


    },

    cell: {
        flex: 1,
        // height: 40,

    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    leftIcon: {
        height: 40,
        width: 40,

    },
    rightIcon: {
        height: 40,
        width: 80,
        flexDirection: 'row'
    },

    emojiBox: {
        height: 150,
    },
    em: {
        // width: 30,
        // height: 30,
        alignItems: 'center',

    },
    grid: {
        height: 25,
        alignItems: 'center',
        justifyContent: 'center'

    }

});
export default Chat
