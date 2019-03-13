"use strict";

import { stringify } from "qs";
import request from "../config/request";
import API from "../config/api";

const CNODE_HOST = "https://cnodejs.org";

export default {
  async fetchTopics(payload) {
    return fetch(`${CNODE_HOST + API.topics}?${stringify(payload)}`).then(res =>
      res.json()
    );
  },
  async fetchFeeds() {
    return await request(API.douyin);
  }
};
