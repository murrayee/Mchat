import {combineReducers} from 'redux'
import auth from './auth'
import contacts from './contacts'
import nav from './nav'
import message from './message'
import io from './socket'
import application from './application'
import dynamic from './dynamic'


const reducers = combineReducers({
    auth,
    contacts,
    nav,
    message,
    io,
    application,
    dynamic
});


export default reducers
