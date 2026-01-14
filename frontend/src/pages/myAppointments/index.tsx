import { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';

interface Appointment {
  id: number;
  phoneNumber: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  createdAt: string;
}

const MyAppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      // get appointment list from backend
      const res = await Taro.request({
        url: 'http://localhost:8080/api/appointments',
        method: 'GET',
        header: {
          'X-Phone': Taro.getStorageSync('user_phone')
        }
      });

      const data = res.data as any;
      if (data.success) {
        setAppointments(data.data || []);
      } else {
        Taro.showToast({ title: data.message || 'Failed to get list', icon: 'none' });
      }
    } catch (error: any) {
      console.error('Failed to get list:', error);
      Taro.showToast({ title: error.errMsg || 'network error', icon: 'none' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <View className="page"><Text>Loading...</Text></View>;
  }

  return (
    <View className="page">
      <Text>My Appointments ({appointments.length})</Text>
      <ScrollView scrollY>
        {appointments.length > 0 ? (
          appointments.map((appt) => (
            <View key={appt.id} className="appointment-item">
              <Text>Service Name: {appt.serviceName}</Text>
              <Text>Date: {appt.date}</Text>
              <Text>Time: {appt.timeSlot}</Text>
              <Text>Created at: {new Date(appt.createdAt).toLocaleString()}</Text>
            </View>
          ))
        ) : (
          <Text>NO appointment</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default MyAppointmentsPage;
