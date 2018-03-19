import io from 'socket.io-client'
import {serverUrl} from '../config/api'
export const connection = async () => {
    const socket = io(serverUrl.dev, {transports: ['websocket']});
    return socket;
}