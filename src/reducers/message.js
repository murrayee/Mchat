/**
 * Created by bear on 2017/7/23.
 */
import {messageTypes} from '../config/constant';
const init = {
    msgList: []
}
const message = (state = init, action) => {
    switch (action.type) {
        case messageTypes.MSG_REQUEST_LIST:
            return {...state}
        case messageTypes.MSG_RECEIVE_LIST:
            return {...state, msgList: action.data}
        default:
            return state
    }
}
export  default  message