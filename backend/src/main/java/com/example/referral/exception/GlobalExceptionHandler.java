package com.example.referral.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleAll(Exception e) {
        Map<String, String> body = new HashMap<>();
        body.put("message", e.getMessage());
        body.put("type", e.getClass().getSimpleName());
        // For debugging production - print stack trace to logs too
        e.printStackTrace();
        return ResponseEntity.status(500).body(body);
    }
}
