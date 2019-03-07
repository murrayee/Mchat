import request from '../config/request';
import API from '../config/api';

export default {

  async fetchFeeds() {
    return await request(API.douyin);
  }
}


