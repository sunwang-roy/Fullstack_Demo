import { useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Input, Picker, Button } from '@tarojs/components';

const CreateAppointmentPage = () => {
  const [serviceName, setServiceName] = useState<string>('');
  const [date, setDate] = useState<string>(''); // choose date
  const [timeSlot, setTimeSlot] = useState<string>('09:00-10:00'); // default time period

  const timeSlots = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '14:00-15:00', '15:00-16:00'];

  const handleCreate = async () => {
    if (!serviceName || !date) {
      Taro.showToast({ title: 'please input all text!', icon: 'none' });
      return;
    }

    try {
      // backend api request
      const res = await Taro.request({
        url: 'http://localhost:8080/api/appointments',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'X-Phone': Taro.getStorageSync('user_phone') // put phone number in request header
        },
        data: {
          serviceName,
          date,
          timeSlot
        }
      });

      const data = res.data as any; 
      if (data.success) {
        Taro.showToast({ title: 'Successful created!', icon: 'success' });
        // switch to list page
        setTimeout(() => {
          Taro.navigateTo({ url: '/pages/myAppointments/index' });
        }, 1500);
      } else {
        Taro.showToast({ title: data.message || 'Failed appointment!', icon: 'none' });
      }
    } catch (error: any) {
      console.error('Failed appointment:', error);
      Taro.showToast({ title: error.errMsg || 'network error', icon: 'none' });
    }
  };

  return (
    <View className="page">
      <View className="input-group">
        <Input
          placeholder="Input Service Name"
          value={serviceName}
          onInput={(e) => setServiceName(e.detail.value)}
        />
        <Picker mode='date' onChange={(e) => setDate(e.detail.value)}>
          <View className="picker"> // choose date box
            Choose date: {date || 'Choose'}
          </View>
        </Picker>
        <Picker mode='selector' range={timeSlots} onChange={(e) => setTimeSlot(timeSlots[parseInt(e.detail.value)])}>
          <View className="picker"> // time peroid box
            Time Period: {timeSlot}
          </View>
        </Picker>
      </View>
      <Button onClick={handleCreate}>Submit</Button>
    </View>
  );
};

export default CreateAppointmentPage;
