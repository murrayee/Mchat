/**
 * Created by bear on 2018/3/2.
 */
import axios from '../config/instance'
import {authApi} from '../config/api'
export const fetchUserLogin = async (params) => {
    return await  axios.post(authApi.authorize, params)
}
export const fetchUserSingUp = async (params) => {
    return await  axios.post(authApi.register, params)
}
export const fetchUserModify = async (params) => {
    const {userId, field, value} = params
    let url = authApi.modify.replace('userId', userId).replace('field', field)
    return await  axios.put(url, params)
}
export const fetchUserProfile = async (params) => {
    const {userId} = params
    let url = authApi.profile.replace('userId', userId)
    return await  axios.get(url, params)
}


