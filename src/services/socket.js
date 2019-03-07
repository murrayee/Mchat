import {Storage} from '../utils';


/**
 * 发送消息
 * @param socket
 * @param payload
 * @returns {Promise<void>}
 */
export const emit = async (socket, payload) => {
  socket.emit('message', {...payload});
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
  let history = await Storage.get(historyKey);
  await Storage.set(historyKey, `${history ? history + ',' : ''}${uuids.join(',')}`);
  params.forEach((param) => {
    Storage.set(`message:item:${param.uuid}`, param);
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
  let history = await Storage.get(`message:history:${key}`), result = [];
  if (history) {
    let historyUUIDs = history.split(',').slice(-(size * (number + 1)), -(size * number) || undefined).map(uuid => `message:item:${uuid}`);
    let messageArray = await Storage.multiGet(historyUUIDs);
    result = messageArray.map((item) => JSON.parse(item[1]));
  }
  return result;
};
/**
 * 存储会话列表
 * @param sessionListMap
 * @returns {Promise<void>}
 */
export const saveSessionToLocal = async (sessionListMap) => {
  Storage.set('session:list:map:keys', [...sessionListMap.keys()].join(','));
  for (let [key, value] of sessionListMap.entries()) {
    Storage.set(`session:list:${key}`, value);
  }

};
/**
 * 恢复会话列表
 * @param sessionListMap
 * @returns {Promise<*>}
 */
export const restoreSessionFromLocal = async (sessionListMap) => {
  let keys = await Storage.get('session:list:map:keys');
  if (keys) {
    let initArray = [];
    for (let key of keys.split(',')) {
      let value = (await Storage.get(`session:list:${key}`));
      initArray.push([key, value]);
    }
    return new Map(Array.from(sessionListMap).concat(initArray));
  }
  return sessionListMap;
};
export default {
  emit,
  restoreSessionFromLocal,
  saveSessionToLocal,
  restoreMessageFromLocal,
  saveMessageToLocal
}

