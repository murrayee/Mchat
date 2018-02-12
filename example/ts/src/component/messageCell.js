

import React, { Component }  from 'react';
import {
    PanResponder,
    StyleSheet,
    View,
    Text,
    processColor,
    Image
} from 'react-native';

class MessageCell extends Component {
    render() {
        let {  data } = this.props;

        let differentStyle = {};
        if (data.remark === 'me') {
            differentStyle = {
                flexDirection: 'row-reverse',
                backgroundColor: '#CCE4FC'
            };
        } else {
            differentStyle = {
                flexDirection: 'row',
                backgroundColor: '#FFFFFF'
            };
        }


        return (
            <View
                style={[styles.messageCell, {flexDirection: differentStyle.flexDirection}]}
            >
                <Image
                    source={{uri: 'https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png'}}
                    style={styles.avatar}
                />
                <View
                    style={[styles.contentView, {backgroundColor: differentStyle.backgroundColor}]}
                >

                        <Text style={styles.messageCellText}>{data.des}</Text>

                </View>
                <View style={styles.endBlankBlock} />

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        // backgroundColor: Color.BackgroundGrey
    },
    KeyboardAvoidingView: {
        flex: 1
    },
    bottomToolBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        // borderTopColor: Color.LittleGrey
    },
    sendButton: {
        marginHorizontal: 10,
        // backgroundColor: Color.WechatGreen,
        // borderColor: Color.WechatGreen
    },
    sendButtonText: {
        // color: Color.White
    },
    input: {
        flex: 1,
        // color: Color.Black,
        // fontSize: FontSize.Main,
        padding: 10
    },
    messageCell: {
        marginTop: 5,
        marginBottom: 5,
    },
    messageCellText: {


        fontSize:12,
        lineHeight:16,
        // backgroundColor:"red"
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
        flex: 2,
        margin: 5,
        justifyContent: 'center',

    },
    endBlankBlock: {
        margin: 5,
        width: 80,
        height: 40
    }
});

export  default  MessageCell