import request from '../config/request';
import API from '../config/api';

class contactService {
  constructor() {
    this.api = API;
  }

  fetchUsers = async () => {
    return request(this.api.users);
  };
}

export default new contactService();
