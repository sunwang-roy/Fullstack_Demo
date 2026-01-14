import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, ScrollView, ListItem } from '@tarojs/components';
import request from '../../utils/request';
import './index.scss';

const MyAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const fetchedAppointments = await request({
        url: '/appointments/my-appointments',
        method: 'GET'
      });

      setAppointments(fetchedAppointments);
      console.log('Successful get appointment list:', fetchedAppointments);
    } catch (error) {
      // error have handle in request.js
      // console.log('error:', error.message);
      setAppointments([]); // clear status
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="loading-container">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="my-appointments-container">
      <Text className="title">My appointment</Text>
      {appointments.length === 0 ? (
        <View className="empty-state">
          <Text>no record</Text>
        </View>
      ) : (
        <ScrollView scrollY className="appointment-list">
          {appointments.map((appointment) => (
            <View key={appointment.id} className="appointment-card">
              <Text className="service-name">{appointment.serviceName}</Text>
              <Text className="date-time">{appointment.date} - {appointment.timeSlot}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default MyAppointmentsPage;
