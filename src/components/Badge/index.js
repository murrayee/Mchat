/**
 * Created by bear on 2018/2/5.
 */
import  React, {PureComponent} from 'react'
import {
    View,
    Text
} from 'react-native'
import styles  from './style'
export  default  class SearchBox extends PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <View style={styles.searchInfo} >
                <Text>123</Text>
            </View>

        )
    }
}