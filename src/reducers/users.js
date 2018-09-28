import { handleActions } from 'redux-actions';

import { getUsers } from '../actions';

const INITIAL_STATE = {
  users: []
};

const usersReducer = handleActions(
  {
    [getUsers.REQUEST]: state => ({
      ...state,
      isLoadingUsers: true
    }),
    [getUsers.FAILURE]: state => ({
      ...state,
      isLoadingUsers: false,
      errorGettingUsers: true
    }),
    [getUsers.SUCCESS]: (state = INITIAL_STATE, { payload: { users } }) => ({
      ...state,
      users
    })
  },
  INITIAL_STATE
);

export default usersReducer;