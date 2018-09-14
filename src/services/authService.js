/**
 * Created by bear on 2018/3/2.
 */
import axios from '../config/instance'
import {
    Base64
} from '../utils/base64.min';
import qs from 'qs'
import appKey from '../utils/appKey';

import {
    authApi
} from '../config/api'
export const fetchUserLogin = async (params) => {
    const {
        client_id,
        client_secret
    } = appKey
    const sign = Base64.encode(`${client_id}:${client_secret}`)
    return await axios({
        'method': 'post',
        'url': authApi.authorize,
        'data': qs.stringify({ ...params,
            grant_type: appKey.grant_type
        }),
        'headers': {
            'Authorization': `Basic ${sign}`
        }
    })
}
export const fetchUserSingUp = async (params) => {
    console.log(params);
    return await axios.post(authApi.register, params)
}
export const fetchUserModify = async (params) => {
    const {userId, field } = params;
    let url = authApi.modify.replace('userId', userId).replace('field', field)

    return await axios.put(url, qs.stringify(params))
}
export const fetchUserProfile = async (params) => {
    const {
        userId
    } = params
    let url = authApi.profile.replace('userId', userId)
    return await axios.get(url, params)
}