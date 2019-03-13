"use strict";
import { createAction, Storage } from "../utils";
import socketService from "../services/socket";

export default {
  namespace: "socket",
  state: {
    number: 0,
    size: 8,
    socket: null,
    currentChatKey: null,
    sessionListMap: new Map(),
    chatRoomHistory: {}
  },
  effects: {
    *open({ payload }, { call, put, select }) {
      // console.log(payload);
    },
    *emit({ payload }, { call, put, select }) {
      const state = yield select();
      yield call(socketService.emit, state.socket.socket, { ...payload });
      const key = yield call(socketService.getChatKey, { ...payload });
      const formatParams = yield call(
        socketService.formatParamsToSessionItem,
        key,
        { ...payload }
      );
      yield put(
        createAction("save_session")({ params: formatParams, key: key })
      );
      yield put(createAction("save_chat")({ params: formatParams, key: key }));
      yield call(socketService.saveMessageToLocal, key, { ...payload });
    },
    *fetch_current_history({ payload }, { call, put, select }) {
      const { key, number, size } = payload;
      const history = yield call(
        socketService.restoreMessageFromLocal,
        key,
        number,
        size
      );
      // console.log(history);
      yield put(createAction("restore_history")({ ...payload, history }));
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, socket: payload };
    },
    save_session(state, { payload }) {
      const { key, params } = payload;
      return {
        ...state,
        sessionListMap: state.sessionListMap.set(key, { ...params })
      };
    },
    save_chat(state, { payload }) {
      const { key, params } = payload;
      const { chatRoomHistory, number, size } = state;
      let current = [];
      if (chatRoomHistory[key] && chatRoomHistory[key].data) {
        current = chatRoomHistory[key].data;
        current.push(params);
      }
      return {
        ...state,
        currentChatKey: key,
        chatRoomHistory: {
          ...chatRoomHistory,
          [key]: {
            number: number,
            size: size,
            data: current
          }
        }
      };
    },
    restore_session(state, { payload }) {
      return {
        ...state,
        sessionListMap: payload
      };
    },
    restore_history(state, { payload }) {
      const { key, number, size, history } = payload;
      const { chatRoomHistory } = state;
      let current = [];
      if (chatRoomHistory[key] && chatRoomHistory[key].data) {
        current = chatRoomHistory[key].data;
        history.concat([current]);
      }
      return {
        ...state,
        currentChatKey: key,
        chatRoomHistory: {
          ...chatRoomHistory,
          [key]: {
            number: number,
            size: size,
            data: history
          }
        }
      };
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {}
  }
};
