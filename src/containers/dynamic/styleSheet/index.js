/**
 * Created by bear on 2018/2/5.
 */
import {StyleSheet, Dimensions} from 'react-native'
const {width} = Dimensions.get("window")
const MAX_HEIGHT = 200

export  const indexStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    separator:{
        height:10
    }
});