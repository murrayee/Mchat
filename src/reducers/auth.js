/**
 * Created by bear on 2018/3/2.
 */
import {authTypes} from '../config/constant';
const init = {
    authProfile: {},
    singUpData: {}
}
const auth = (state = init, action) => {
    switch (action.type) {

        case authTypes.USER_LOGIN:
            return {...state, authProfile: action.data}
        case authTypes.USER_REG:
            return {...state, singUpData: action.data}
        default:
            return state
    }
}
export  default auth