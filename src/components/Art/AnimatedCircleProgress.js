/**
 * 圆形进度条 动画效果类
 * 内部可以放内容
 * 个性化通过props配置
 * Created by Daemon on 2016/12/13 17:55.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated
} from 'react-native';

import CircleProgressView from './CircleProgressView';

const AnimatedCP = Animated.createAnimatedComponent(CircleProgressView);

const Tag = "AnimatedCircleProgress";
export default class AnimatedCircleProgress extends Component {

  static defaultProps = {
    durtime: 1000,
    progress: 0,
  };



  static propTypes = {

    progress:0,
    totalNum:0,

    progressWidth:0,
    baseProgressWidth:0,
    raduis:0,

    durtime:'',
    progressColor:'',
    progressBaseColor:'',
    centerViewMode:false,

  };


  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      progress1: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(Tag,'componentWillReceiveProps');
    if (nextProps.progress != this.props.progress
      || this.props.totalNum!=nextProps.totalNum) {
      this.startAnimate(nextProps.progress);
    }
  }

  componentDidMount() {
    console.log(Tag, 'componentDidMount');

    this.startAnimate(this.props.progress)
  }

  startAnimate(progress) {
    console.log(Tag,'startAnimate');
    this.state.progress1.setValue(0);
    Animated.timing(this.state.progress1, {
      toValue: progress,
      duration: this.props.durtime
    }).start();

  }

  render() {

    const {durtime, progress, ...other} = this.props;

    return (
      <AnimatedCP
        {...other}
        progress={this.state.progress1}
      />
    );
  }

}
