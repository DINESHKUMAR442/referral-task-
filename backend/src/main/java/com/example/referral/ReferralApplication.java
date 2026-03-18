package com.example.referral;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class ReferralApplication {
    public static void main(String[] args) {
        // Load environment variables from .env
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
        System.out.println("--- Environment Initialization ---");
        dotenv.entries().forEach(entry -> {
            if (System.getProperty(entry.getKey()) == null) {
                System.setProperty(entry.getKey(), entry.getValue());
                System.out.println("Set system property: " + entry.getKey() + " = " + (entry.getKey().contains("PASS") ? "***" : entry.getValue()));
            }
        });
        
        System.out.println("Connecting as User: " + System.getProperty("DB_USER"));
        System.out.println("Target Database URL: jdbc:mysql://" + System.getProperty("DB_HOST") + ":" + System.getProperty("DB_PORT") + "/" + System.getProperty("DB_NAME"));
        System.out.println("------------------------------------");
        
        SpringApplication.run(ReferralApplication.class, args);
    }
}
