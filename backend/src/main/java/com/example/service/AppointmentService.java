package com.example.service;

import com.example.entity.Appointment;
import com.example.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    /**
     * 
     * @param phoneNumber 
     * @param serviceName 
     * @param date 
     * @param timeSlot 
     * @return Appointment
     */
    public Appointment createOrGetExisting(String phoneNumber, String serviceName, String date, String timeSlot) {
        // 1. check same appointment
        Appointment existing = appointmentRepository.findByPhoneNumberAndDateAndTimeSlot(phoneNumber, date, timeSlot);

        if (existing != null) {
            // if exist
            //err.log("Find same appointment!");
            return existing;
        }

        // 2. create new
        Appointment newAppointment = new Appointment(phoneNumber, serviceName, date, timeSlot);
        return appointmentRepository.save(newAppointment); // save to db
    }

    /**
     * get Appointment list
     */
    public List<Appointment> findByPhoneNumber(String phoneNumber) {
        return appointmentRepository.findByPhoneNumber(phoneNumber);
    }
}
