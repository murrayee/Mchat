/**
 * Created by bear on 2018/2/24.
 */
import axios from '../config/instance'
import {ctsApi} from '../config/api'
export const fetchContactList = async () => {
    return await  axios.get(ctsApi.cts)

}