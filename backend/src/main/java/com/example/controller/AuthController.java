package com.example.controller;

import com.example.dto.ApiResponse;
import com.example.dto.LoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    // fixed code for local test
    private static final String FIXED_CODE = "123456";


    @PostMapping("/login")
    public ResponseEntity<ApiResponse<String>> login(@Valid @RequestBody LoginRequest loginRequest) {
        if (getVerifyCode().equals(loginRequest.getVerificationCode())) {
            // in real env, should return a JWT Token
            return ResponseEntity.ok(new ApiResponse<>(true, "Succesful!", loginRequest.getPhoneNumber()));
        } else {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, "Failed"));
        }
    }

  // in real env, we get it from Redis or Kafka
   public String getVerifyCode() {
     return FIXED_CODE;
}
