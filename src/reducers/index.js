import {combineReducers} from 'redux'
import auth from './auth'
import contacts from './contacts'
import nav from './nav'
import message from './message'
import io from './socket'


const reducers = combineReducers({
    auth,
    contacts,
    nav,
    message,
    io
});


export default reducers
