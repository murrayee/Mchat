/**
 * Created by bear on 2018/2/5.
 */
import {StyleSheet,Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window')
export  const styles = StyleSheet.create({
    container: {
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
        height:height-120,
        overflow:'hidden'
    },
    content:{
        // borderWidth:.5,
        // borderColor:'red'
    },
    letterInfo:{
        width:14,
        height:14,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:14,
        overflow:'hidden',
        marginBottom:1
    },
    activeLetter:{
        width:14,
        height:14,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:.5,
        borderColor:'red',
        borderRadius:14,
        backgroundColor:'#f2645d',
        overflow:'hidden',
        marginBottom:1
    },
    letter:{
        lineHeight:14,
        fontSize:9,
        // color:'#fff',

    },


})
