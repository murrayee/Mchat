import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './container/common/navigator'

import  store from './store/store'

class  App extends  Component{

    render(){
        return(
            <Provider store={store}>
            <AppNavigator/>
            </Provider>
        )
    }
}
export  default  App