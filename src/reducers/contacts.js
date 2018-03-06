/**
 * Created by bear on 2017/7/23.
 */
import  {contactTypes}from '../config/constant';


const init = {
    isFetching: false,
    data: []

}
const contacts = (state = init, action) => {
    switch (action.type) {
        case contactTypes.REQUEST_CST_LIST:
            return {...state,isFetching:true}
        case contactTypes.RECEIVE_CST_LIST:
            return {...state, data: action.data,isFetching:false}
        default:
            return state
    }
}

export  default  contacts