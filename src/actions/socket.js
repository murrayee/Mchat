/**
 * Created by bear on 2018/3/8.
 */
import {socketTypes} from '../config/constant';
import * as socketService from '../services/socket.io.Service'
import {Toast} from "antd-mobile/lib/index";

const socketConnection = (socket, socketId) => ({
    type: socketTypes.SOCKET_CONNECTION, socket, socketId
})
const socketDisConnection = () => ({
    type: socketTypes.SOCKET_DISCONNECTION,
})
const currentMessage = (messageProfile, currentChatKey) => ({
    type: socketTypes.SOCKET_EMIT_MESSAGE, messageProfile, currentChatKey
})
const receivedMessage = (messageProfile, currentChatKey) => ({
    type: socketTypes.SOCKET_ON_MESSAGE, messageProfile, currentChatKey
})
const currentChatHistory = (history, currentChatKey, number, size, noMore) => ({
    type: socketTypes.SOCKET_CURRENT_HISTORY, history, currentChatKey, number, size, noMore
})
export const saveCurrentKey = (currentChatKey) => ({
    type: socketTypes.SOCKET_SAVE_CURRENT_CHAT_KEY
})

export const DelCurrentKey = (currentChatKey) => ({
    type: socketTypes.SOCKET_DEL_CURRENT_CHAT_KEY, currentChatKey
})

export const registerSocket = (sessionListMap) => {
    return dispatch => {
        socketService.connection().then(socket => {
            socket.on('connect', () => {
                dispatch(socketConnection(socket, socket.id))
            });
            socket.on('message', (params) => {
                let key = `${params[0].to}-${params[0].from}`;
                socketService.saveMessageToLocal(key, params, null)
                dispatch(receivedMessage(params[0], key))
            });
            socket.on('disconnect', () => {
                dispatch(socketDisConnection())
            });
        })
    }
}
export const emitMessage = (socket, messageProfile) => {
    return dispatch => {
        socket.emit('message', [messageProfile])
        let key = `${messageProfile.from}-${messageProfile.to}`
        socketService.saveMessageToLocal(key, [messageProfile])
        dispatch(currentMessage(messageProfile, key))
    }
}

export const fetchCurrentHistory = (key, number, size) => {
    return dispatch => {
        socketService.restoreMessageFromLocal(key, number, size).then(res => {
            let noMore = size > res.length
            dispatch(currentChatHistory(res, key, number, size, noMore))
        })
    }
}






























