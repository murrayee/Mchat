/**
 * Created by bear on 2017/12/12.
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Navigation from './navigation/index'
import  store from './utils/store'

class  App extends  Component{
    render(){
        return(
            <Provider store={store}>
                <Navigation ref={el=>this.rootNav=el}/>
            </Provider>
        )
    }
}
export  default  App