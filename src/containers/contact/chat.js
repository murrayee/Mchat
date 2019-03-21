'use strict';
import React, {Component} from "react";
import {
    View,
} from "react-native";


import ChatView from "@components/ChatView";
import {chatStyles} from '@styles'

const messages = [
    {
        id: `${new Date().getTime()}1`,
        per: {
            type: "text",
            content: "hello world"
        },
        targetId: "12345678",
        chatInfo: {
            // avatar: require("@components/ChatScreen/source/image/avatar.png"),
            id: "12345678"
        },
        renderTime: true,
        sendStatus: 0,
        time: "1542006036549"
    },
    {
        id: `${new Date().getTime()}2`,
        per: {
            type: "text",
            content: "hi/{se}"
        },
        targetId: "12345678",
        chatInfo: {
            // avatar: require("@components/ChatScreen/source/image/avatar.png"),
            id: "12345678"
        },
        renderTime: true,
        sendStatus: 0,
        time: "1542106036549"
    },
    {
        id: `${new Date().getTime()}3`,
        per: {
            type: "image",
            content: {
                uri:
                    "https://upload-images.jianshu.io/upload_images/11942126-044bd33212dcbfb8.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240",
                width: 100,
                height: 80
            }
        },
        targetId: "12345678",
        chatInfo: {
            // avatar: require("@components/ChatScreen/source/image/avatar.png"),
            id: "12345678"
        },
        renderTime: false,
        sendStatus: 0,
        time: "1542106037000"
    },
    {
        id: `${new Date().getTime()}4`,
        per: {
            type: "text",
            content: "你好/{weixiao}"
        },
        targetId: "88886666",
        chatInfo: {
            // avatar: require("@components/ChatScreen/source/image/avatar.png"),
            id: "12345678"
        },
        renderTime: true,
        sendStatus: -2,
        time: "1542177036549"
    },
    {
        id: `${new Date().getTime()}5`,
        per: {
            type: "voice",
            content: {
                uri: "",
                length: 10
            }
        },
        targetId: "12345678",
        chatInfo: {
            // avatar: require("@components/ChatScreen/source/image/avatar.png"),
            id: "12345678"
        },
        renderTime: true,
        sendStatus: 1,
        time: "1542260667161"
    },
    {
        id: `${new Date().getTime()}6`,
        per: {
            type: "voice",
            content: {
                uri: "",
                length: 30
            }
        },
        targetId: "88886666",
        chatInfo: {
            // avatar: require("@components/ChatScreen/source/image/avatar.png"),
            id: "12345678"
        },
        renderTime: true,
        sendStatus: 0,
        time: "1542264667161"
    }
]

export default class Chat extends Component {

    render() {

        return (
            <View style={chatStyles.container}>
                <ChatView messageList={messages}/>
            </View>
        );
    }
}

