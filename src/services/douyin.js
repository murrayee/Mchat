import request from '../config/request';
import API from '../config/api';


class douyinService {
  constructor() {
    this.API = API;
    this.request = request;
  };

  fetchFeeds = async () => {
    return await this.request(this.API.douyin);
  };
}

export default new douyinService();
