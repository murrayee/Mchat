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
const currentMessage = (messageProfile) => ({
    type: socketTypes.SOCKET_EMIT_MESSAGE, messageProfile
})
const receivedMessage = (messageProfile) => ({
    type: socketTypes.SOCKET_ON_MESSAGE, messageProfile
})
const _getParamsKey = (params) => {

    return `form${params.form}-to${params.to}`
}

const _formatParamsToSession = (params, count = 1) => {

    let sessionItem = {
        // avatar: params.toInfo.avatar,
        name: params.toInfo.name,
        latestMessage: params.msg.content,
        unReadMessageCount: 0,
        timestamp: +(new Date()),
        key: _getParamsKey(params),
        // toInfo: params.toInfo
    }

    return sessionItem
}
const sessionList = () => ({})

export const registerSocket = (sessionListMap) => {
    return dispatch => {
        socketService.connection().then(socket => {
            socket.on('connect', () => {
                dispatch(socketConnection(socket, socket.id))
            });
            socket.on('message', (params) => {
                console.log(params)
                // let sessionItem = _formatParamsToSession(params[params.length - 1], params.length);
                // sessionListMap.set(String(sessionItem.key), sessionItem);
                // this._pushPayloadToMessageHistory(sessionItem.key, params);
                dispatch(receivedMessage(params[0]))
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
        dispatch(currentMessage(messageProfile))
    }
}






























