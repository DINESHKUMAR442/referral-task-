package com.example.referral.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@RestController
public class DebugController {

    @GetMapping("/api/debug/logs")
    public List<String> getLogs() {
        // This is a dummy for now since I can't easily capture the running process logs
        // But I can try to read from a file if the app is configured to log to one.
        List<String> mockLogs = new ArrayList<>();
        mockLogs.add("Debug endpoint reachable.");
        return mockLogs;
    }
}
