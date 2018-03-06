/**
 * Created by bear on 2018/2/5.
 */
import {StyleSheet,Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window')
export  const styles = StyleSheet.create({
    content: {
        flex:1,
        position:'absolute',
        // borderWidth:.5,
        // borderColor:'red',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        right:0,
        top:0,
        width:20,
        backgroundColor:'transparent',
        height:height-120
    },
    letter:{
        lineHeight:15,
        fontSize:10
    }


})
