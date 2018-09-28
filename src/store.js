import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { navigationMiddleware } from './navigation/index';
import reducers from './reducers';

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  let enhancer = compose(
    applyMiddleware(navigationMiddleware, sagaMiddleware, createLogger()),
  );
  return {
    ... createStore(reducers, enhancer),
    runSaga: sagaMiddleware.run,
  };
};