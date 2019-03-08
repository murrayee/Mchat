import { createAction } from "../utils";
import douyinService from "../services/douyin";

export default {
  namespace: "dynamic",
  state: {
    feeds: {}
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      const res = yield call(douyinService.fetchFeeds);
      yield put(createAction("save")({ feeds: res }));
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, feeds: payload.feeds };
    }
  }
};
