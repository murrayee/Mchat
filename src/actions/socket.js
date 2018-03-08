/**
 * Created by bear on 2018/3/8.
 */
import  {socketTypes} from '../config/constant';
import socketService from '../services/socketService'
const socketConnection = (socket) => ({

    type: socketTypes.SOCKET_CONNECTION, socket
})
const socketConnectionFail = () => ({
    type: socketTypes.SOCKET_CONNECTION_FAIL,
})

export const registerSocket = () => {
    return dispatch => {
        let socketServer = new socketService()
        if (socketServer.socket) {
            dispatch(socketConnection(socketServer))
        } else {
            dispatch(socketConnectionFail())
        }
    }
}

