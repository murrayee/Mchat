/**
 * Created by bear on 2018/2/5.
 */
import {StyleSheet, Dimensions} from 'react-native'
const {width} = Dimensions.get("window")
const MAX_HEIGHT = 200
export const indexStyles = StyleSheet.create({
})
export  const roomStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: "rgb(243,243,243)"
    },
    KeyboardAvoidingView: {
        flex: 1
    },
    bottomToolBar:{
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        backgroundColor: "white",
        borderColor: "#d7d7d7",
        minHeight:50

    },
    iphoneXInputInfo:{
        height:70
    },
    voice:{
        width:40,
        alignItems: 'center',
        justifyContent:'center'
    },
    inputInfo:{
        flex: 1,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        margin: 6,
        borderRadius: 4,
        borderColor: "#d7d7d7",
        fontSize: 14,
        paddingLeft: 8,
        minHeight:35,
        justifyContent:'center',
    },
    face:{
        width:40,
        alignItems: 'center',
        justifyContent:'center'
    },




    sendButton: {
        marginHorizontal: 10,
        // backgroundColor: Color.WechatGreen,
        // borderColor: Color.WechatGreen
    },
    sendButtonText: {
        // color: Color.White
    },

    messageCell: {
        marginTop: 5,
        marginBottom: 5,
    },
    messageCellText: {
        // fontSize: FontSize.Content
    },
    avatar: {
        borderRadius: 4,
        margin: 5,
        width: 40,
        height: 40
    },
    contentView: {
        borderRadius: 4,
        padding: 4,
        paddingHorizontal: 8,
        overflow: 'hidden',
        flex: 1,
        margin: 5,
        justifyContent: 'center'
    },
    endBlankBlock: {
        margin: 5,
        width: 50,
        height: 40
    },

    //dasd
    flexContainer: {

        flexDirection: 'row',
        borderTopWidth: 1,
        backgroundColor: "white",
        borderColor: "#d7d7d7",
        // marginTop: 50


    },

    cell: {
        flex: 1,
        // height: 40,

    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    leftIcon: {
        height: 40,
        width: 40,

    },
    rightIcon: {
        height: 40,
        width: 80,
        flexDirection: 'row'
    },

    emojiBox: {
        height: 150,
    },
    em: {
        // width: 30,
        // height: 30,
        alignItems: 'center',

    },
    grid: {
        height: 25,
        alignItems: 'center',
        justifyContent: 'center'

    }

});