/**
 * Created by bear on 2017/7/23.
 */
import {
    applicationTypes
} from '../config/constant';
import * as fetches from '../services/applicationService'

const requestGridList = () => ({
    type: applicationTypes.REQUEST_GRID_LIST
})

const receiveGridList = (data) => ({
    type: applicationTypes.RECEIVE_GRID_LIST,
    data
})
export const getGridList = () => {
    return dispatch => {
        dispatch(requestGridList())
        fetches.fetchGridList().then((res) => {
                dispatch(receiveGridList(res))
            })
            .catch(error => {
                console.log(error)
            })
    }
}