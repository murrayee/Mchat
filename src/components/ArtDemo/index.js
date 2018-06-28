
/**
 * Created by DELL on 2016/12/13.
 */
'use strict';
import React ,{Component}from 'react';
import {
    StyleSheet,
    View,
    ART
} from 'react-native';
const {Surface, Shape, Path, Group} = ART;

import Dimensions from 'Dimensions';
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const w = ScreenWidth;
const h = Math.ceil(ScreenHeight * 0.2);
const curvature = 2;//二次贝塞尔曲线曲率控制参数
const step = 20;//一次推进10距离单位
const stepNum = Math.floor(w / step);//屏幕宽度可容纳几个速率峰值的显式

let speedCount = 300;
let speedCountHandle = -1;
const debugMsg = true;
//T只需要一个坐标，其控制点已由前面的Q的控制点控制（控制方式为对称控制，比如Q5 20, 10 20 T15 35，相当于Q5 20, 10 20 T15 20,15 35）
//因此起点坐标(0,0)Q终点坐标(10,20)与T坐标(15,35)组成一条二次平滑贝塞尔曲线，
//（平滑的意思是Q终点坐标并不是作为下一条贝塞尔曲线的起点，而是通过T坐标使Q终点坐标再次延伸一点至T坐标，构成贝塞尔曲线的顺滑结尾，并以T坐标为下一条贝塞尔曲线的起点坐标）
//Q终点坐标的控制点坐标的获取方案为：取起点坐标与Q终点坐标的X轴坐标的中点为X，取Q终点坐标的Y轴坐标为Y
//T坐标的获取方案为：取相邻两个Q终点坐标的X轴坐标与Y轴坐标的终点坐标为X和Y
//例如：const _path = new Path("M0 0 Q5 20, 10 20 T15 35, Q17.5 50, 20 50 T25 25, Q27.5 0, 30 0 T35 0, Q37.5 0, 40 0 T45 15, Q47.5 30, 50 30 T55 20, Q57.5 10, 60 10 T65 5, Q67.5 0, 70 0");
export default class SpeedCanvas extends Component{
    constructor(props){
        super(props)
        this.state={
            speedLevel: 1,//速率档位 1档(0-h) 2档(h-2h) 3档(2h-3h) 4档(3h-4h) 5档(4h-5h)... h一般为100多
            speedStr: ' ',
            speedArr: []//[[10,20,[5,20],[15,35]],[20,50,[17.5,50],[25,25]],[30,0,[27.5,0],[35,0]],[40,0,[37.5,0],[45,15]],[50,30,[47.5,30],[55,20]],[60,10,[57.5,10],[65,5]],[70,0,[67.5,0],[72.5,0]]] 第一个为坐标，第二个为速率，第三个为Q控制点坐标，第四个为T坐标
        }

    }

    static getDefaultProps={
            speed: 0
    }

