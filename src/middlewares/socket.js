import createSocket from 'dva-socket.io';

export function dvaSocket(url, option) {
  return createSocket(
    url,
    option,
    {
      on: {
        connect: (data, dispatch, getState, socket) => {
          console.log('connect success', socket.id);
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
            callback && callback(data); // 调用回调
          },
        },
      },
      asyncs: [
        {
          evaluate: (action, dispatch, getState) => action.type === 'SOCKET/OPEN',
          request: (action, dispatch, getState, socket) => {
            console.log('SOCKET/OPEN', socket);
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
          evaluate: (action, dispatch, getState) => action.type === 'SOCKET/CLOSE',
          request: (action, dispatch, getState, socket) => {
            console.log('SOCKET/CLOSE', socket);
            socket.close();
          },
        },
      ],
    },
  );
}
