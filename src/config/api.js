/**
 * 所有接口遵循resetful 接口定义
 * @type {{dev: string, pro: string}}
 */
export default {
  users: 'api/users',
  topics: 'api/topics',
  article: 'api/topics/<id>',
  authorize: 'api/users/authorize',
  register: 'api/users/register',
  modify: `api/users/<userId>/<field>`,
  profile: `api/users/profile/<userId>`,
};
