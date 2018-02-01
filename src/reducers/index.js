
import { combineReducers } from 'redux'

import login from './login'
import contacts from './contacts'


const reducers = combineReducers({login,contacts});


export default reducers
