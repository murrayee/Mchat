import { createAction } from '../utils';

import contactService from '../services/contact';

export default {
  namespace: 'contact',
  state: {
    users: [],
  },
  effects: {
    * users({ payload }, { call, put, select }) {
      const result = yield call(contactService.fetchUsers);
      const users = result.data;
      yield put(createAction('save')({ users }));
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, users: payload.users };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // dispatch({ type: 'loadStorage' })
    },
  },
};
