package com.example.entity;

import jakarta.persistence.*;
import lombok.Data; // Lombok Data 
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Data 
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String serviceName;

    @Column(nullable = false)
    private String date;

    @Column(nullable = false)
    private String timeSlot;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    protected Appointment() {}
}
