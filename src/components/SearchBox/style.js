/**
 * Created by bear on 2018/2/5.
 */
import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({

    searchInfo:{
        height:46,
        flex:1,
        backgroundColor:"rgb(240,241,241)"
    },
    box:{
        flex:1,
        flexDirection:'row',
        height:30,
        margin:8,
        backgroundColor:"white",
        // alignItems:'center'
        justifyContent: 'center',
        alignItems: 'center',
        overflow:'hidden',
        borderRadius:3
    },
    text:{
        textAlign:'center',
        lineHeight:30,
        color:'rgb(189,189,189)',
        marginLeft:8,
        fontSize:14
    },
    searchIcon:{
        lineHeight:30,
        color:'rgb(189,189,189)',
        marginTop:3

    },
    voiceIcon:{
        position:'absolute',
        lineHeight:30,
        color:'rgb(189,189,189)',
        marginTop:3,
        right:0,
        marginRight:10
    }
})
export default  styles