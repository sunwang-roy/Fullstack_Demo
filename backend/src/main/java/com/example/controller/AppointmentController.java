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

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    /**
     * create appointment (!!idempotency!!)
     */
    @PostMapping
    public ResponseEntity<ApiResponse<Appointment>> createAppointment(
            @Valid @RequestBody CreateAppointmentRequest request,
            HttpServletRequest httpRequest) { 

        String phoneNumber = getPhoneNumberFromAuth(httpRequest); // get phone number from header
        if (phoneNumber == null) {
            return ResponseEntity.status(401).body(new ApiResponse<>(false, "unauthorized"));
        }

        try {
            Appointment createdAppointment = appointmentService.createOrGetExisting(phoneNumber, request.getServiceName(), request.getDate(), request.getTimeSlot());
            return ResponseEntity.ok(new ApiResponse<>(true, "Successful appointment!", createdAppointment));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, "Failed appointment: " + e.getMessage()));
        }
    }

    /**
     * get my appointment list
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<Appointment>>> getMyAppointments(HttpServletRequest httpRequest) {
        String phoneNumber = getPhoneNumberFromAuth(httpRequest);
        if (phoneNumber == null) {
            return ResponseEntity.status(401).body(new ApiResponse<>(false, "unauthorized"));
        }

        List<Appointment> appointments = appointmentService.findByPhoneNumber(phoneNumber);
        return ResponseEntity.ok(new ApiResponse<>(true, "Successful get appointment list", appointments));
    }

  
    private String getPhoneNumberFromAuth(HttpServletRequest request) {
        return request.getHeader("X-Phone"); // simple to get it(we can get it from token or sessionId)
    }
}
