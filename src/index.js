import React from 'react';
import { Provider } from 'react-redux';
import { create } from 'dva-core';
import createLoading from 'dva-loading';
import createLogger from 'redux-logger';
import AppNavigator, { navigationReducer, navigationMiddleware } from './navigation/index';
import models from './models';

const dva = (options) => {
  const app = create(options);
  options.models.forEach(model => app.model(model));
  app.use(createLoading());
  app.start();
  const store = app._store;
  app.start = container => () => <Provider store={store}>{container}</Provider>;
  return app;
};
const app = dva({
  models: models,
  extraReducers: { router: navigationReducer },
  onAction: [navigationMiddleware, createLogger],
  onError(e) {
    console.log('onError', e);
  },
});
export default app.start(<AppNavigator/>);
