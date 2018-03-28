/**
 * Created by bear on 2017/7/23.
 */
import {dynamicTypes} from '../config/constant';
import * as fetches from '../services/dynamicService'

const requestTopicsList = (status) => ({
    type: dynamicTypes.REQUEST_TOPICS_LIST,status
})

const receiveTopicsList = (data, size, num,status) => ({
    type: dynamicTypes.RECEIVE_TOPICS_LIST, data, size, num,status
})
export const getTopicsList = (size, num, status) => {
    return dispatch => {
        dispatch(requestTopicsList(status));
        fetches.fetchTopics({size, num}).then((res) => {
            dispatch(receiveTopicsList(res.data, size, num,status))
        })
            .catch(error => {
                console.error(error)
            })
    }
}

