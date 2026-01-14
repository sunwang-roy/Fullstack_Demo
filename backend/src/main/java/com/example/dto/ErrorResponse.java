package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

// global error format
@Data
@AllArgsConstructor
public class ErrorResponse {
    private boolean success = false; // default is false
    private String message;
    private Object details; // optional
}
