package com.example.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data 
public class LoginRequest {
    @NotBlank(message = "phone number cannot be empty")
    private String phoneNumber;

    @NotBlank(message = "verify code cannot be empty")
    private String verificationCode;
}
