
import React,{Component} from 'react'
import {View, Text} from 'react-native'
import Carousel from '../../../components/common/src/index'
class ComponentExample extends Component{

    constructor(props) {
        super(props)
    }
    static navigationOptions = {
        headerTintColor: "white",
        headerStyle: {position: "absolute", top: 0}
    }
    render () {

        return  (<Carousel/>)
    }

}

export  default  ComponentExample