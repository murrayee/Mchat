/**
 * Created by bear on 2018/3/2.
 */
import  {authTypes} from '../config/constant';
import * as fetches from '../services/authService'
import {NavigationActions} from 'react-navigation';
const userResLogin = (data) => ({
    type: authTypes.USER_LOGIN, data
})

const userResSingUp = (data) => ({
    type: authTypes.USER_REG, data
})

export const userLogin = (params, navigation) => {
    return dispatch => {
        fetches.fetchUserLogin(params).then((res) => {
            if (res.data.success) {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'tabs'})],
                });
                navigation.dispatch(resetAction);
            }
            dispatch(userResLogin(res))
        })
            .catch(error => {
                console.error(error)
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
                console.error(error)
            })
    }
}




