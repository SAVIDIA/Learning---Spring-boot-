package com.ems.service;

import com.ems.dto.EmployeeRequest;
import com.ems.exception.AppException;
import com.ems.model.Employee;
import com.ems.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public List<Employee> getAll() {
        return employeeRepository.getAll();
    }

    public Employee getById(Long id) {
        return employeeRepository.getById(id)
                .orElseThrow(() -> new AppException("Employee not found", HttpStatus.NOT_FOUND));
    }

    public Employee getByUserId(Long userId) {
        return employeeRepository.getByUserId(userId)
                .orElseThrow(() -> new AppException("Employee profile not found", HttpStatus.NOT_FOUND));
    }

    public Employee create(EmployeeRequest req) {
        Employee emp = mapToEmployee(new Employee(), req);
        return employeeRepository.create(emp);
    }

    public Employee update(Long id, EmployeeRequest req) {
        employeeRepository.getById(id)
                .orElseThrow(() -> new AppException("Employee not found", HttpStatus.NOT_FOUND));

        Employee emp = mapToEmployee(new Employee(), req);
        employeeRepository.update(id, emp);
        return employeeRepository.getById(id).orElseThrow();
    }

    public void delete(Long id) {
        int rows = employeeRepository.delete(id);
        if (rows == 0) {
            throw new AppException("Employee not found", HttpStatus.NOT_FOUND);
        }
    }

    public List<Employee> searchByName(String name) {
        return employeeRepository.searchByName(name);
    }

    public List<Employee> searchByDepartment(String department) {
        return employeeRepository.searchByDepartment(department);
    }

    private Employee mapToEmployee(Employee emp, EmployeeRequest req) {
        emp.setEmployeeName(req.getEmployeeName());
        emp.setEmail(req.getEmail());
        emp.setMobileNumber(req.getMobileNumber());
        emp.setDepartment(req.getDepartment());
        emp.setDesignation(req.getDesignation());
        emp.setSalary(req.getSalary());
        if (req.getDateOfJoining() != null && !req.getDateOfJoining().isBlank()) {
            emp.setDateOfJoining(LocalDate.parse(req.getDateOfJoining()));
        }
        emp.setStatus(req.getStatus() != null ? req.getStatus() : "ACTIVE");
        return emp;
    }
}
