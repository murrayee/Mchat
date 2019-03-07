import request from "../config/request";
import { Base64 } from "../utils/base64.min";
import appKey from "../config/key";
import API from "../config/api";

export default {
  async fetchUserLogin(payload) {
    const { client_id, client_secret } = appKey;
    const sign = Base64.encode(`${client_id}:${client_secret}`);
    return request(API.authorize, {
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
    return request(url, { method: "PUT", body: { ...payload } });
  }
};
