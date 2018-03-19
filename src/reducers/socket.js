/**
 * Created by bear on 2018/3/8.
 */
import {socketTypes} from '../config/constant';

const data = Array.from(new Array(20)).map((_val, i) => ({
    remark: i % 2 === 0 ? 'me' : '',
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: '李佳鑫',
    des: `我是消息${i}`,
    key: `1231233${i}`,

}));

const init = {
    socket: null,
    socketId: null,
    currentChatKey: null,
    sessionListMap: new Map(),
    sessionList: [],
    currentChatRoomHistory: [],
}
const io = (state = init, action) => {
    switch (action.type) {
        case socketTypes.SOCKET_CONNECTION:
            return {...state, socket: action.socket, socketId: action.socketId}
        case socketTypes.SOCKET_DISCONNECTION:
            return {...state}
        case socketTypes.SOCKET_EMIT_MESSAGE:
        case socketTypes.SOCKET_ON_MESSAGE:
            return {
                ...state,
                currentChatRoomHistory: [...state.currentChatRoomHistory].concat([action.messageProfile])
            }
        default:
            return state
    }
}
export default io