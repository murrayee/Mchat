/**
 * Created by bear on 2017/7/23.
 */
import {
    messageTypes
} from '../config/constant';
import * as fetches from '../services/messageService'

const msgRequestList = () => ({
    type: messageTypes.MSG_REQUEST_LIST
})

const msgReceiveList = (data) => ({
    type: messageTypes.MSG_RECEIVE_LIST,
    data
})
export const getMsgList = () => {
    return dispatch => {
        dispatch(msgRequestList())
        fetches.fetchMessageList().then((res) => {
                dispatch(msgReceiveList(res))
            })
            .catch(error => {
                console.log(error)
            })
    }
}