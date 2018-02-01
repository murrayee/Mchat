/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React ,{Component}from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppReducer from './src/navigation/reduxNavTest/reducers';
import AppWithNavigationState from './src/navigation/reduxNavTest/navigators/AppNavigator';

let  store = createStore(AppReducer);


class ReduxExampleApp extends Component {

    render() {
        return (
            <Provider store={store}>

                <AppWithNavigationState />

            </Provider>
        );
    }
}


export default ReduxExampleApp;
