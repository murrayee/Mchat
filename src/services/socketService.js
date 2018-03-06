/**
 * Created by bear on 2018/3/2.
 */
import io from 'socket.io-client'

const socket = io('http://127.0.0.1:9090', {
    transports: ['websocket'],
});
socket.on('connect', () => {
    console.log('connect!');
    socket.emit('chat', 'hello world!');
    socket.emit('disconnect','dasdasdasdasdas')
});

socket.on('res', msg => {
    console.log('res from server: %s!', msg);
});

