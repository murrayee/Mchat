/**
 * Created by bear on 2017/7/23.
 */
import {
    AsyncStorage
} from 'react-native'
import {
    contactTypes
} from '../config/constant';
import * as fetchs from '../services/contactService'


import {
    contactIndexFilter
} from '../utils/filter'

const requestCsList = () => ({
    type: contactTypes.REQUEST_CST_LIST
});
const receiveCsList = (data) => ({
    type: contactTypes.RECEIVE_CST_LIST,
    data
})
export const recordSection = (section) => ({
    type: contactTypes.RECORD_SECTION,
    section
})
export const getCsList = () => {
    "use strict";
    return async dispatch => {
        dispatch(requestCsList());
        const contactsList = await  AsyncStorage.getItem('murrayContactsList');
         if(contactsList){
             dispatch(receiveCsList(contactIndexFilter(JSON.parse(contactsList).rawData)))
         }else {
             fetchs.fetchContactList().then((res) => {
                     let data = res.data.data;
                 AsyncStorage.setItem('murrayContactsList',JSON.stringify(data))
                     dispatch(receiveCsList(contactIndexFilter(data)))
                 })
                 .catch(error => {
                     console.log(error)
                 })
         }
    }
};