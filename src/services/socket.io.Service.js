import io from 'socket.io-client'
import {serverUrl} from '../config/api'
import {AsyncStorage} from 'react-native'

/**
 * socket 初始化
 * @returns {Promise<*>}
 */
export const connection = async () => {
    return io(serverUrl.dev, {transports: ['websocket']});
};
/**
 * 存储消息队列
 * @param key
 * @param params
 * @returns {Promise<void>}
 */
export const saveMessageToLocal = async (key, params) => {
    let historyKey = `message:history:${key}`;
    let uuids = params.map((param) => param.uuid);
    let history = await  AsyncStorage.getItem(historyKey)
    await AsyncStorage.setItem(historyKey, `${history ? history + ',' : '' }${uuids.join(',')}`);
    params.forEach((param) => {
        AsyncStorage.setItem(`message:item:${param.uuid}`, JSON.stringify(param));
    });
};
/**
 * 恢复消息队列
 * @param key
 * @param number
 * @param size
 * @returns {Promise<Array>}
 */
export const restoreMessageFromLocal = async (key, number = 0, size) => {
    let history = await AsyncStorage.getItem(`message:history:${key}`), result = [];
    if (history) {
        let historyUUIDs = history.split(',').slice(-(size * (number + 1)), -(size * number) || undefined).map(uuid => `message:item:${uuid}`);
        let messageArray = await AsyncStorage.multiGet(historyUUIDs);
        result = messageArray.map((item) => JSON.parse(item[1]));
    }
    return result
};
/**
 * 存储会话列表
 * @param sessionListMap
 * @returns {Promise<void>}
 */
export const saveSessionToLocal = async (sessionListMap) => {
    AsyncStorage.setItem('session:list:map:keys', [...sessionListMap.keys()].join(','));
    for (let [key, value] of sessionListMap.entries()) {
        AsyncStorage.setItem(`session:list:${key}`, JSON.stringify(value));
    }

};
/**
 * 恢复会话列表
 * @param sessionListMap
 * @returns {Promise<*>}
 */
export const restoreSessionFromLocal = async (sessionListMap) => {
    let keys = await AsyncStorage.getItem('session:list:map:keys');
    if (keys) {
        let initArray = [];
        for (let key of keys.split(',')) {
            let value = JSON.parse((await AsyncStorage.getItem(`session:list:${key}`)));
            initArray.push([key, value]);
        }
        return new Map(Array.from(sessionListMap).concat(initArray))
    }
    return sessionListMap
};

