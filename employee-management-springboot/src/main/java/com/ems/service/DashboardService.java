package com.ems.service;

import com.ems.dto.DashboardStats;
import com.ems.repository.DashboardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final DashboardRepository dashboardRepository;

    public DashboardStats getAdminStats() {
        return dashboardRepository.getStats();
    }
}
