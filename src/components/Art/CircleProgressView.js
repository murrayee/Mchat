/**
 * 圆形进度条
 * 内部可以放内容
 * 居中
 * Created by Daemon on 2016/12/12 11:57.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ART
} from 'react-native';

const {Group, Path, Shape, Surface, LinearGradient}=ART;

const Tag = "CircleProgressView";


export  default  class CircleProgressView extends Component {

  static defaultProps = {
    baseProgressWidth: 8,
    progressWidth: 10,
    totalNum: 360,
    progress: 0,
    raduis: 100,
    progressColor: '#485759',
    progressBaseColor: '#ffffff',
    centerViewMode: true,
  };

  static propTypes = {
    progress: 0,
    totalNum:0,

    progressWidth:0,
    baseProgressWidth:0,
    raduis: 0,

    progressColor:'',
    progressBaseColor:'',

    centerViewMode: false


  };

  // 构造
  constructor(props) {
    super(props);
    if (this.props.raduis < 0) {
      throw new Error(' radius must >0');
    }

    let size = (this.props.raduis) * 2;
    console.log("size " + size);
    let centerW = Math.sqrt(Math.pow(size / 2 - this.props.progressWidth * 3 / 2, 2) / 2) * 2;
    console.log("centerW " + centerW);
    let marginTop = size / 2 - centerW / 2;
    let marginLeft = size / 2 - centerW / 2;

    console.log("marginLeft " + marginLeft);
    this.state = {
      size: size,
      startX: size / 2,
      startY: this.props.progressWidth,
      //这才是真实半径
      originR: size / 2 - this.props.progressWidth,
      endX: size / 2,
      endY: this.props.progressWidth,
      startX1: size / 2,
      startY1: size - this.props.progressWidth,
      endX1: size / 2,
      endY1: size - this.props.progressWidth,
      centerW: centerW,
      marginTop: marginTop,
      marginLeft: marginLeft,
      target0: null,
      target1: null,
    };
  }

  componentDidMount() {

    this.changeProgress(this.props.progress, this.props.totalNum);

    // console.log(Tag,"mount "+this.refs['cricleMain'].width);
  }

  /**
   * 传入进度值
   * @param progress
   * @param totalNum
   */
  changeProgress(progress, totalNum) {
    let degress = progress / totalNum * 360;
    let target1 = null;
    //先计算 右边的
    let target = null;
    target = calTargetXY(progress, totalNum,
      this.state.startX, this.state.startY, this.state.originR);

    if (degress > 180) {
      //在计算左边的
      target1 = calTargetXY1(degress, this.state.startX1, this.state.startY1, this.state.originR);
      //log(Tag, "target1 " + target1);
    }

    if(target==null){
      return;
    }
    if(degress>180&& target1==null){
      return;
    }

    //console.log(Tag, "target " + target);
    // 初始状态
    this.setState({
      target0: target,
      target1: target1,
      endX: target[0],
      endY: target[1],
      endX1: target1 != null ? target1[0] : 0,
      endY1: target1 != null ? target1[1] : 0,
    });


  }

  componentWillReceiveProps(nextProps) {
    if (nextProps != this.props) {
      this.changeProgress(nextProps.progress, nextProps.totalNum);
    }
  }

  shouldComponentUpdate(nextProps, nexStatus) {
    // console.log('CP shouldComponentUpdate ');
    if (nexStatus.target0 != this.state.target0
      || nexStatus.target1 != this.state.target1) {
      return true;
    }
    // console.log(' false');
    return false;
  }

  /**
   * 底部基准的两个圆弧
   * @param flag
   * @returns {*|{index, routes}|NavigationState|ByteVector|Number}
   */
  getBase(flag) {
    if (flag == 0) {
      let pushStr = "M{0},{1} A{2},{3} 0 {4},{5} {6},{7}";
      let result = pushStr.format(this.state.startX, this.state.startY, this.state.originR, this.state.originR,
        0, 1, this.state.startX1, this.state.startY1);
      return new Path().push(result);
    } else {
      let pushStr = "M{0},{1} A{2},{3} 0 {4},{5} {6},{7}";
      let result = pushStr.format(this.state.startX1, this.state.startY1, this.state.originR, this.state.originR,
        0, 1, this.state.startX, this.state.startY);
      return new Path().push(result);
    }
  }

  //中间子View空出来的位置
  getCenterView() {
    if (this.props.centerViewMode) {


      return (
        <View key="centerView" style={[myStyles.centerViewStyle, {
          width: this.state.centerW,
          height: this.state.centerW,
          top: this.state.marginTop,
          left: this.state.marginLeft,
        }]}>
          {this.props.children}
        </View>
      );
    } else {
      return null;
    }
  }

  render() {
    // //下面arcTo和Push效果明明一样的 可以是绘制效果不一样 懵逼了 push才是想要的效果 超级不理解
    // let p =  "A25,25 0 0,1 25,50".replace(/(\.\d+)(?=\-?\.)/ig, '$1,') //-.3-.575 => -.3,-.575
    //     .match(/[a-df-z]|[\-+]?(?:[\d\.]e[\-+]?|[^\s\-+,a-z])+/ig);
    // console.log(p);
    // let i = 1;
    // console.log(p[i + 5], p[i + 6], p[i], p[i + 1], p[i + 3], !+p[i + 4], +p[i + 2]);
    //
    // const path = new Path()
    //     .moveTo(25, 0)
    //     .push()
    //     .arcTo(p[i + 5], p[i + 6], p[i], p[i + 1], p[i + 3], !+p[i + 4], +p[i + 2]);

    const path0 = this.getBase(0);
    const path00 = this.getBase(1);

    let pushStr = "M{0},{1} A{2},{3} 0 {4},{5} {6},{7}";
    let result = pushStr.format(this.state.startX, this.state.startY, this.state.originR, this.state.originR,
      0, 1, this.state.endX, this.state.endY);
    // console.log(result);

    const path = new Path()
      .push(result);

    let pushStr1 = "M{0},{1} A{2},{3} 0 {4},{5} {6},{7}";
    let path1 = new Path();
    if (this.state.endX1 > 0 && this.state.endY1 > 0) {
      let result1 = pushStr1.format(this.state.startX1, this.state.startY1, this.state.originR, this.state.originR,
        0, 1, this.state.endX1, this.state.endY1);
      // console.log(result1);
      path1.push(result1);
    }
    return (

      <View >
        <Surface width={this.state.size} height={this.state.size}>
          <Group>
            <Shape d={path0} stroke={this.props.progressBaseColor}
                   strokeWidth={this.props.baseProgressWidth}/>
            <Shape d={path00} stroke={this.props.progressBaseColor}
                   strokeWidth={this.props.baseProgressWidth}/>
            <Shape d={path} stroke={this.props.progressColor} strokeWidth={this.props.progressWidth}/>
            <Shape d={path1} stroke={this.props.progressColor} strokeWidth={this.props.progressWidth}/>
          </Group>
        </Surface>
        {this.getCenterView()}
      </View>

    );
  };
}

