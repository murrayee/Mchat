import axios from 'axios';

const GET_USERS_ENDPOINT = `https://jsonplaceholder.typicode.com/users`;

class API {
  constructor(api) {
    this.api = api;
  }

  getUsers = () => {
    return this.api.get(GET_USERS_ENDPOINT);
  };
}

export default new API(axios);