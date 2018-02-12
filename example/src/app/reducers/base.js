import { handleActions } from 'redux-actions';
import * as types from '../constants/actionTypes';

const initialState = {
  loading: true,
};

const handler = {};

handler[types.BASE_LOADING] = (state, action) => {
  const { loading } = action;
  return {
    ...state,
    loading,
  };
};

export default handleActions(handler, initialState);


// function createReducer (initialState, reducerMap) {
//     return (state = initialState, action) => {
//         const reducer = reducerMap[action.type]
//         return reducer ? reducer(state, action.payload, action.params) : state
//     }
// }