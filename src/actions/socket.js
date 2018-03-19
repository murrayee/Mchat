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
export const registerSocket = () => {
    return dispatch => {
        const socket = socketService.connection()
        socket.on('connect', () => {
            dispatch(socketConnection(socket, socket.id))
        });
        socket.on('message', (params) => {
            console.log(params)
            Toast.info(params[0].msg.content)
        });
        socket.on('disconnect', () => {
            dispatch(socketDisConnection())
        });
    }
}

export const emitMessage = (socket, messageProfile) => {
    return dispatch => {
        socket.emit('message', [messageProfile])
        dispatch(currentMessage(messageProfile))
    }
}

