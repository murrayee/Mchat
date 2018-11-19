import { createAction, Storage } from '../utils';
import authService from '../services/auth';
import navigatorService from '../services/navigator';


export default {
  namespace: 'auth',
  state: {
    user: {},
  },
  effects: {
    * login({ payload }, { call, put, select }) {
      // notify login status (Toast or in page use loading status)
      const user = yield call(authService.fetchUserLogin, payload);
      yield Storage.set('murray/user', user);
      yield put(createAction('save')({ user }));
      yield put(createAction('socket/open')({ token: user.accessToken }));
      navigatorService.navigate('app');
    },
    * modify({ payload }, { call, put, select }) {
      yield call(authService.fetchUserModify, payload);
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
