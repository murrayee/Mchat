import request from "../config/request";
import API from "../config/api";

export default {
  async fetchUsers() {
    return request(API.users);
  }
};
