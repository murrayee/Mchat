/**
 * Created by bear on 2018/3/2.
 */
import {applicationTypes} from '../config/constant';

const init = {
    gridList: [],

}
const application = (state = init, action) => {
    switch (action.type) {
        case applicationTypes.REQUEST_GRID_LIST:
            return {...state};
        case applicationTypes.RECEIVE_GRID_LIST:
            return {...state, gridList: action.data};
        default:
            return state
    }
}
export default application