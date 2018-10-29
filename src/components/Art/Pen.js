import React, {PureComponent, Component} from 'react';
import {
  StyleSheet,
  View,
  ART,
  Dimensions,
  PanResponder,
} from 'react-native';

const {
  Shape,
  Surface,
  Group,
  Path
} = ART
//获取屏幕的宽高
const {width, height} = Dimensions.get('window');
export default class MyResponder extends PureComponent {


  constructor(props) {
    super(props);
    this.state = {
      //用于更新界面
      lastX: 0,

    };

    //每次移动的临时数组
    this.MousePostion = {
      firstX:0, //起点 X 坐标
      firstY:0,// 起点 Y 坐标
      x: 0,   //经过路径的x坐标
      y: 0    //经过路径的y坐标
    }
    //path 全部路径数组
    this.MousePostions = []
  }


  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      onPanResponderGrant: (evt, gestureState) => {
        //手指按下时的画笔起点坐标
        this.tempfirstX = evt.nativeEvent.pageX
        this.tempFirstY = evt.nativeEvent.pageY
      },//激活时做的动作
      onPanResponderMove: (evt, gestureState) => {

        //
        this.MousePostion = {
          firstX:this.tempfirstX,
          firstY:this.tempFirstY,
          x: this.tempfirstX + gestureState.dx,
          y: this.tempFirstY + gestureState.dy
        }
        this.MousePostions.push(this.MousePostion);

        //更新界面
        this.setState({
          lastX: this.MousePostions[0].x + gestureState.dx,
        })


      }, //移动时作出的动作

      onPanResponderRelease: (evt, gestureState) => {
      },///动作释放后做的动作

      onPanResponderTerminate: (evt, gestureState) => {
      },
    });

  }


  render() {

    const path = new Path();
    for (let i = 0; i < this.MousePostions.length; i++) {
      let tempFistX = this.MousePostions[i].firstX
      let tempFistY = this.MousePostions[i].firstY
      let tempX = this.MousePostions[i].x
      let tempY = this.MousePostions[i].y
      if (i == 0) {
        path.moveTo(tempFistX, tempFistY)
        path.lineTo(tempX, tempY)
        path.close();
      } else {
        let tempFistX_1 = this.MousePostions[i-1].firstX

        if(tempFistX==tempFistX_1){
          let tempX_1 = this.MousePostions[i - 1].x
          let tempY_1 = this.MousePostions[i - 1].y
          path.moveTo(tempX_1, tempY_1)
          path.lineTo(tempX, tempY)
          path.close();
        }else {
          path.moveTo(tempFistX, tempFistY)
          path.lineTo(tempX, tempY)
          path.close();
        }


      }

    }

    return (
      <View style={styles.container} {...this._panResponder.panHandlers} >
        <Surface width={width} height={height}>
          <Group>
            <Shape d={path} stroke="#000000" strokeWidth={1}/>
          </Group>
        </Surface>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // width: 300,
    // height: 300,
    flex: 1,
  },
});