const myStyles = StyleSheet.create({

  centerViewStyle: {
    position: 'absolute',
  }
});

/**
 * 计算目的坐标位置 右边 <180度的计算
 * @param progress
 * @param total
 * @param startX
 * @param startY
 */
function calTargetXY(progress, total, startX, startY, radius) {
  let degress = progress / total * 360;
  if (degress > 180) {
    //log(Tag, '强制 degress -> 180');
    degress = 180;
  }
  //log(Tag, "开始位置 " + startX + " " + startY + "  r: " + radius + " degress  " + degress);
  let target = [];
  if (degress <= 90) {
    degress = degress * 2 * Math.PI / 360;
    // log(Tag, "sin " + Math.sin(degress));
    let endx = startX + radius * Math.sin(degress);
    let endy = startY + radius - radius * Math.cos(degress);
    target.push(endx);
    target.push(endy);
    return target;
  }
  else if (degress <= 180) {
    degress = degress - 90;
    degress = degress * 2 * Math.PI / 360;
    //  log(Tag, "sin " + Math.sin(degress));
    let endx = startX + radius * Math.cos(degress);
    let endy = startY + radius + radius * Math.sin(degress);
    target.push(endx);
    target.push(endy);
    return target;
  }
  return null;
}

/**
 * 左边圆的计算 >180度的计算
 * @param degress
 * @param startX
 * @param startY
 * @param radius
 */
function calTargetXY1(degress, startX, startY, radius) {
  let target = [];
  //log(Tag, "开始位置1 " + startX + " " + startY + "  r: " + radius + " degress  " + degress);
  if (degress > 360) {
    degress = 360;
  }
  if (degress <= 270) {
    degress = degress - 180;
    degress = degress * 2 * Math.PI / 360;
    //  log(Tag, Math.sin(degress));
    let endx = startX - radius * Math.sin(degress);
    let endy = startY - ( radius - +radius * Math.cos(degress));
    target.push(endx);
    target.push(endy);
    return target;
  } else if (degress <= 360) {
    degress = degress - 270;
    degress = degress * 2 * Math.PI / 360;
    let endx = startX - radius * Math.cos(degress);
    let endy = startY - radius - radius * Math.sin(degress);
    target.push(endx);
    target.push(endy);
    return target;
  }
}


//字符串的格式化
String.prototype.format = function (args) {
  var result = this;
  if (arguments.length < 1) {
    return result;
  }
  var data = arguments;        //如果模板参数是数组
  if (arguments.length == 1 && typeof (args) == "object") {
    //如果模板参数是对象
    data = args;
  }
  for (var key in data) {
    var value = data[key];
    if (undefined != value) {
      result = result.replace("{" + key + "}", value);
    }
  }
  return result;
};
