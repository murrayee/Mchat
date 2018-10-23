'use strict';

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native';


import AnimatedCircleProgress from './AnimatedCircleProgress'
import CircleProgressView from './CircleProgressView'
import AMAText from './AMAText'


export default class Demo extends React.Component {

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      progress: 100,
      callBackProgress: 0,
      update: true,
    };
  }

  changeProgress() {
    this.setState({
      progress: Math.random() * 360,
    });
  }


  render() {
    console.log('render');
    return (
      <View style={{alignItems: 'center', backgroundColor: 'red'}}>
        <TouchableOpacity style={{backgroundColor: '#665522', padding: 10}} onPress={()=>this.changeProgress()}>
          <Text>点击改变progress</Text></TouchableOpacity>
        <CircleProgressView progress={this.state.progress}>
          <View style={{backgroundColor: '#987123', flex: 1,  alignItems: 'center'}}>
            <Text>外部放入进度条中间的内容</Text>
          </View>
        </CircleProgressView>

        <AnimatedCircleProgress progress={this.state.progress}>
          <View style={{backgroundColor: '#987123', flex: 1,  alignItems: 'center',justifyContent:'center'}}>

            <AMAText value={this.state.progress}/>

          </View>
        </AnimatedCircleProgress>


      </View>

    )
  }
}
