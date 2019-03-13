"use strict";

import { createAction } from "@utils";
import contactService from "@services/contact";

export default {
  namespace: "contact",
  state: {
    users: [],
    messages: []
  },
  effects: {
    *users({ payload }, { call, put, select }) {
      const result = yield call(contactService.fetchUsers);
      const users = result.data;
      yield put(createAction("save_users")({ users }));
    },
    *messages({ payload }, { call, put, select }) {
      const result = yield call(contactService.fetchMessages);
      const messages = result.data;
      yield put(createAction("save_messages")({ messages }));
    }
  },
  reducers: {
    ["save_users"](state, { payload }) {
      return { ...state, users: payload.users };
    },
    ["save_messages"](state, { payload }) {
      return { ...state, messages: payload.messages };
    }
  }
};
