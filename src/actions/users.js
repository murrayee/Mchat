import * as types from '../constants/type';

export const userLogin = (payload) => ({
  type: types.USER_LOGIN, payload,
});

export const userLoginRequest = (payload) => ({
  type: types.USER_LOGIN_REQUEST, payload,
});

export const userLoginReceive = (payload, data) => ({
  type: types.USER_LOGIN_RECEIVE, payload, data,
});


