/**
 * Created by bear on 2018/3/2.
 */
import {authTypes} from '../config/constant';
const init = {
    userProfile: {},
    singUpData: {}
}
const auth = (state = init, action) => {
    switch (action.type) {
        case authTypes.USER_LOGIN:
            return {...state, userProfile: action.data}
        case authTypes.USER_MODIFY:
            return {...state}
        case authTypes.USER_PROFILE:
            return {...state, userProfile: action.data}
        case authTypes.USER_REG:
            return {...state, singUpData: action.data}
        default:
            return state
    }
}
export  default auth