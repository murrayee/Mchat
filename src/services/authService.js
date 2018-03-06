/**
 * Created by bear on 2018/3/2.
 */
import axios from '../config/instance'
import {authApi} from '../config/api'
export const fetchUserLogin = async (params) => {
    return  await  axios.post(authApi.authorize, params)
}
export const fetchUserSingUp = async (params) => {
    return await  axios.post(authApi.register, params)
}