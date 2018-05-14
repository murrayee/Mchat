/**
 * Created by bear on 2017/12/12.
 */
import React, {
    Component
} from 'react';
import {
    Provider
} from 'react-redux';
import {
    createStore,
    compose,
    applyMiddleware
} from 'redux';
import reducers from './reducers/index';
import thunk from 'redux-thunk';
import {
    createLogger
} from 'redux-logger';
import Navigation from './navigation/index'

import {
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import {createLoginMiddleware} from "./middleware";

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);
//创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。
let enhancer = compose(
    applyMiddleware(middleware,createLoginMiddleware, thunk, createLogger()),
);
const store = createStore(reducers, enhancer);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Navigation ref={el => this.rootNav = el}/>
            </Provider>
        )
    }
}

export default App