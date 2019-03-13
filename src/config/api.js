/**
 * 所有接口遵循resetful 接口定义
 * @type {{dev: string, pro: string}}
 */
const API = {
  users: "/api/users",
  messages: "/api/messages",
  topics: "/api/v1/topics",
  article: "/topics/<id>",
  login: "/api/users/login",
  register: "/api/users/register",
  modify: `/api/users/<userId>/<field>`,
  profile: `/api/users/profile/<userId>`,
  douyin: `/api/spider/dy/feed`
};

export default API;
