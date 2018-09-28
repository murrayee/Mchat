import {combineReducers} from 'redux'

import nav from './nav'
import users from './users';
const reducers = combineReducers({
  nav,
  users
});


export default reducers
