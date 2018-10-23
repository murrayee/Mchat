import React from 'react';
import {
  View,
  ART,
} from 'react-native';

const { Group, Path, Shape, Surface, LinearGradient,Text } = ART;

export default class Line extends React.Component {


  line() {
    const path = ART.Path();
    path.moveTo(1, 1); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(300, 1); //连线到目标点(300,1)
    return path;
  }
  rect(){
    const path = new Path()
      .moveTo(1,1)
      .lineTo(1,99)
      .lineTo(99,99)
      .lineTo(99,1)
      .close();
    return path;
  }

  circle(){
    const path = new Path()
      .moveTo(50,1)
      .arc(0,99,25)
      .arc(0,-99,25)
      .close();
    return path;
  }
  render() {
    return (
      <View style={this.props.style}>
        <View style={{ height: 20 }}></View>
        <Surface width={300} height={2}>
          <Shape d={this.line()} stroke="#000000" strokeWidth={1}/>
        </Surface>
        <View style={{ height: 20 }}></View>
        <Surface width={300} height={2}>
          <Shape d={this.line()} stroke="#000000" strokeWidth={2} strokeDash={[10, 5]}/>
        </Surface>
        <View style={{ height: 20 }}></View>
        <Surface width={100} height={100}>
          <Shape d={this.rect()} stroke="#000000" fill="#892265" strokeWidth={1} />
        </Surface>
        <View style={{ height: 20 }}></View>
        <Surface width={100} height={100}>
          <Shape d={this.circle()} stroke="#000000" strokeWidth={1}/>
        </Surface>
        <View style={{ height: 20 }}></View>
        <Surface width={100} height={100}>
          <Text strokeWidth={1} stroke="#000" font="bold 35px Heiti SC" path={new Path().moveTo(40,40).lineTo(99,10)} >Swipe</Text>
        </Surface>
        <View style={{ height: 20 }}></View>
      </View>
    );
  }
}
