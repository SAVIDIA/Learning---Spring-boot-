package com.ems.controller;

import com.ems.dto.ApiResponse;
import com.ems.dto.OnboardingRequest;
import com.ems.model.Employee;
import com.ems.security.AuthenticatedUser;
import com.ems.service.AuditService;
import com.ems.service.OnboardingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/onboarding")
@RequiredArgsConstructor
public class OnboardingController {

    private final OnboardingService onboardingService;
    private final AuditService      auditService;

    /** POST /api/onboarding — ADMIN, HR */
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    public ResponseEntity<ApiResponse<Employee>> onboard(
            @Valid @RequestBody OnboardingRequest req,
            @AuthenticationPrincipal AuthenticatedUser principal) {

        Employee employee = onboardingService.onboard(req);

        auditService.log(
                principal.getUserId(), principal.getUsername(),
                "ONBOARD", "EMPLOYEE",
                String.valueOf(employee.getEmployeeId()),
                "Employee onboarded: " + employee.getEmployeeName()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Employee onboarded successfully", employee));
    }
}
