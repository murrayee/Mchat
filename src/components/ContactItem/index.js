/**
 * Created by bear on 2018/2/5.
 */
import  React, {PureComponent} from 'react'
import {
    View,
    Text,
    TouchableHighlight,
    Image
} from 'react-native'
import styles  from './style'
export  default  class ContactItem extends PureComponent {
    render() {
        const {item,navigation} = this.props
        return (
            <TouchableHighlight
                onPress={() => navigation.navigate('contactInfo',{profile:item})}
                style={styles.content}
                underlayColor="#D8D8D8"
                key={item.key}
            >
                <View style={styles.info}>
                    <View>
                        <Image style={styles.thumb}
                               source={{url: item.avatar}}/>
                    </View>
                    <Text style={styles.name}>{item.username}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}