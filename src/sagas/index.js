import { fork } from 'redux-saga/effects';

import usersSaga from './users';

function* rootSaga() {
  yield fork(usersSaga);
}

export default rootSaga;