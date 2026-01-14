import React, { useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Input, Button, Text } from '@tarojs/components';
import request from '../../utils/request';
import './index.scss';

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeButtonText, setCodeButtonText] = useState('get code');
  const [isCountingDown, setIsCountingDown] = useState(false);

  const handleSendCode = async () => {
    if (!phoneNumber) {
      Taro.showToast({ title: 'input phone number', icon: 'none' });
      return;
    }
    if (!/^1\d{10}$/.test(phoneNumber)) {
      Taro.showToast({ title: 'wrong phone number format', icon: 'none' });
      return;
    }

    if (isCountingDown) return; 

    try {
      await request({
        url: '/verify/send',
        method: 'POST',
        data: { phoneNumber }
      });
      Taro.showToast({ title: 'Code send successful', icon: 'success' });

      // timer
      let countdown = 60;
      setIsCountingDown(true);
      const timer = setInterval(() => {
        setCodeButtonText(`${countdown} seconds`);
        countdown--;
        if (countdown < 0) {
          clearInterval(timer);
          setIsCountingDown(false);
          setCodeButtonText('get verify code');
        }
      }, 1000);

    } catch (error) {
      // error have been handle on request.js
      console.log('error:', error.message);
    }
  };

  const handleLogin = async () => {
    if (!phoneNumber) {
      Taro.showToast({ title: 'input phone number', icon: 'none' });
      return;
    }
    if (!verificationCode) {
      Taro.showToast({ title: 'input verify code', icon: 'none' });
      return;
    }

    try {
      const token = await request({
        url: '/appointments/login',
        method: 'POST',
        data: { phoneNumber, verificationCode }
      });

      // successful
      Taro.setStorageSync('auth_token', token); // store Token
      Taro.showToast({ title: 'Successful login', icon: 'success' });
      
      setTimeout(() => {
        Taro.switchTab({ url: '/pages/create/index' }); // relink
      }, 1500);

    } catch (error) {
      // error have been handle on request.js 
      console.log('error:', error.message);
    }
  };

  return (
    <View className="login-container">
      <Text className="title">Login</Text>
      <Input
        type="number"
        placeholder="input phone number"
        value={phoneNumber}
        onInput={(e) => setPhoneNumber(e.detail.value)}
        className="input-field"
      />
      <View className="input-row">
        <Input
          type="text"
          placeholder="input verfy code"
          value={verificationCode}
          onInput={(e) => setVerificationCode(e.detail.value)}
          className="input-field input-code"
        />
        <Button
          size="mini"
          type="primary"
          onClick={handleSendCode}
          disabled={isCountingDown}
          className={`code-button ${isCountingDown ? 'disabled' : ''}`}
        >
          {codeButtonText}
        </Button>
      </View>
      <Button type="primary" onClick={handleLogin} className="login-button">
        Login
      </Button>
    </View>
  );
};

export default LoginPage;
