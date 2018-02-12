import axios from 'axios';
import {Modal} from 'antd-mobile'
const alert = Modal.alert
let url = 'http://localhost:3003'
axios.defaults.baseURL = url;
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';


// http request 拦截器
axios.interceptors.request.use(
    config => {

        return config;

    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {

        if (error.response) {
            switch (error.response.status) {

                case 401:
                // 返回 401 清除token信息并跳转到登录页面
            }
        }
        return Promise.reject(error.response)   // 返回接口返回的错误信息
    });


export default axios;

