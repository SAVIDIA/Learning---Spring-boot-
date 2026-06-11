package com.ems.repository;

import com.ems.model.Employee;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class EmployeeRepository {

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

    public List<Employee> getAll() {
        String sql = "SELECT * FROM EMPLOYEE ORDER BY EMPLOYEE_ID DESC";
        return jdbc.query(sql, employeeRowMapper);
    }

    public Optional<Employee> getById(Long id) {
        String sql = "SELECT * FROM EMPLOYEE WHERE EMPLOYEE_ID = ?";
        return jdbc.query(sql, employeeRowMapper, id).stream().findFirst();
    }

    public Optional<Employee> getByUserId(Long userId) {
        String sql = "SELECT * FROM EMPLOYEE WHERE USER_ID = ?";
        return jdbc.query(sql, employeeRowMapper, userId).stream().findFirst();
    }

    public Employee create(Employee emp) {
        String sql = """
                INSERT INTO EMPLOYEE
                    (EMPLOYEE_ID, USER_ID, EMPLOYEE_NAME, EMAIL, MOBILE_NUMBER,
                     DEPARTMENT, DESIGNATION, SALARY, DATE_OF_JOINING, STATUS)
                VALUES
                    (EMPLOYEE_SEQ.NEXTVAL, ?, ?, ?, ?, ?, ?, ?, TO_DATE(?, 'YYYY-MM-DD'), ?)
                """;

        jdbc.update(sql,
                emp.getUserId(),
                emp.getEmployeeName(),
                emp.getEmail(),
                emp.getMobileNumber(),
                emp.getDepartment(),
                emp.getDesignation(),
                emp.getSalary(),
                emp.getDateOfJoining() != null ? emp.getDateOfJoining().toString() : null,
                emp.getStatus()
        );

        String selectSql = "SELECT * FROM EMPLOYEE WHERE EMPLOYEE_NAME = ? ORDER BY EMPLOYEE_ID DESC FETCH FIRST 1 ROW ONLY";
        return jdbc.query(selectSql, employeeRowMapper, emp.getEmployeeName())
                   .stream()
                   .findFirst()
                   .orElseThrow(() -> new RuntimeException("Employee creation failed"));
    }

    public int update(Long id, Employee emp) {
        String sql = """
                UPDATE EMPLOYEE SET
                    EMPLOYEE_NAME  = ?,
                    EMAIL          = ?,
                    MOBILE_NUMBER  = ?,
                    DEPARTMENT     = ?,
                    DESIGNATION    = ?,
                    SALARY         = ?,
                    DATE_OF_JOINING = TO_DATE(?, 'YYYY-MM-DD'),
                    STATUS         = ?
                WHERE EMPLOYEE_ID  = ?
                """;

        return jdbc.update(sql,
                emp.getEmployeeName(),
                emp.getEmail(),
                emp.getMobileNumber(),
                emp.getDepartment(),
                emp.getDesignation(),
                emp.getSalary(),
                emp.getDateOfJoining() != null ? emp.getDateOfJoining().toString() : null,
                emp.getStatus(),
                id
        );
    }

    public int delete(Long id) {
        return jdbc.update("DELETE FROM EMPLOYEE WHERE EMPLOYEE_ID = ?", id);
    }

    public List<Employee> searchByName(String name) {
        String sql = "SELECT * FROM EMPLOYEE WHERE UPPER(EMPLOYEE_NAME) LIKE UPPER(?) ORDER BY EMPLOYEE_ID DESC";
        return jdbc.query(sql, employeeRowMapper, "%" + name + "%");
    }

    public List<Employee> searchByDepartment(String department) {
        String sql = "SELECT * FROM EMPLOYEE WHERE UPPER(DEPARTMENT) = UPPER(?) ORDER BY EMPLOYEE_ID DESC";
        return jdbc.query(sql, employeeRowMapper, department);
    }
}
