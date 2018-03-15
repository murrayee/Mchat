
import React,{Component} from 'react'
import {View, Text} from 'react-native'
// import WebExample from '../../../components/common/webViewHtml'
import WebExample from '../../../components/common/webView'
class Mercku extends Component{

    constructor(props) {
        super(props)
    }
    render () {

        return  (<WebExample url={'http://10.70.103.212:8080'}/>)
    }

}


export  default  Mercku