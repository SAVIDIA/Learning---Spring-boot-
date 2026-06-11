package com.ems.controller;

import com.ems.dto.ApiResponse;
import com.ems.dto.DashboardStats;
import com.ems.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    /** GET /api/dashboard/admin — ADMIN, HR, MANAGER */
    @GetMapping("/admin")
    @PreAuthorize("hasAnyRole('ADMIN','HR','MANAGER')")
    public ResponseEntity<ApiResponse<DashboardStats>> adminDashboard() {
        DashboardStats stats = dashboardService.getAdminStats();
        return ResponseEntity.ok(ApiResponse.success("Dashboard data fetched", stats));
    }
}
