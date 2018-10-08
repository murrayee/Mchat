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
    container: {
        flex: 1,
    },
    wrapper: {
    },
    containerHorizontal: {
        flexGrow: 1,
        height: height,
    },
    imageGuide: {
        width: width,
        height: height,
        position: 'absolute',
        zIndex: -1
    },
    dot: {
        marginBottom: 20,
        width: 10,
        height: 2,
        marginRight: 10,
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    dotActive: {
        backgroundColor: 'rgba(255,255,255,1)',
        width: 15
    },
    desWrapper: {
        marginTop: height * 0.74,
        alignItems:'center',
        paddingLeft:20,
        paddingRight:20,
    },
    title: {
        fontSize:24,
        color:'white'
    },
    description: {
        fontSize:14,
        color:'white'
    },
    btn: {
        width: 220,
        height: 48,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 24,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color:'white',
        textAlign: 'center',
        fontSize: 16

    },

});
