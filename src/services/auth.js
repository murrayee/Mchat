import { stringify } from 'qs';
import request from '../config/request';
import { Base64 } from '../utils/base64.min';
import appKey from '../config/key';
import API from '../config/api';

export const fetchUserLogin = async (payload) => {
  const { client_id, client_secret } = appKey;
  const sign = Base64.encode(`${client_id}:${client_secret}`);
  return request(API.authorize, {
    method: 'post',
    body: stringify({ ...payload, grant_type: appKey.grant_type }),
    headers: {
      'Authorization': `Basic ${sign}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });
};
