import { createAction, Storage } from '../utils';
import socketService from '../services/socket';

export default {
  namespace: 'socket',
  state: {
    currentChatPage: {
      defaultNumber: 0,
      defaultSize: 8,
    },
    socket: null,
    currentChatKey: null,
    sessionListMap: new Map(),
    sessionList: [],
    currentChatRoomHistory: {},
  },
  effects: {
    * emit({ payload }, { call, put, select }) {
      const state = yield select();
      state.socket.socket.emit('message', { ...payload });
      yield call(socketService.emit, state.socket.socket, { ...payload });
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, socket: payload };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },
};
