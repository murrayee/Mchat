
import React,{Component} from 'react'
import {View, Text} from 'react-native'
// import WebExample from '../../../components/common/webViewHtml'
import WebExample from '../../../components/common/webView'
class MeiLunGo extends Component{

    constructor(props) {
        super(props)
    }
    render () {
        return  (<WebExample url={'http://web.meilungo.com'}/>)
    }

}


export  default  MeiLunGo