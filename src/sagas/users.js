import { take, put, call, fork, select } from 'redux-saga/effects';
import { fetchUserLogin } from '../services/users';
import * as actions from '../actions/users';

export function* userLogin() {
  try {
    const action = yield take(actions.userLogin);
    yield put(actions.userLoginRequest(action.payload));
    const { data } = yield call(fetchUserLogin, action.payload);
    yield put(actions.userLoginReceive(action.payload, data));
  } catch (error) {
  }
}

export default function* usersSaga() {
  yield fork(userLogin);
}