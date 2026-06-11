package com.ems.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OnboardingRequest {

    /* APP_USERS fields */
    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "Full name is required")
    private String employeeName;

    @Email(message = "Valid email is required")
    @NotBlank(message = "Email is required")
    private String email;

    private String role = "EMPLOYEE";

    /* EMPLOYEE fields */
    private String mobileNumber;
    private String department;
    private String designation;
    private Double salary;
    private String dateOfJoining;
    private String status = "ACTIVE";
}
