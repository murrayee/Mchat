"use strict";

import { createAction } from "@utils";
import dynamicService from "@services/dynamic";

export default {
  namespace: "dynamic",
  state: {
    tabs: {
      all: "全部",
      good: "精华",
      share: "分享",
      ask: "问答",
      job: "招聘"
    },
    topics: {}
  },
  effects: {
    *fetchTopics({ payload, type }, { call, put, select }) {
      const res = yield call(dynamicService.fetchTopics, payload);
      yield put(createAction("save_topics")({ ...payload, topics: res.data }));
    },
    *fetchMoreTopics({ payload, type }, { call, put, select }) {
      const res = yield call(dynamicService.fetchTopics, payload);
      yield put(createAction("save_topics")({ ...payload, topics: res.data }));
    }
  },
  reducers: {
    ["save_topics"](state, { payload }) {
      const { tab, limit, page, topics } = payload;
      return {
        ...state,
        topics: {
          ...state.topics,
          [tab]: {
            limit,
            page,
            data: page === 1 ? topics : state.topics[tab].data.concat(topics)
          }
        }
      };
    }
  }
};
