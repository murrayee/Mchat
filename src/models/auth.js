import { createAction, Storage } from '../utils';
import authService from '../services/auth';

export default {
  namespace: 'auth',
  state: {
    user: {},
  },
  effects: {
    * login({ payload }, { call, put, select }) {
      const user = yield call(authService.fetchUserLogin, payload);
      yield Storage.set('murray/user', user);
      yield put(createAction('save')({ user }));
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      // dispatch({ type: 'loadStorage' })
    },
  },
};
