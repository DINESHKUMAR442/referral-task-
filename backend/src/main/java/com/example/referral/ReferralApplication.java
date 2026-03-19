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
        
        // Load APP_ENV first
        String appEnv = dotenv.get("APP_ENV", "local");
        System.out.println("Current Environment (APP_ENV): " + appEnv);

        // Determine prefix based on environment
        String prefix = "production".equalsIgnoreCase(appEnv) ? "PROD_" : "LOCAL_";
        System.out.println("Using Database configuration from: " + (prefix.equals("PROD_") ? "Production (Railway)" : "Local"));

        // Set DB variables based on prefix
        setSystemProperty("DB_HOST", dotenv.get(prefix + "DB_HOST"));
        setSystemProperty("DB_PORT", dotenv.get(prefix + "DB_PORT"));
        setSystemProperty("DB_NAME", dotenv.get(prefix + "DB_NAME"));
        setSystemProperty("DB_USER", dotenv.get(prefix + "DB_USER"));
        setSystemProperty("DB_PASSWORD", dotenv.get(prefix + "DB_PASSWORD"));

        // Load other variables (like JWT_SECRET)
        dotenv.entries().forEach(entry -> {
            String key = entry.getKey();
            if (System.getProperty(key) == null && !key.startsWith("LOCAL_") && !key.startsWith("PROD_")) {
                System.setProperty(key, entry.getValue());
                System.out.println("Set shared property: " + key + " = " + (key.contains("SECRET") || key.contains("PASS") ? "***" : entry.getValue()));
            }
        });
        
        System.out.println("Connecting as User: " + System.getProperty("DB_USER"));
        System.out.println("Target Database URL: jdbc:mysql://" + System.getProperty("DB_HOST") + ":" + System.getProperty("DB_PORT") + "/" + System.getProperty("DB_NAME"));
        System.out.println("------------------------------------");
        
        SpringApplication.run(ReferralApplication.class, args);
    }

    private static void setSystemProperty(String key, String value) {
        if (value != null) {
            System.setProperty(key, value);
            System.out.println("Mapped " + key + " = " + (key.contains("PASS") ? "***" : value));
        }
    }

}
