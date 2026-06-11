package com.ems.repository;

import com.ems.dto.OnboardingRequest;
import com.ems.model.Employee;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@RequiredArgsConstructor
public class OnboardingRepository {

    private final JdbcTemplate jdbc;

    private final RowMapper<Employee> employeeRowMapper = (rs, rowNum) -> {
        Employee e = new Employee();
        e.setEmployeeId(rs.getLong("EMPLOYEE_ID"));
        e.setUserId(rs.getObject("USER_ID") != null ? rs.getLong("USER_ID") : null);
        e.setEmployeeName(rs.getString("EMPLOYEE_NAME"));
        e.setEmail(rs.getString("EMAIL"));
        e.setMobileNumber(rs.getString("MOBILE_NUMBER"));
        e.setDepartment(rs.getString("DEPARTMENT"));
        e.setDesignation(rs.getString("DESIGNATION"));
        e.setSalary(rs.getObject("SALARY") != null ? rs.getDouble("SALARY") : null);
        e.setDateOfJoining(rs.getDate("DATE_OF_JOINING") != null
                ? rs.getDate("DATE_OF_JOINING").toLocalDate() : null);
        e.setStatus(rs.getString("STATUS"));
        return e;
    };

    @Transactional
    public Employee onboard(OnboardingRequest req, String hashedPassword) {

        /* 1. Insert into APP_USERS */
        String userSql = """
                INSERT INTO APP_USERS
                    (USER_ID, USERNAME, PASSWORD, FULL_NAME, EMAIL, ROLE, STATUS)
                VALUES
                    (APP_USERS_SEQ.NEXTVAL, ?, ?, ?, ?, ?, 'ACTIVE')
                """;

        jdbc.update(userSql,
                req.getUsername(),
                hashedPassword,
                req.getEmployeeName(),
                req.getEmail(),
                req.getRole()
        );

        /* 2. Retrieve the new USER_ID */
        Long userId = jdbc.queryForObject(
                "SELECT APP_USERS_SEQ.CURRVAL FROM DUAL", Long.class);

        /* 3. Insert into EMPLOYEE */
        String empSql = """
                INSERT INTO EMPLOYEE
                    (EMPLOYEE_ID, USER_ID, EMPLOYEE_NAME, EMAIL, MOBILE_NUMBER,
                     DEPARTMENT, DESIGNATION, SALARY, DATE_OF_JOINING, STATUS)
                VALUES
                    (EMPLOYEE_SEQ.NEXTVAL, ?, ?, ?, ?, ?, ?, ?, TO_DATE(?, 'YYYY-MM-DD'), ?)
                """;

        jdbc.update(empSql,
                userId,
                req.getEmployeeName(),
                req.getEmail(),
                req.getMobileNumber(),
                req.getDepartment(),
                req.getDesignation(),
                req.getSalary(),
                req.getDateOfJoining(),
                req.getStatus()
        );

        /* 4. Return newly created employee */
        Long empId = jdbc.queryForObject(
                "SELECT EMPLOYEE_SEQ.CURRVAL FROM DUAL", Long.class);

        return jdbc.query(
                "SELECT * FROM EMPLOYEE WHERE EMPLOYEE_ID = ?",
                employeeRowMapper, empId
        ).stream().findFirst().orElseThrow();
    }
}
