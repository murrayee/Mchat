/**
 * Created by bear on 2018/3/8.
 */
import {socketTypes} from '../config/constant';

const init = {
    currentChatPage: {
        defaultNumber: 0,
        defaultSize: 8
    },
    socket: null,
    socketId: null,
    currentChatKey: null,
    sessionListMap: new Map(),
    sessionList: [],
    currentChatRoomHistory: {},
}
const io = (state = init, action) => {
    switch (action.type) {
        case socketTypes.SOCKET_CONNECTION:
            return {...state, socket: action.socket, socketId: action.socketId}
        case socketTypes.SOCKET_DISCONNECTION:
            return {...state}
        case socketTypes.SOCKET_EMIT_MESSAGE:
        case socketTypes.SOCKET_ON_MESSAGE:
            let current = state.currentChatRoomHistory[action.currentChatKey] || []
            return {
                ...state,
                currentChatRoomHistory: {
                    ...state.currentChatRoomHistory,
                    [action.currentChatKey]: [...current].concat([action.messageProfile])
                }
            };
        case socketTypes.SOCKET_CURRENT_HISTORY:
            let history = state.currentChatRoomHistory[action.currentChatKey] || []

            let currentHistory = action.number > 0 && (state.currentChatRoomHistory[action.currentChatKey] &&
                action.number !== state.currentChatPage[action.currentChatKey].number)
            && action.number !== state.currentChatPage.defaultNumber
                ? action.history.concat(...history) : action.history
            return {
                ...state,
                currentChatPage: {
                    ...state.currentChatPage,
                    [action.currentChatKey]: {number: action.number, noMore: action.noMore}
                },
                currentChatRoomHistory: {
                    ...state.currentChatRoomHistory,
                    [action.currentChatKey]: currentHistory
                }
            };
        case socketTypes.SESSION_RESTORE:
            return {...state, sessionListMap: action.sessionListMap}
        default:
            return state
    }
}
export default io