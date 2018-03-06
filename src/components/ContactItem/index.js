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
        const {item} = this.props
        return (
            <TouchableHighlight
                onPress={() => console.log('123213')}
                style={styles.content}
                 underlayColor="#D8D8D8"
            >
                <View style={styles.info} key={item.key}>
                    <View>
                        <Image style={styles.thumb}
                               source={{url: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png'}}/>
                    </View>
                    <Text style={styles.name}>{item.username}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}