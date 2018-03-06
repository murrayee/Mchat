/**
 * Created by bear on 2017/12/12.
 */
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Navigation from './navigation/index'
import  store from './utils/store'
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

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Navigation ref={el => this.rootNav = el}/>
            </Provider>
        )
    }
}
export  default  App