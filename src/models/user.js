"use strict";
import { Portal, Toast } from "@ant-design/react-native";
import { createAction, Storage } from "@utils";
import userService from "@services/user";
import navigatorService from "@services/navigator";

export default {
  namespace: "user",
  state: {
    user: {}
  },
  effects: {
    *login({ payload }, { call, put, select }) {
      const key = Toast.loading("登录中...");
      const user = yield call(userService.fetchUserLogin, payload);
      yield Storage.set("murray/user", user);
      yield put(createAction("save")({ user }));
      yield put(createAction("socket/open")({ token: user.accessToken }));
      Portal.remove(key);
      navigatorService.navigate("app");
    },
    *register({ payload }, { call, put, select }) {
      const key = Toast.loading("注册中...");
      yield call(userService.fetchUserRegister, payload);
      Portal.remove(key);
      Toast.info("注册成功", 1, () => {
        navigatorService.back();
      });
    },
    *modify({ payload }, { call, put, select }) {
      yield call(userService.fetchUserModify, payload);
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  subscriptions: {
    setup({ dispatch }) {
      // dispatch({ type: 'loadStorage' })
    }
  }
};
