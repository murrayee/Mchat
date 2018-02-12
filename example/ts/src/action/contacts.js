/**
 * Created by bear on 2017/7/23.
 */
import {Alert} from 'react-native'
import  * as types from '../utils/constant';
import axios from '../utils/fetch'
import {ctsApi} from '../utils/api'



const requestCsList = () => ({
    type: types.REQUEST_CST_LIST

});


const receiveCsList= (data) => ({

    type: types.RECEIVE_CST_LIST,
    data

})



export const fetchCts = () => {
    "use strict";
    return dispatch => {
        dispatch(requestCsList())
        axios.post(ctsApi.cts)
            .then(res => {
                let data=res.data.data
                dispatch(receiveCsList(data))
            })
            .catch(error => {
                Alert.alert("请求不成功！")
            })

    }
}






