/**
 * Created by bear on 2017/6/28.
 */

import {StyleSheet, Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window')

export const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: "rgb(240,241,241)"
    },


})


export const contactInfoStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        width: width,
        backgroundColor: '#f0f1f1',
        position: 'absolute'
    },
    image: {
        height: 200,
        width: width,
        alignSelf: "stretch",
        resizeMode: "cover",
    },
    titleContainer: {
        flex: 1,
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center",

    },
    username: {
        color: "white",
        backgroundColor: "transparent",
        fontSize: 18,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35
    },
    buttons:{
        margin:10
    },
    send:{
        // backgroundColor:'#f2645d',
        // color:'white'
    }
})

