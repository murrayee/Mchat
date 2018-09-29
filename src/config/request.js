import axios from 'axios';
import { AsyncStorage } from 'react-native';

const host = 'http://127.0.0.0:9090';
const instance = axios.create({
  baseURL: host, timeout: 5000,
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

// http request 拦截器
instance.interceptors.request
  .use(async config => {
    const accessToken = await AsyncStorage.getItem('murrayUserProfile');
    if (accessToken && !config.url.includes('authorize')) {
      const token = JSON.parse(accessToken).rawData.accessToken;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, err => {
    return Promise.reject(err);
  });
// http response 拦截器
instance.interceptors.response
  .use(response => {
    if (response.status && !response.data.success) {
    }
    return response;
  }, error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          break;
      }
    }
    return Promise.reject(error.response);
  });
export default instance;