/**
 * 所有接口遵循resetful 接口定义
 * @type {{dev: string, pro: string}}
 */
const API = {
  users: '/api/users',
  topics: '/api/topics',
  article: '/topics/<id>',
  authorize: 'http://127.0.0.1:9090/api/users/authorize',
  register: '/api/users/register',
  modify: `/api/users/<userId>/<field>`,
  profile: `/api/users/profile/<userId>`,
  douyin: `/api/spider/dy/feed`,
};

export default API;
