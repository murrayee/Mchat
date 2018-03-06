/**
 * Created by bear on 2017/12/26.
 */

import { createStore, compose, applyMiddleware } from 'redux';
import reducers from '../reducers/index';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);
//创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。
let enhancer = compose(
    applyMiddleware(middleware,thunk, createLogger()),
);
const store = createStore(reducers, enhancer);

export default store;