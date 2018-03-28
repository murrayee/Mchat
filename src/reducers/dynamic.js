/**
 * Created by bear on 2018/3/2.
 */
import { dynamicTypes } from '../config/constant';

const init = {
  size: 10,
  num: 0,
  topics: [],
  isFetching: false,
  refreshing: false,
  hasMore: true
};
const dynamic = (state = init, action) => {
  switch (action.type) {
    case dynamicTypes.REQUEST_TOPICS_LIST:
      return {
        ...state,
        isFetching: true,
        refreshing: action.status === 'onRefresh'
      };
    case dynamicTypes.RECEIVE_TOPICS_LIST:
      const status = action.status;
      let topics = [];
      if (status === 'onRefresh') {
        topics = action.data;
      } else {
        topics = state.topics.concat(action.data);
      }
      return {
        ...state,
        isFetching: false,
        size: action.size,
        num: action.num,
        topics: topics,
        refreshing: false,
        hasMore: action.num <= 8
      };
    default:
      return state;
  }
};
export default dynamic;
