
import React,{Component} from 'react'
import {View, Text} from 'react-native'
import WebExample from '../../../components/common/webViewHtml'
// import WebExample from '../../../components/common/webView'
class WebApp extends Component{

    constructor(props) {
        super(props)
    }
    static navigationOptions = {
        headerTintColor: "#f3977c",
        headerStyle: {position: "absolute", top: 0}
    }
    render () {
        return  (<WebExample url={this.props.navigation.state.params.url}/>)
    }

}


export  default  WebApp