
import { createStore, compose, applyMiddleware } from 'redux';
import reducers from '../reducer/index';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

//创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。
let enhancer = compose(
    applyMiddleware(thunk, createLogger()),
);
const store = createStore(reducers, enhancer);

export default store;