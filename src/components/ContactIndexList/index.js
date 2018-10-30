import React, {PureComponent} from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    PanResponder
} from 'react-native'
import {styles} from './style'
export  default class ContactIndexList extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._onShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._onShouldSetPanResponder,
            onPanResponderMove: this._onPanResponderMove,
            onResponderRelease: this._onResponderRelease
        })
    }
    _onShouldSetPanResponder = (e, gesture) => {
        return true
    }
    _onPanResponderMove = (e, gesture) => {
        const {section, scrollToSection, letters} = this.props
        const py = e.nativeEvent.pageY
        const px = e.nativeEvent.locationX
        const index = Math.floor((py - 143) / 15)
        if (index < 0 || index > letters.length) {
            return false
        }
        if (0 < px < 20) {
            scrollToSection(index, 0)
            return false
        }
    }
    _onResponderRelease = () => {
        console.log('手指抬起')
    }
    // {...this.panResponder.panHandlers}
    // this.info.measure((x, y, width, height, pageX, pageY) => {   }
    render() {
        const {section, scrollToSection, letters} = this.props
        return (
            <View pointerEvents='box-none' style={styles.container}>
                <View style={styles.content} ref={el => this.info = el}>
                    {
                        letters.map((item, index) =>
                            <TouchableOpacity
                                onPress={() => scrollToSection(index, 0)}
                                key={index}
                            >
                                <View style={section === item ? styles.activeLetter : styles.letterInfo}>
                                    <Text style={styles.letter}>{item}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
        )
    }
}
