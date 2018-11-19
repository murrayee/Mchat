import request from '../config/request';
import { Base64 } from '../utils/base64.min';
import appKey from '../config/key';
import API from '../config/api';

class authService {
  constructor() {
    this.api = API;
  }

  fetchUserLogin = async (payload) => {
    const { client_id, client_secret } = appKey;
    const sign = Base64.encode(`${client_id}:${client_secret}`);
    return request(this.api.authorize, {
      method: 'POST',
      body: { ...payload, grant_type: appKey.grant_type },
      headers: {
        'Authorization': `Basic ${sign}`,
      },
    });
  };
  fetchUserModify = async (payload) => {
    const { userId, field } = payload;
    const url = this.api.modify.replace('<userId>', userId).replace('<field>', field);
    return request(url, { method: 'PUT', body: { ...payload } });
  };
}

export default new authService();
