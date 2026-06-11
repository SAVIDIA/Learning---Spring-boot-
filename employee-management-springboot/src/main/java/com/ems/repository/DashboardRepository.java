package com.ems.repository;

import com.ems.dto.DashboardStats;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class DashboardRepository {

    private final JdbcTemplate jdbc;

    public long totalEmployees() {
        Long count = jdbc.queryForObject(
                "SELECT COUNT(*) FROM EMPLOYEE", Long.class);
        return count != null ? count : 0;
    }

    public long activeEmployees() {
        Long count = jdbc.queryForObject(
                "SELECT COUNT(*) FROM EMPLOYEE WHERE STATUS = 'ACTIVE'", Long.class);
        return count != null ? count : 0;
    }

    public long totalDepartments() {
        Long count = jdbc.queryForObject(
                "SELECT COUNT(DISTINCT DEPARTMENT) FROM EMPLOYEE WHERE DEPARTMENT IS NOT NULL", Long.class);
        return count != null ? count : 0;
    }

    public double totalSalary() {
        Double sum = jdbc.queryForObject(
                "SELECT NVL(SUM(SALARY), 0) FROM EMPLOYEE", Double.class);
        return sum != null ? sum : 0.0;
    }

    public List<Map<String, Object>> departmentWiseCount() {
        String sql = """
                SELECT DEPARTMENT, COUNT(*) AS EMPLOYEE_COUNT
                FROM EMPLOYEE
                WHERE DEPARTMENT IS NOT NULL
                GROUP BY DEPARTMENT
                ORDER BY EMPLOYEE_COUNT DESC
                """;
        return jdbc.queryForList(sql);
    }

    public List<Map<String, Object>> recentJoiners() {
        String sql = """
                SELECT EMPLOYEE_NAME, DEPARTMENT, DESIGNATION, DATE_OF_JOINING
                FROM EMPLOYEE
                WHERE DATE_OF_JOINING IS NOT NULL
                ORDER BY DATE_OF_JOINING DESC
                FETCH FIRST 5 ROWS ONLY
                """;
        return jdbc.queryForList(sql);
    }

    public DashboardStats getStats() {
        return DashboardStats.builder()
                .totalEmployees(totalEmployees())
                .activeEmployees(activeEmployees())
                .totalDepartments(totalDepartments())
                .totalSalary(totalSalary())
                .departmentWiseCount(departmentWiseCount())
                .recentJoiners(recentJoiners())
                .build();
    }
}
