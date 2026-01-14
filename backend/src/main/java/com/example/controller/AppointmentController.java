package com.example.controller;

import com.example.dto.ApiResponse;
import com.example.dto.CreateAppointmentRequest;
import com.example.entity.Appointment;
import com.example.service.AppointmentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.exception.CustomException; 

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private VerificationService verificationService;

    
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<String>> login(@RequestBody LoginRequest request) {
       
        String token = appointmentService.login(request.getPhoneNumber(), request.getVerificationCode());

        // if failed，Service will throw CustomException，catch by GlobalExceptionHandler 
        return ResponseEntity.ok(new ApiResponse<>(true, "Successful login!", token));
    }

    /**
     * create appointment (!!idempotency!!)
     */
    @PostMapping("/create")
    public ResponseEntity<ApiResponse<Appointment>> createAppointment(
            @RequestBody CreateAppointmentRequest request,
            @RequestHeader("Authorization") String token) {

        
        Appointment createdAppointment = appointmentService.createAppointment(
                request.getServiceName(),
                request.getDate(),
                request.getTimeSlot(),
                token
        );

        // if failed，Service will throw CustomException，catch by GlobalExceptionHandler 
        return ResponseEntity.ok(new ApiResponse<>(true, "Successfull create appointment", createdAppointment));
    }

    @GetMapping("/my-appointments")
    public ResponseEntity<ApiResponse<List<Appointment>>> getMyAppointments(@RequestHeader("Authorization") String token) {
        List<Appointment> appointments = appointmentService.getMyAppointments(token);
        return ResponseEntity.ok(new ApiResponse<>(true, "Successful get appointment list", appointments));
    }
}
