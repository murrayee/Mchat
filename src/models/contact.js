import { createAction } from "../utils";

import getUsers from "../utils/users";

import contactService from "../services/contact";

export default {
  namespace: "contact",
  state: {
    users: []
  },
  effects: {
    *users({ payload }, { call, put, select }) {
      const result = yield call(contactService.fetchUsers);
      const users = result.data;
      // const users=Array.from(new Array(200)).map((_,i)=>{
      //   const username=getUsers();
      //   return ({
      //     '_id':i,
      //    "username" :username,
      //    "password" : '123456',
      //    "avatar" : "http://127.0.0.1:9090/public/avatar/201902261731101803.png",
      //    "vibration" : true,
      //    "onlineStatus" : "offline",
      //    "socketId" : "",
      //    "phone" : "",
      //    "firstLetter" : username.substring(0,1).toUpperCase(),
      //   })
      // })
      yield put(createAction("save")({ users }));
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, users: payload.users };
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // dispatch({ type: 'loadStorage' })
    }
  }
};
