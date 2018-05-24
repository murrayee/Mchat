/**
 * Created by bear on 2018/3/8.
 */
import {socketTypes} from '../config/constant';
import * as socketService from '../services/socket.io.Service'

const socketConnection = (socket, socketId) => ({
    type: socketTypes.SOCKET_CONNECTION, socket, socketId
});
const socketDisConnection = () => ({
    type: socketTypes.SOCKET_DISCONNECTION,
});
const currentMessage = (messageProfile, currentChatKey) => ({
    type: socketTypes.SOCKET_EMIT_MESSAGE, messageProfile, currentChatKey
});
const receivedMessage = (messageProfile, currentChatKey) => ({
    type: socketTypes.SOCKET_ON_MESSAGE, messageProfile, currentChatKey
});
const currentChatHistory = (history, currentChatKey, number, size, noMore) => ({
    type: socketTypes.SOCKET_CURRENT_HISTORY, history, currentChatKey, number, size, noMore
});
const handleSession = () => ({
    type: socketTypes.SESSION_SAVE_TO_LOCAL,
});
const restoreSession = (sessionListMap) => ({
    type: socketTypes.SESSION_RESTORE, sessionListMap
})
export const registerSocket = (sessionListMap) => {
    return (dispatch,getState) => {
       // 其实这里可以直接通过getState()拿到sessionListMap。
        socketService.connection().then(socket => {
            socketService.restoreSessionFromLocal(sessionListMap).then(res => {
                dispatch(restoreSession(res))
            });
            socket.on('connect', () => {
                dispatch(socketConnection(socket, socket.id))
            });
            socket.on('message', (params) => {
                // to.user
                let key = `${params[0].to}-${params[0].from}`;
                sessionListMap.set(String(key), formatParamsToSessionItem(key, {...params[0],ext:params[0].fromProfile}))
                socketService.saveMessageToLocal(key, params, null);
                dispatch(receivedMessage(params[0], key))
            });
            socket.on('disconnect', () => {
                dispatch(socketDisConnection())
            });
        })
    }
}
export const emitMessage = (sessionListMap, socket, messageProfile) => {
    return dispatch => {
        //from.user
        socket.emit('message', [messageProfile])
        let key = `${messageProfile.from}-${messageProfile.to}`;
        sessionListMap.set(String(key), formatParamsToSessionItem(key, {...messageProfile,ext:messageProfile.toProfile}))
        socketService.saveMessageToLocal(key, [messageProfile])
        dispatch(currentMessage(messageProfile, key))
    }
};

export const fetchCurrentHistory = (key, number, size) => {
    return dispatch => {
        socketService.restoreMessageFromLocal(key, number, size).then(res => {
            let noMore = size > res.length
            dispatch(currentChatHistory(res, key, number, size, noMore))
        })
    }
};
export const saveSession = (sessionListMap) => {
    return dispatch => {
        socketService.saveSessionToLocal(sessionListMap)
        dispatch(handleSession())
    }
};

const formatParamsToSessionItem = (key, params) => {
    return {...params, unReadMessageCount: 0, timestamp: +(new Date()), key: key}
};





























