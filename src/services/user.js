"use strict";

import request from "../config/request";
import { Base64 } from "../utils/base64.min";
import appKey from "../config/key";
import API from "../config/api";

export default {
  async fetchUserRegister(payload) {
    return request(API.register, { method: "POST", body: payload });
  },
  async fetchUserLogin(payload) {
    const { client_id, client_secret } = appKey;
    const sign = Base64.encode(`${client_id}:${client_secret}`);
    return request(API.login, {
      method: "POST",
      body: { ...payload, grant_type: appKey.grant_type },
      headers: {
        Authorization: `Basic ${sign}`
      }
    });
  },
  async fetchUserModify(payload) {
    const { userId, field } = payload;
    const url = API.modify
      .replace("<userId>", userId)
      .replace("<field>", field);
    return request(url, { method: "PUT", body: payload });
  }
};
