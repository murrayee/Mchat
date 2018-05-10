import axios from 'axios';
import {
    Alert
} from 'react-native'
import {
    AsyncStorage
} from 'react-native'
import {
    serverUrl
} from './api'
import NavigatorService from '../services/navigatorService';
const alert = Alert.alert
let url = serverUrl.dev
const instance = axios.create({
    baseURL: serverUrl.dev,
    timeout: 5000, //设置超时时间
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

// http request 拦截器
instance.interceptors.request.use(
    async config => {
        const accessToken = await AsyncStorage.getItem('mryAccessToken')
        if (accessToken && !config.url.includes('authorize')) {
            config.headers.Authorization = `Bearer ${JSON.parse(accessToken).rawData}`;
        }
        return config
    },
    err => {
        return Promise.reject(err);
    });
// http response 拦截器
instance.interceptors.response.use(
    response => {
        if (response.status && !response.data.success) {
            // alert(response.data.message)
        }
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    Alert.alert('提示',
                        '当前登录已过期！', [{
                                text: '取消',
                                style: 'cancel'
                            },
                            {
                                text: '前往登录',
                                onPress: () => NavigatorService.reset('login'),
                            },
                        ]
                    );
                    break;
            }
        }
        return Promise.reject(error.response) // 返回接口返回的错误信息
    });
export default instance;