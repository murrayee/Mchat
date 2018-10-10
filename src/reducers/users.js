import { handleActions } from 'redux-actions';
import * as types from '../constants/type';

const state = {
  user: {},
};
const userReducer = handleActions(
  {
    [types.USER_LOGIN]: state => ({
      ...state,
    }),
    [types.USER_LOGIN_REQUEST]: state => ({
      ...state,
    }),
    [types.USER_LOGIN_RECEIVE]: (state, action) => ({
      ...state,
      user: action.data,
    }),
  },
  state,
);

export default userReducer;