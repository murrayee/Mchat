import {combineReducers} from 'redux'
import auth from './auth'
import contacts from './contacts'
import nav from './nav'
import message from './message'


const reducers = combineReducers({
    auth,
    contacts,
    nav,
    message
});


export default reducers
