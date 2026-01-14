package com.example.service;

import com.example.entity.Appointment;
import com.example.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.exception.CustomException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.regex.Pattern;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private VerificationService verificationService;


    public String login(String phoneNumber, String verificationCode) {
        // 1.verify phone number
        if (!isValidPhoneNumber(phoneNumber)) {
            throw new CustomException("wrong phone number");
        }

        // 2. verify code
        if (!verificationService.verifyCode(phoneNumber, verificationCode)) {
            throw new CustomException("verfy code is unvalid!");
        }

        
        // return tokenService.generateToken(phoneNumber); 
        return "fake-token-generated-for-" + phoneNumber;
    }

    public Appointment createAppointment(String serviceName, String date, String timeSlot, String token) {
        
        long count = appointmentRepository.countByPhoneNumberAndDateAndTimeSlot(phoneNumber, date, timeSlot);
        if (count > 0) {
            throw new CustomException("duplicate time!, you have already have appointment during this time");
        }

        // 3. create and save
        Appointment appointment = new Appointment();
        appointment.setPhoneNumber(phoneNumber);
        appointment.setServiceName(serviceName);
        appointment.setDate(date);
        appointment.setTimeSlot(timeSlot);
        appointment.setCreatedAt(LocalDateTime.now());
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getMyAppointments(String token) {
        String phoneNumber = "extracted-phone-from-token"; // it's an example, in real env to get it from token

        return appointmentRepository.findByPhoneNumberOrderByCreatedAtDesc(phoneNumber);
    }

    private boolean isValidPhoneNumber(String phone) { 
        return Pattern.matches("^1\\d{10}$", phone); // simple to implement it
    }
}