    componentDidMount(){
    }
    componentWillReceiveProps(props){
        clearTimeout(speedCountHandle);
        speedCountHandle = setTimeout(()=> {
            this.receiveSpeed({speed: props.speed});
        }, speedCount);//此处定时器用于清除频繁的state状态改变而导致的频繁画线
    }
    receiveSpeed(props){
        this.console("receiveSpeed===currSpeed:" + props.speed);
        //保证最新的速率曲线在数组的第一位
        let _currLength = this.state.speedArr.length;
        let _speedLevel = 1;
        this.state.speedLevel = 1;//若不重置此值，则speedLevel记录最高档，速率曲线图不会随着档位的下降而自动以该档位的最高速率填满画布
        if (_currLength < stepNum) {
            this.state.speedArr.splice(0, 0, [10, props.speed]);
            _currLength = this.state.speedArr.length;
            for (let i = 0; i < _currLength; i++) {
                this.state.speedArr[i][0] = (i + 1) * step;//重置X轴坐标为10,20,30...
                _speedLevel = Math.ceil(this.state.speedArr[i][1] / h);
                _speedLevel > this.state.speedLevel ? this.state.speedLevel = _speedLevel : null;
            }
            this.checkSpeedArr();
        }
        else {
            this.state.speedArr.splice(_currLength - 1, 1);//清除数组最末元素，也即最旧的速率值
            this.state.speedArr.splice(0, 0, [10, props.speed]);//往数组首元素中插入最新速率值
            _currLength = this.state.speedArr.length;
            for (let i = 0; i < _currLength; i++) {
                this.state.speedArr[i][0] = (i + 1) * step;//重置X轴坐标为10,20,30...
                _speedLevel = Math.ceil(this.state.speedArr[i][1] / h);
                _speedLevel > this.state.speedLevel ? this.state.speedLevel = _speedLevel : null;
            }
            this.checkSpeedArr();
        }
    }
    //确定各个速率点以及各速率点的Q、T点
    checkSpeedArr(){
        let _speedArr = this.state.speedArr;
        for (let i = 0, j = _speedArr.length; i < j; i++) {
            if (i > 0) {
                _speedArr[i].length > 2 ? _speedArr[i].splice(2) : null;
                _speedArr[i].push([_speedArr[i - 1][3][0] + (_speedArr[i][0] - _speedArr[i - 1][3][0]) / curvature, _speedArr[i][1]]);//添加当前坐标的控制点(Q坐标的控制点)
                if (_speedArr[i + 1] !== undefined) {
                    _speedArr[i].push([_speedArr[i][0] + (_speedArr[i + 1][0] - _speedArr[i][0]) / curvature * (curvature - 1), _speedArr[i][1] + (_speedArr[i + 1][1] - _speedArr[i][1]) / 2]);//添加T坐标点
                }
                else {
                    _speedArr[i].push([_speedArr[i][0] + (_speedArr[i][0] - _speedArr[i][2][0]), 0]);//添加T坐标点，当其为最后一个坐标点时候，需要与X轴闭合
                }
            }
            else {
                _speedArr[i].push([_speedArr[i][0] / curvature, _speedArr[i][1]]);//添加当前坐标的控制点(Q坐标的控制点)
                if (_speedArr[i + 1] !== undefined) {
                    _speedArr[i].push([_speedArr[i][0] + (_speedArr[i + 1][0] - _speedArr[i][0]) / curvature * (curvature - 1), _speedArr[i][1] + (_speedArr[i + 1][1] - _speedArr[i][1]) / 2]);//添加T坐标点
                }
                else {
                    _speedArr[i].push([_speedArr[i][0] + (_speedArr[i][0] - _speedArr[i][2][0]), 0]);//添加T坐标点，当其为最后一个坐标点时候，需要与X轴闭合
                }
            }
        }
        this.checkSpeedStr();
    }
    //右下角坐标系的转换，以右下角为坐标系统的映射方式为：(0,0)=>(w,h) (5,10)=>(w-5,h-10)
    checkSpeedStr(){
        this.console("checkSpeedStr===speedLevel:" + this.state.speedLevel);
        let _str = "M" + w + " " + h + " ";
        let _speedArr = [].concat(JSON.parse(JSON.stringify(this.state.speedArr)));//拷贝一下数组，用于将坐标系转换成右下角坐标系
        let _speedLevel = this.state.speedLevel;
        for (let i = 0, j = _speedArr.length; i < j; i++) {
            _str += "Q" + (w - _speedArr[i][2][0]) + " " + (h - _speedArr[i][2][1] / _speedLevel) + ", " + (w - _speedArr[i][0]) + " " + (h - _speedArr[i][1] / _speedLevel);
            if (_speedArr[i][3] !== undefined) {
                _str += " T" + (w - _speedArr[i][3][0]) + " " + (h - _speedArr[i][3][1] / _speedLevel) + ", ";
            }
        }
        this.setState({speedStr: _str});
    }
    render() {
        //this.console("render===speedStr:" + this.state.speedStr);
        const _path = new Path(this.state.speedStr).close();
        return (
            <View style={Styles.canvasWrap}>
                <Surface width={w} height={h}>
                    <Shape d={_path} stroke="#36ffff" strokeWidth={2} fill="rgba(54,255,255,0.2)"/>
                </Surface>
            </View>
        );
    }
    console(msg){
        debugMsg ? console.log("+++speedCanvas===" + msg + "===console end+++") : null;
    }
};

const Styles = StyleSheet.create({
    canvasWrap: {
        width: w,
        height: h,
        borderBottomWidth: 2,
        borderBottomColor: '#36ffff'
    }
});
