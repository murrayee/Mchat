import {combineReducers} from 'redux'

import login from './login'
import contacts from './contacts'
import nav from './nav'


const reducers = combineReducers({
    login,
    contacts,
    nav
});


export default reducers
