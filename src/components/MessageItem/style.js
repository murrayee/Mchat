/**
 * Created by bear on 2018/2/5.
 */
import {StyleSheet, Dimensions} from 'react-native'
const {width} = Dimensions.get('window');
import badgeStyles from 'antd-mobile-rn/lib/badge/style/index.native'

export const customBadgeStyle=StyleSheet.create({
    ...badgeStyles,
    text:{
        ...badgeStyles.text,
        fontSize:10
    },
    textDom:{
        ...badgeStyles.textDom,
        backgroundColor: "#ff363f",
        top:0
    }
});
const styles = StyleSheet.create({
    info: {
        backgroundColor: '#fff',
    },
    thumb: {
        width: 40,
        height: 40
    },
    msgInfo: {
        width: width - 90,
        paddingLeft:10

    },
    item: {
        height:66,
        flex: 1,
        flexDirection: 'row'
    },
    extra: {
        width: 40,
        paddingRight:10

    },
    extraText:{
        fontSize:10,
        color:"rgb(177,177,177)",
        textAlign:'center',
        paddingTop:2,
    },
    title: {
        color:'black',
        fontSize:16
    },

    brief: {
        marginTop:6,
        color:"rgb(153,153,153)",
        fontSize:13
    },
    extraIcon:{
        color:"rgb(177,177,177)",
        fontSize:13,
        textAlign:'center',
        marginTop:12
    },
    itemInfo:{
        height:66,
        paddingTop:8
    }
});
export default  styles