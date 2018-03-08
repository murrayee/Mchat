/**
 * Created by bear on 2017/7/23.
 */
import  {contactTypes}from '../config/constant';


const init = {
    isFetching: false,
    data: [],
    section:''

}
const contacts = (state = init, action) => {
    switch (action.type) {
        case contactTypes.REQUEST_CST_LIST:
            return {...state,isFetching:true}

        case contactTypes.RECEIVE_CST_LIST:
            return {...state, data: action.data,isFetching:false}

        case contactTypes.RECORD_SECTION:
            return {...state, section: action.section}

        default:
            return state
    }
}

export  default  contacts