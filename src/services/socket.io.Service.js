import io from 'socket.io-client'
import {serverUrl} from '../config/api'
import {AsyncStorage} from 'react-native'

export const connection = async () => {
    return io(serverUrl.dev, {transports: ['websocket']});
}
export const saveMessageToLocal = async (key, params) => {
    let historyKey = `message:history:${key}`;
    let uuids = params.map((param) => param.uuid);
    let history = await  AsyncStorage.getItem(historyKey)
    await AsyncStorage.setItem(historyKey, `${history ? history + ',' : '' }${uuids.join(',')}`);
    params.forEach((param) => {
        AsyncStorage.setItem(`message:item:${param.uuid}`, JSON.stringify(param));
    });
}
export const restoreMessageFromLocal = async (key, number = 0, size) => {
    let history = await AsyncStorage.getItem(`message:history:${key}`), result = [];
    if (history) {
        let historyUUIDs = history.split(',').slice(-(size * (number + 1)), -(size * number) || undefined).map(uuid => `message:item:${uuid}`);
        let messageArray = await AsyncStorage.multiGet(historyUUIDs);
        result = messageArray.map((item) => JSON.parse(item[1]));
    }
    return result
}