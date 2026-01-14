import Taro from '@tarojs/taro';
import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // local test

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, 
});

// request interceptor
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // get phone number from local storage(Taro)
    const phoneNumber = Taro.getStorageSync('user_phone');
    if (phoneNumber) {
      // add phone number into header
      if (!config.headers) config.headers = {};
      config.headers['X-Phone'] = phoneNumber;
    }
    console.log('Requesting:', config);
    return config;
  },
  (error) => {
    console.error('Error request:', error);
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    console.log('Respone:', response);
    // todo: The response format can be uniformly processed here
    return response.data;
  },
  (error) => {
    console.error('Error:', error);
    // 可以在这里统一处理错误
    if (error.response?.status === 401) {
      // if failed, then go to login page
      Taro.showToast({ title: 'Please login', icon: 'none' });
      Taro.navigateTo({ url: '/pages/login/index' });
    }
    return Promise.reject(error);
  }
);

export default request;
