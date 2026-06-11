package com.ems.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    private Long      employeeId;
    private Long      userId;
    private String    employeeName;
    private String    email;
    private String    mobileNumber;
    private String    department;
    private String    designation;
    private Double    salary;
    private LocalDate dateOfJoining;
    private String    status;
}
