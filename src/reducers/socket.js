/**
 * Created by bear on 2018/3/8.
 */
import {socketTypes} from '../config/constant';

const init = {
    socket: null,
    socketId: null,
    currentChatKey: null,
    sessionListMap: new Map(),
    currentChatRoomHistory: [],
    currentMessageProfile:null
}
const io = (state = init, action) => {
    switch (action.type) {
        case socketTypes.SOCKET_CONNECTION:
            return {...state, socket: action.socket, socketId: action.socketId}
        case socketTypes.SOCKET_DISCONNECTION:
            return {...state}
        case socketTypes.SOCKET_EMIT_MESSAGE:
            return {...state,currentMessageProfile:action.messageProfile}
        default:
            return state
    }
}
export default io