/**
 * Created by bear on 2018/2/5.
 */
import  React, {PureComponent} from 'react'
import {
    View,
    Text
} from 'react-native'
import styles  from './style'
export  default  class SectionHeader extends PureComponent {
    render() {
        return (
            <View style={styles.info}>
                <Text style={styles.letter}>{this.props.section.key}</Text>
            </View>

        )
    }
}