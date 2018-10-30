import React, { Component } from 'react';
import {
  TextInput,
  View,
  FlatList,
  SafeAreaView,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import uuid from 'uuid';
import { roomStyles } from '../styleSheet/index';
import SessionCell from '../../../components/SessionCell/index';
import KeyboardAware from '../../../components/KeyboardAware/index';
import { createAction, Storage } from '../../../utils';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

@connect(
  state => ({ ...state.socket }),
  dispatch => {
    return bindActionCreators({
      emit: createAction('socket/emit'),
    }, dispatch);
  },
)
export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  componentDidMount() {
    // const { fetchCurrentHistory, currentChatPage } = this.props;
    // let key = this.getCurrentChatKey();
    // if (currentChatPage[key]) {
    //   fetchCurrentHistory(key, currentChatPage[key].number, currentChatPage[key].size);
    // } else {
    //   fetchCurrentHistory(key, currentChatPage.defaultNumber, currentChatPage.defaultSize);
    // }
  }

  renderItemComponent = (row) => {
    return <SessionCell row={row} userProfile={this.props.userProfile}/>;
  };

  scrollToBottom() {
    this._listView.getNode().scrollToEnd();
  }

  loadMoreHistoryMessage = () => {
    const { fetchCurrentHistory, currentChatPage } = this.props;
    let key = this.getCurrentChatKey();
    let next = currentChatPage[key].number;
    let noMore = currentChatPage[key].noMore;
    if (!noMore) {
      fetchCurrentHistory(key, ++next, currentChatPage.defaultSize);
    } else {
      return false;
    }
  };
  submit = async () => {
    const { navigation, emit } = this.props;
    const { state } = navigation;
    const from = await Storage.get('murray/user');
    const to = state.params.profile;
    const payload = {
      message: {
        type: 'txt',
        content: this.state.inputValue,
      },
      from: from.data,
      to: to,
      uuid: uuid.v4(),
    };
    emit({ ...payload });
  };
  getCurrentChatKey = () => {
    const { navigation, userProfile } = this.props;
    const { state } = navigation;
    const toUserInfo = state.params.profile;
    let userInfo = userProfile;
    return `${userInfo._id}-${toUserInfo._id}`;
  };

  render() {
    return (
      <KeyboardAware style={roomStyles.KeyboardAvoidingView}>
        <SafeAreaView style={roomStyles.container}>
          <AnimatedFlatList
            ref={(el) => this._listView = el}
            data={[]}
            keyExtractor={(item) => item.uuid}
            showsVerticalScrollIndicator={false}//隐藏竖直滚动条
            onRefresh={() => this.loadMoreHistoryMessage()}
            refreshing={false}
            style={{ backgroundColor: 'rgb(243,243,243)' }}
            // scrollEnabled={} ////操作时会用到~~（滑动禁止）
            renderItem={this.renderItemComponent}
            onLayout={(e) => this.scrollToBottom(e)}
            onContentSizeChange={(e) => this.scrollToBottom(e)}
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
                blurOnSubmit={true}
                underlineColorAndroid="transparent"
                value={this.state.inputValue}
                enablesReturnKeyAutomatically={true}
                onContentSizeChange={(event) => {
                }}
                onChangeText={(v) => this.setState({ inputValue: v })}
                onEndEditing={(e) => console.log('编辑完成')}
                onSubmitEditing={this.submit}
              />
            </View>
            <View style={roomStyles.face}>
              <Icon name="tag-faces" size={25}/>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAware>
    );
  }

}
