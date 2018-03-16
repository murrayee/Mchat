/**
 * Created by bear on 2018/2/24.
 */
/**
 * Created by bear on 2017/8/20.
 */
//解决键盘遮挡
import React, {Component} from 'react';
import {
    TextInput,
    View,
    FlatList,
    SafeAreaView,
    Animated,
    KeyboardAvoidingView,
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import uuid from 'uuid'
import {roomStyles} from '../styleSheet/index'
import MessageCell from '../../../components/MessageCell/messageCell'
import KeyboardAware from '../../../components/KeyboardAware/index'
import {Toast} from 'antd-mobile'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const data = Array.from(new Array(20)).map((_val, i) => ({
    remark: i % 2 === 0 ? 'me' : '',
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: '李佳鑫',
    des: `我是消息${i}`,
    key: `1231233${i}`,

}));

@connect(
    state => {
        return {...state.io, ...state.auth}
    })
class Chat extends Component {
    constructor(props) {
        super(props);
        this._userHasBeenInputed = false
        this.state = {
            inputValue: '',
            source: data
        }
    }

    _renderItemComponent = (row) => {
        return <MessageCell row={row}/>
    }

    _scrollToBottom() {
        this._listView.getNode().scrollToEnd()
    }

    _onSubmitEditing = () => {
        this._input.clear()
        data.push({
            remark: "me",
            img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
            des: this.state.inputValue
        })
        this.setState({source: data,inputValue:' '})

    }

    render() {
        return (
            <KeyboardAware style={roomStyles.KeyboardAvoidingView}>
                <SafeAreaView style={roomStyles.container}>
                    <AnimatedFlatList
                        ref={(el) => this._listView = el}
                        data={this.state.source}
                        keyExtractor={(item) => item.key}
                        showsVerticalScrollIndicator={false}//隐藏竖直滚动条
                        onRefresh={() => console.log('onRefresh: nothing to refresh :P')}
                        refreshing={false}
                        // scrollEnabled={} ////操作时会用到~~（滑动禁止）
                        renderItem={this._renderItemComponent}
                        onLayout={(e) => this._scrollToBottom(e)}
                        onContentSizeChange={(e) => this._scrollToBottom(e)}
                    >
                    </AnimatedFlatList>
                    <View style={[roomStyles.bottomToolBar]}>
                        <View style={roomStyles.voice}>
                            <Icon name="keyboard-voice" size={25}/>
                        </View>
                        <View style={roomStyles.inputInfo}>
                            <TextInput
                                ref={el => this._input = el}
                                style={[roomStyles.input]}
                                returnKeyType="send"
                                multiline={true}
                                numberOfLines={5}
                                controlled={true}
                                blurOnSubmit={false}
                                underlineColorAndroid="transparent"
                                value={this.state.inputValue}
                                enablesReturnKeyAutomatically={true}
                                onContentSizeChange={(event) => {
                                }}
                                onChangeText={(v) => this.setState({inputValue: v})}
                                onEndEditing={(e) => console.log("编辑完成")}
                                onSubmitEditing={this._onSubmitEditing}
                            />
                        </View>
                        <View style={roomStyles.face}>
                            <Icon name="tag-faces" size={25}/>
                        </View>
                    </View>
                </SafeAreaView>
            </KeyboardAware>
        )
    }

}

export default Chat