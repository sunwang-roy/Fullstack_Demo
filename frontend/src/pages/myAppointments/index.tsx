import React, { useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Picker, Button, Text } from '@tarojs/components';
import request from '../../utils/request'; 
import './index.scss';



const CreateAppointmentPage = () => {
  const [serviceName, setServiceName] = useState('');
  const [dateIndex, setDateIndex] = useState(0);
  const [timeSlotIndex, setTimeSlotIndex] = useState(0);

  const dateOptions = getDateOptions();

  const handleSubmit = async () => {
    if (!serviceName) {
      Taro.showToast({ title: 'Service Name', icon: 'none' });
      return;
    }
    if (!dateOptions[dateIndex]) {
      Taro.showToast({ title: 'Date', icon: 'none' });
      return;
    }
    if (!timeSlotOptions[timeSlotIndex]?.value) {
      Taro.showToast({ title: 'Time', icon: 'none' });
      return;
    }

    try {
      // request create api
      const appointmentData = await request({
        url: '/appointments/create',
        method: 'POST',
        data: {
          serviceName: serviceOptions.find(opt => opt.value === serviceName)?.label || serviceName, 
          date: dateOptions[dateIndex],
          timeSlot: timeSlotOptions[timeSlotIndex].value
        }
      });

      
      Taro.showToast({ title: 'Successful', icon: 'success' });
      // clear input text
      // setServiceName('');
      // setDateIndex(0);
      // setTimeSlotIndex(0);
      setTimeout(() => {
          Taro.navigateTo({ url: '/pages/myAppointments/index' }); // relink
      }, 1500);

    } catch (error) {
      // handle error oin request.js  global processing
      // console.log('error:', error.message);
    }
  };

  return (
    <View className="create-container">
      <Text className="title">Create Appointment</Text>

      <View className="form-item">
        <Picker
          mode="selector"
          range={serviceOptions.map(opt => opt.label)} 
          onChange={(e) => {
            const index = e.detail.value;
            setServiceName(serviceOptions[index].value); 
          }}
          value={serviceOptions.findIndex(opt => opt.value === serviceName)}
        >
        </Picker>
      </View>

      <View className="form-item">
        <Text className="label">Choose Date:</Text>
        <Picker
          mode="selector"
          range={dateOptions}
          onChange={(e) => setDateIndex(e.detail.value)}
          value={dateIndex}
        >
          <View className="picker-view">
            {dateOptions[dateIndex] || 'Date'}
          </View>
        </Picker>
      </View>

      <View className="form-item">
        <Text className="label">Timer:</Text>
        <Picker
          mode="selector"
          range={timeSlotOptions.map(opt => opt.label)} 
          onChange={(e) => setTimeSlotIndex(e.detail.value)}
          value={timeSlotIndex}
        >
          <View className="picker-view">
            {timeSlotOptions[timeSlotIndex]?.label || 'Choose period'}
          </View>
        </Picker>
      </View>

      <Button type="primary" onClick={handleSubmit} className="submit-button">
        Submit
      </Button>
    </View>
  );
};

export default CreateAppointmentPage;
