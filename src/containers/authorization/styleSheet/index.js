/**
 * Created by bear on 2017/7/11.
 */
import {
    StyleSheet,
    Dimensions
} from 'react-native';

const {
    width,
    height
} = Dimensions.get('window');

export const styles = StyleSheet.create({
    contentContainer: {
        width: width,
        backgroundColor: 'white'
    }
});

export const authStyles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    flexItem: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    heads: {
        width: 65,
        height: 65,
        borderRadius: 5
    },
    itemInfo: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,

    },
    inputTitle:{
        width:70,
        textAlign:'left',
        paddingRight:3,
        color:'#636363',
        fontSize:14
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft:15,
        marginRight:15,
        marginBottom:15,
        borderColor:'#e2e2e0',
        borderBottomWidth:1,
    },
    inputItem: {
        height:40,
        flex:1,
        paddingLeft:5
,        color:'#404040'
    },
    accountList:{
        bottom:0,
        borderWidth:1,
        borderColor:'#e2e2e0',
        width:width-100,
        left:85

    },
    icon:{
        width:40,
        justifyContent: 'center',
        alignItems: 'center',
        height:40,
    },
    button: {
        padding:15
    },
    forget: {
        alignItems: 'center',
    },
    more: {
        marginBottom: 10
    },
    color: {
        color: 'rgb(61,142,226)'
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#108ee9'
    }
});