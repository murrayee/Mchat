import { createAction, Storage } from '../utils';
import sessionService from '../services/session';

export default {
  namespace: 'session',
  state: {
    sessions: [],
  },
  effects: {
    * fetch({ payload }, { call, put, select }) {
      const result = yield call(sessionService.fetchSessionList);
      console.log(result);
      yield put(createAction('save')({ result }));
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, sessions: payload.result };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
    },
  },
};
