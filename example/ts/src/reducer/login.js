/**
 * Created by bear on 2017/7/23.
 */


import  * as types from '../utils/constant';


const init = {
    userInfo: {},
    userData: {},
    loginStatus: false,
    inputValue: '',
    loading: false,
    disabled: false,
    loadingreg: false,
    disabledreg: false,
    regBtnTxt: "注册",
    loginBtnTxt: "登录",
    regStatus: "",
    regData: {},
}

const login = (state = init, action) => {

    switch (action.type) {
        case types.NAME_CHANGE:
            return {...state, inputValue: action.payload}
        case types.PWD_CHANGE:
            return {...state, inputValue: action.payload}
        case types.REQUEST_FETCH:
            return {...state, loading: true, disabled: true, loginBtnTxt: "登录中..."}
        case types.RECEIVE_FETCH:
            return {...state, userData: action.payload}
        case types.USER_LOGIN_OUT:
            return {...state, loginStatus: false, userData: {}}
        case types.FETCH_FAIL:
            return {...state, loginStatus: false, loading: false, disabled: false, loginBtnTxt: "登录"}
        case types.FETCH_SUCCESS:
            return {...state, loginStatus: true, loading: false, disabled: false, loginBtnTxt: "登录"}

        case types.FETCH_FAIL_REG:
            return {...state, regStatus: false, loadingreg: false, disabledreg: false, regBtnTxt: "注册"}
        case types.FETCH_SUCCESS_RGG:
            return {...state, regStatus: true, loadingreg: false, disabledreg: false, regBtnTxt: "注册",userInfo:action.payload}

        case types.REQUEST_FETCH_RGG:
            return {...state, regStatus: false, loadingreg: false, disabledreg: false, regBtnTxt: "注册中..."}
        case types.RECEIVE_FETCH_REG:
            return {...state, regData: action.payload}

        default:
            return state
    }
}

export  default  login