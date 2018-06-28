/**
 * Created by bear on 2018/2/5.
 */
import  React, {PureComponent} from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import styles  from './style'
import Icon from 'react-native-vector-icons/Ionicons'
export  default  class SearchBox extends PureComponent {
    constructor(props) {
        super(props)
    }
    setModalVisible(visible){
        this.props.onPress(visible)
    }
    render() {
        return(
        <TouchableOpacity activeOpacity = {1} style={styles.searchInfo} onPress={()=>this.setModalVisible(true)}>
            <View style={styles.box} >
                <Icon name='ios-search-outline' size={16} style={styles.searchIcon}/>
                <Text style={styles.text}>搜索</Text>
                <Icon name='ios-mic' size={18} style={styles.voiceIcon}/>
            </View>
        </TouchableOpacity>

        )
    }
}