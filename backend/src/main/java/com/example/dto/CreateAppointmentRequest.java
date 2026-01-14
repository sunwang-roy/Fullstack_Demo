package com.example.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data; 

@Data 
public class CreateAppointmentRequest {
    @NotBlank(message = "not empty")
    private String serviceName;

    @NotBlank(message = "not empty")
    private String date;

    @NotBlank(message = "not empty")
    private String timeSlot;
}
