import createSocket from 'dva-socket.io';
import { createAction } from '../utils';

export function dvaSocket(url, option) {
  return createSocket(
    url,
    option,
    {
      on: {
        connect: (data, dispatch, getState, socket) => {
          console.log('connect success', socket.id);
          dispatch(createAction('socket/save')(socket));
        },
        disconnection: (data, dispatch, getState) => {
          console.log('disconection', data);
        },
        enter_room: (data, dispatch, getState) => {
          console.log(data);
        },
        leave_room: (data, dispatch, getState) => {
          console.log(data);
        },
      },
      emit: {
        enter_chat_room: {
          evaluate: (action, dispatch, getState) => action.type === 'enter_chat_room',
          data: ({ payload }) => {
            return JSON.stringify(payload);
          },
          callback: (data, action, dispatch, getState) => {
            console.log('enter_chat_room callback', data);
            const { callback } = action || {};
            callback && callback(data);
          },
        },
        message: {
          evaluate: (action, dispatch, getState) => action.type === 'socket/emit',
          data: ({ payload }) => {
            return JSON.stringify(payload);
          },
          callback: (data, action, dispatch, getState) => {
            const { callback } = action || {};
            callback && callback(data);
          },
        },
      },
      asyncs: [
        {
          evaluate: (action, dispatch, getState) => action.type === 'socket/open',
          request: (action, dispatch, getState, socket) => {
            const { id, language, token } = action.payload;
            /* eslint no-param-reassign:0 */
            socket.io.opts.transportOptions = {
              polling: {
                extraHeaders: {
                  'TOKEN': token,
                },
              },
            };
            socket.open();
          },
        },
        {
          evaluate: (action, dispatch, getState) => action.type === 'socket/close',
          request: (action, dispatch, getState, socket) => {
            socket.close();
          },
        },
      ],
    },
  );
}
