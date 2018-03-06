/**
 * Created by bear on 2017/7/11.
 */
import {StyleSheet, Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window')

export const styles = StyleSheet.create({
    contentContainer: {
        width: width,
        backgroundColor: 'white',
    },

})

export const authStyles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
    flexItem: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    heads: {
        width: 65,
        height: 65,
        borderRadius: 5,
    },
    itemInfo: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height / 3,
    },
    endItem:{
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: height / 3,
    },
    inputItem: {width: width,},
    button: {
        width: width,
        height: 40,
        marginTop:20
    },
    forget:{
        alignItems: 'center',
        marginTop:20
    },
    more:{
        marginBottom:20
    },
    color:{
        color: 'rgb(61,142,226)'
    },
    title:{
        fontSize:20,
        fontWeight:'600',
        color:'#108ee9'
    }
})

