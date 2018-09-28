import { call, put, takeEvery } from 'redux-saga/effects';

import api from '../services/api';

import { getUsers } from '../actions';

export function* getUsersCall() {
  return yield call(api.getUsers);
}

export function* getUsersRequest() {
  try {
    const { data } = yield call(getUsersCall);
    yield put(
      getUsers.success({
        users: data
      })
    );
  } catch (error) {
    yield put(getUsers.failure(error.message));
  }
}

export default function* appUsersSaga() {
  yield takeEvery(getUsers.REQUEST, getUsersRequest);
}