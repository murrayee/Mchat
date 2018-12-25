import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createAction } from '../../../utils';
import {
  View,
  Text,
  ScrollView,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Video from 'react-native-video';
const {width, height} = Dimensions.get("window")
// import Bubble from '../../../components/Bubble';


@connect(
  state => {
    return { ...state.dynamic };
  },
  dispatch => bindActionCreators({
    fetchFeeds: createAction('dynamic/fetch'),
  }, dispatch),
)
class User extends Component {
  constructor(props, context) {
    super(...arguments);
    this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      paused: false,
    };

  }

  componentDidMount() {
    this.props.fetchFeeds();
  }

  render() {
    const { feeds } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}>
          {feeds.aweme_list && feeds.aweme_list.map((item, index) => (
            <Video
              key={index}
              source={{ uri: item.video.bit_rate[0].play_addr.url_list[0] }}
              ref={(ref) => { //方法对引用Video元素的ref引用进行操作
                this.video = ref
              }}
              // source={{ uri: 'https://gslb.miaopai.com/stream/HNkFfNMuhjRzDd-q6j9qycf54OaKqInVMu0YhQ__.mp4?ssig=bbabfd7684cae53660dc2d4c2103984e&time_stamp=1533631567740&cookie_id=&vend=1&os=3&partner=1&platform=2&cookie_id=&refer=miaopai&scid=HNkFfNMuhjRzDd-q6j9qycf54OaKqInVMu0YhQ__', type: 'mpd' }}
              style={{ width: width, height: height}}//组件样式
              rate={this.state.rate}//播放速率
              paused={this.state.paused}//暂停
              volume={this.state.volume}//调节音量
              muted={this.state.muted}//控制音频是否静音
              resizeMode={this.state.resizeMode}//缩放模式
              onLoad={this.onLoad}//加载媒体并准备播放时调用的回调函数。
              onProgress={this.onProgress}//视频播放过程中每个间隔进度单位调用的回调函数
              onEnd={this.onEnd}//视频播放结束时的回调函数
              onAudioBecomingNoisy={this.onAudioBecomingNoisy}//音频变得嘈杂时的回调 - 应暂停视频
              onAudioFocusChanged={this.onAudioFocusChanged}//音频焦点丢失时的回调 - 如果焦点丢失则暂停
              repeat={false}//确定在到达结尾时是否重复播放视频。
            />
          ))
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default User;
