package com.example.repository;

import com.example.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
    List<Appointment> findByPhoneNumber(String phoneNumber);

    // Key!! for idempotency
    Appointment findByPhoneNumberAndDateAndTimeSlot(String phoneNumber, String date, String timeSlot);
}
