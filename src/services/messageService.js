/**
 * Created by bear on 2018/2/24.
 */
import axios from '../config/instance'
import {ctsApi} from '../config/api'
export const fetchMessageList = async () => {
    let data = Array.from(new Array(9)).map((_val, i) => ({
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
        text: `开会啦，明天下午一点钟在天府大道会展中心一栋三楼11-1-23`,
        title: `欧洲印象居委会闲聊群${i}`,
        key: `aopfsdfm13dqwepomsd13ni${i}`
    }));
    return new Promise(function (resolve, reject) {
        resolve(data)
    })
}