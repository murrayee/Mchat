/**
 * Created by bear on 2018/3/8.
 */
import  {socketTypes} from '../config/constant';
import socketService from '../services/socketService'
const socketConnection = (socketService) => ({

    type: socketTypes.SOCKET_CONNECTION, socketService
})
const socketConnectionFail = () => ({
    type: socketTypes.SOCKET_CONNECTION_FAIL,
})

export const registerSocket = () => {
    return dispatch => {
        let io = new socketService()
        if (io.socket) {
            dispatch(socketConnection(io))
        } else {
            dispatch(socketConnectionFail())
        }
    }
}

