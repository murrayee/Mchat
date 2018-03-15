import {combineReducers} from 'redux'
import auth from './auth'
import contacts from './contacts'
import nav from './nav'
import message from './message'
import io from './socket'
import application from './application'


const reducers = combineReducers({
    auth,
    contacts,
    nav,
    message,
    io,
    application
});


export default reducers
