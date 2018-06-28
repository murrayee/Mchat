/**
 * Created by bear on 2018/2/5.
 */

import {StyleSheet,Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        position:'absolute',
        backgroundColor:'black',
        zIndex:100,
        top:0,
        opacity:0.95
    }
})
export default  styles