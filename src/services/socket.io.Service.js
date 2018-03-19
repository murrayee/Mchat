import io from 'socket.io-client'
import _ from 'lodash';
import {serverUrl} from '../config/api'
import {Toast} from 'antd-mobile'
import {
    Platform,
    AppState,
    AsyncStorage
} from 'react-native';

export const connection = () => {
    const socket = io(serverUrl.dev, {transports: ['websocket']});
    return socket;
}