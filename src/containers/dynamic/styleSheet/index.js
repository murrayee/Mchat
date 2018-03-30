/**
 * Created by bear on 2018/2/5.
 */
import {StyleSheet, Dimensions} from 'react-native'

const {width} = Dimensions.get("window")
const MAX_HEIGHT = 200

export const indexStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    separator: {
        height: 10
    }
});
export const articleStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    header: {
        minHeight: 50,
        borderBottomWidth:1,
        borderBottomColor:"#f2f2f2",
        padding:10,

    },
    titleBox:{
        paddingBottom:10
    },
    title:{
        fontSize:16
    },
    message:{
        flexDirection:'row'
    },
    text:{
        fontSize: 12,
        color: '#6a6a6a',
        flex:1,
        lineHeight:20
    },
    textLeft:{
        textAlign: 'left',
    },
    textRight:{
        textAlign: 'right',
    },
    content:{
        padding:10
    },
    handle:{
        height:44,
        opacity:.9,
        borderTopWidth:1,
        borderTopColor:'#f2f2f2',
        flexDirection:'row'
    },
    box:{
        flex:1,
        alignItems:'center',
        justifyContent:'flex-end'

    },
    handleText:{
        fontSize:10,
        color: '#6a6a6a',
        paddingTop:5

    }
});