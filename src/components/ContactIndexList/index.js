import React, {PureComponent} from 'react'
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import {styles} from './style'
export  default class ContactIndexList extends PureComponent {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <View pointerEvents='box-none' style={styles.content}>
                {
                    this.props.letters.map(i=>
                        <View><Text style={styles.letter}>{i}</Text></View>

                    )
                }
            </View>
        )
    }
}
