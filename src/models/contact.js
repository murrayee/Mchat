import { createAction, Storage } from '../utils';
import { usersGroup } from '../utils/filter';
import contactService from '../services/contact';

export default {
  namespace: 'contact',
  state: {
    users: [],
  },
  effects: {
    * users({ payload }, { call, put, select }) {
      const result = yield call(contactService.fetchUsers);
      const users = usersGroup(result.data || []);
      yield put(createAction('save')({ users }));
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, users: payload.users };
    },
  },
  subscriptions: {
    setup({ dispatch,history }) {
      // dispatch({ type: 'loadStorage' })
    },
  },
};
