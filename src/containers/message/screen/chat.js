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
import * as socket from '../../../actions/socket'
import uuid from 'uuid'
import {roomStyles} from '../styleSheet/index'
import MessageCell from '../../../components/MessageCell/index'
import KeyboardAware from '../../../components/KeyboardAware/index'
import {Toast} from 'antd-mobile'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

@connect(
    state => {
        return {...state.io, ...state.auth}
    },
    dispatch => {
        return bindActionCreators({...socket}, dispatch)
    }
)
class Chat extends Component {
    constructor(props) {
        super(props);
        this._userHasBeenInputed = false
        this.state = {
            inputValue: '',
        }
    }

    _renderItemComponent = (row) => {
        return <MessageCell row={row} authProfile={ this.props.authProfile}/>
    }

    _scrollToBottom() {
        this._listView.getNode().scrollToEnd()
    }
    _onSubmitEditing = () => {
        const {navigation, socket, authProfile, emitMessage} = this.props
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
                avatar:'',
                name: userInfo.username
            }
        };
        this._userHasBeenInputed = true
        emitMessage(socket,messageParams)
    }

    render() {
        return (
            <KeyboardAware style={roomStyles.KeyboardAvoidingView}>
                <SafeAreaView style={roomStyles.container}>
                    <AnimatedFlatList
                        ref={(el) => this._listView = el}
                        data={this.props.currentChatRoomHistory}
                        keyExtractor={(item) => item.uuid}
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
                                clearTextOnFocus={false}
                                // clearButtonMode='always'
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