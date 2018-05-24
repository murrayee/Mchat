/**
 * Created by bear on 2018/3/2.
 */
import {
    authTypes
} from '../config/constant';
import * as fetches from '../services/authService'
import Storage from '../utils/asyncStorage'
import {
    AsyncStorage
} from 'react-native';

import {
    Toast
} from 'antd-mobile'
const userResLogin = (data) => ({
    type: authTypes.USER_LOGIN,
    data
})

const userResSingUp = (data) => ({
    type: authTypes.USER_REG,
    data
})
const modify = () => ({
    type: authTypes.USER_MODIFY
})
export const profile = (data) => ({
    type: authTypes.USER_PROFILE,
    data
})
export const userLogin = (params, navigation, socketId) => {
    Toast.loading('正在登录...')
    return dispatch => {
        fetches.fetchUserLogin({ ...params
            }).then((res) => {
            Toast.hide();
                if (res.data.success) {
                    const expires = new Date(res.data.refreshTokenExpiresAt).getTime() - new Date(res.data.accessTokenExpiresAt).getTime()
                    Storage.save({
                        key: 'murrayUserProfile',
                        data:{...res.data},
                        expires:expires
                    });
                    navigation.navigate('App');
                    dispatch(userResLogin(res.data.data));
                    dispatch(userModify({userId: res.data.data._id, field: 'socketId', value: socketId}))
                }
            })
            .catch(error => {
                Toast.hide();
                console.log(error)
            })
    }
}
export const userSingUp = (params, navigation) => {
    return dispatch => {
        fetches.fetchUserSingUp(params).then((res) => {
                if (res.data.success) {
                    navigation.goBack()
                    dispatch(userResSingUp(res.data.data))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const userModify = (params) => {
    return dispatch => {
        fetches.fetchUserModify(params).then((res) => {
                if (res.data.success) {
                    dispatch(modify());
                    dispatch(userProfile(params))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
};

export const userProfile = (params) => {
    return async dispatch => {
        let localProfile=await AsyncStorage.getItem('murrayUserProfile');
        fetches.fetchUserProfile(params).then((res) => {
                if (res.data.success) {
                if(localProfile){
                    Storage.save({
                        key: 'murrayUserProfile',
                        data:{
                            ...JSON.parse(localProfile).rawData,
                            data:res.data.data
                        },
                    });
                }
                    dispatch(profile(res.data.data))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}