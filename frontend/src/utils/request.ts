import Taro from '@tarojs/taro';

const BASE_URL = 'http://localhost:8989/api'; 

const request = (options) => {
  const { url, method, data, header = {} } = options;

  // get token from local if have
  let token = '';
  try {
    token = Taro.getStorageSync('auth_token');
  } catch (e) {
    console.warn('get local Token failed:', e);
  }

 
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}) // if have token
  };

  // merge header
  const mergedHeaders = { ...defaultHeaders, ...header };

  return new Promise((resolve, reject) => {
    Taro.request({
      url: `${BASE_URL}${url}`,
      method: method || 'GET',
      data: data,
      header: mergedHeaders,
      success: (res) => {
        const { statusCode, data: response } = res;

        if (statusCode >= 200 && statusCode < 300) {
         
          if (response.success) {
            resolve(response.data); 
          } else {
            // if failed, 
            Taro.showToast({
              title: response.message || 'failed',
              icon: 'none',
              duration: 2000
            });
            
            if(response.message.includes('login')) { // for example by login error
               // Taro.clearStorage(); // clear local token
               // Taro.navigateTo({ url: '/pages/login/index' }); // relink
            }
            reject(new Error(response.message || 'unknown error'));
          }
        } else {
          
          console.error(`API failed request: ${method} ${url}, Status: ${statusCode}`);
          let errorMessage = 'failed network request';
          if(statusCode === 401) {
             errorMessage = 'token is unvalid, please re-login';
             // Taro.clearStorage(); // clear token
             // Taro.navigateTo({ url: '/pages/login/index' }); // relink
          } else if(statusCode === 500) {
             errorMessage = 'inner error';
          }
          Taro.showToast({
            title: errorMessage,
            icon: 'none',
            duration: 2000
          });
          reject(new Error(errorMessage));
        }
      },
      fail: (err) => {
        console.error('failed network request:', err);
        Taro.showToast({
          title: 'failed network request: please check network.',
          icon: 'none',
          duration: 2000
        });
        reject(err);
      }
    });
  });
};

export default request;
