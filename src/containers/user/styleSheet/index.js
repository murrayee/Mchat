/**
 * Created by bear on 2018/2/5.
 */
import {StyleSheet, Dimensions} from 'react-native'
const {width} = Dimensions.get("window");

const MAX_HEIGHT = 200
export const indexStyles = StyleSheet.create({
    container: {},
    ListInfo: {
        padding: 8,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e9',
        borderTopWidth: 1,
        borderTopColor: '#e8e8e9',
    },
    extra: {
        fontSize: 14,
        color: "#919191"
    },
    head: {
        lineHeight: 25
    },
    Item: {
        fontSize: 16
    }
});
export const userInfoStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        width: width,
        backgroundColor: '#f0f1f1',
        position: 'absolute'
    },
    image: {
        height: MAX_HEIGHT,
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

    }
});
