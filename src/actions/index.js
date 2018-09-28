import { createRoutine } from 'redux-saga-routines';

export const GET_USERS = 'GET_USERS';
export const getUsers = createRoutine(GET_USERS);