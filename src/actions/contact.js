/**
 * Created by bear on 2017/7/23.
 */

import  * as types from '../utils/constant';
import * as fetchs from '../services/contactService'
const requestCsList = () => ({
    type: types.REQUEST_CST_LIST
});
const receiveCsList = (data) => ({
    type: types.RECEIVE_CST_LIST,
    data
})
export const getCsList = () => {
    "use strict";
    return dispatch => {
        dispatch(requestCsList())
        fetchs.fetchContactList().then((res) => {
            let data = res.data.data
            dispatch(receiveCsList(data))
        })
            .catch(error => {
                console.error(error)
            })
    }
}






