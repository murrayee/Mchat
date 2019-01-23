import React from 'react';
import { Provider } from 'react-redux';
import { create } from 'dva-core';
import createLoading from 'dva-loading';
import createLogger from 'redux-logger';
import io from 'socket.io-client';
import { createSocketMiddleware } from './middlewares/socket';
import AppNavigator, { navigationReducer, navigationMiddleware } from './navigation/index';
import models from './models';
import HOST from './config/host';

const socketMiddleware = createSocketMiddleware(io(HOST.dev_url, {
  // socket ops参考文档 https://socket.io/docs/client-api/#with-extraheaders
  autoConnect: false,
}));

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
  onAction: [ createLogger, socketMiddleware,navigationMiddleware],
  onError(e) {
    console.log('onError', e);
  },
});
export default app.start(<AppNavigator/>);
