package com.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStats {

    private long                   totalEmployees;
    private long                   activeEmployees;
    private long                   totalDepartments;
    private double                 totalSalary;
    private List<Map<String, Object>> departmentWiseCount;
    private List<Map<String, Object>> recentJoiners;
}
