/**
 * Created by Daemon1993 on 16/12/18.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated
} from 'react-native';


const Tag = "AMAText";
import AText from './AText'


const ATextCP = Animated.createAnimatedComponent(AText);

export default class AMAText extends Component {
  static propTypes = {
    value:0,
  };

// 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      value: new Animated.Value(0),
    };
  }

  componentDidMount() {
    console.log(Tag, 'componentDidMount');

    this.startAnimate(this.props.value)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value!=this.props.value){
      this.startAnimate(nextProps.value);
    }
  }
  startAnimate(progress) {

    this.state.value.setValue(0);
    Animated.timing(this.state.value, {
      toValue: progress,
      duration: 1000
    }).start();

  }


  render() {

    return (

      <ATextCP
        value={this.state.value}/>
    )
      ;
  }
}
