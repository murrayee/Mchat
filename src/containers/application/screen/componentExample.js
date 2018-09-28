
import React,{Component} from 'react'
import {
    View, Text,
    DeviceEventEmitter,
    Button

} from 'react-native'
import Carousel from '../../../components/common/src/index'
class ComponentExample extends Component{

    constructor(props) {
        super(props)
    }
    static navigationOptions = {
        headerTintColor: "white",
        headerStyle: {position: "absolute", top: 0}
    }
    componentDidMount() {
        // DeviceEventEmitter.emit('left', '发送了个通知');
        // this.deEmitter = DeviceEventEmitter.addListener('left', (a) => {
        //     alert('收到通知：' + a);
        // });
    }
    render () {

        return  (
            <View style={{flex:1}}>
                <View style={{height:200}}>
                    <Text>12312321</Text>
                </View>
                <Button title="发送通知" onPress={() => {
                    // DeviceEventEmitter.emit('left', '发送了个通知');
                }}/>
                <Carousel/>
            </View>
        )


    }

}

export  default  ComponentExample