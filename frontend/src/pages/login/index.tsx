import { useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Input, Button } from '@tarojs/components';
import request from '../../utils/request';

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [code, setCode] = useState<string>(''); // verify code input box

  const handleLogin = async () => {
    if (!phoneNumber || !code) {
      Taro.showToast({ title: 'please input phone number and code', icon: 'none' });
      return;
    }

    try {
      // backend api request
      const res = await request.post('/auth/login', { phoneNumber, verificationCode: code });
      
      if (res.success) {
        // login success
        Taro.setStorageSync('user_phone', res.data); 
        Taro.showToast({ title: 'Successful login!', icon: 'success' });
        
        // relink 
        setTimeout(() => {
          Taro.switchTab({ url: '/pages/create/index' }); // go to creating page
        }, 1000);
      } else {
        Taro.showToast({ title: res.message || 'Faild login!', icon: 'none' });
      }
    } catch (error: any) {
      console.error('Faild login:', error);
      Taro.showToast({ title: error.response?.data?.message || 'network error', icon: 'none' });
    }
  };

  return (
    <View className="page">
      <View className="input-group">
        <Input
          placeholder="please input your phone number"
          type="number"
          value={phoneNumber}
          onInput={(e) => setPhoneNumber(e.detail.value)}
        />
        <Input
          placeholder="please input your code"
          type="text"
          value={code}
          onInput={(e) => setCode(e.detail.value)}
        />
      </View>
      <Button onClick={handleLogin}>Login</Button>
    </View>
  );
};

export default LoginPage;
