import { fork } from 'redux-saga/effects';
import usersSaga from './users';

export default function* rootSaga() {
  yield fork(usersSaga);
}
