package com.ems.controller;

import com.ems.dto.ApiResponse;
import com.ems.dto.EmployeeRequest;
import com.ems.model.Employee;
import com.ems.security.AuthenticatedUser;
import com.ems.service.AuditService;
import com.ems.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;
    private final AuditService    auditService;

    /** GET /api/employees — ADMIN, HR, MANAGER */
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','HR','MANAGER')")
    public ResponseEntity<ApiResponse<List<Employee>>> getAll() {
        return ResponseEntity.ok(
                ApiResponse.success("Employees fetched", employeeService.getAll()));
    }

    /** GET /api/employees/me — EMPLOYEE (own profile) */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<Employee>> myProfile(
            @AuthenticationPrincipal AuthenticatedUser principal) {

        Employee emp = employeeService.getByUserId(principal.getUserId());
        return ResponseEntity.ok(ApiResponse.success("Profile fetched", emp));
    }

    /** GET /api/employees/search?name= — ADMIN, HR, MANAGER */
    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN','HR','MANAGER')")
    public ResponseEntity<ApiResponse<List<Employee>>> search(
            @RequestParam(name = "name", defaultValue = "") String name) {

        return ResponseEntity.ok(
                ApiResponse.success("Search results", employeeService.searchByName(name)));
    }

    /** GET /api/employees/department/{dept} — ADMIN, HR, MANAGER */
    @GetMapping("/department/{dept}")
    @PreAuthorize("hasAnyRole('ADMIN','HR','MANAGER')")
    public ResponseEntity<ApiResponse<List<Employee>>> byDepartment(
            @PathVariable String dept) {

        return ResponseEntity.ok(
                ApiResponse.success("Department employees fetched",
                        employeeService.searchByDepartment(dept)));
    }

    /** GET /api/employees/{id} — ADMIN, HR, MANAGER */
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','HR','MANAGER')")
    public ResponseEntity<ApiResponse<Employee>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(
                ApiResponse.success("Employee fetched", employeeService.getById(id)));
    }

    /** POST /api/employees — ADMIN, HR */
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    public ResponseEntity<ApiResponse<Employee>> create(
            @Valid @RequestBody EmployeeRequest req,
            @AuthenticationPrincipal AuthenticatedUser principal) {

        Employee created = employeeService.create(req);

        auditService.log(
                principal.getUserId(), principal.getUsername(),
                "CREATE", "EMPLOYEE",
                String.valueOf(created.getEmployeeId()),
                "Employee created: " + created.getEmployeeName()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Employee created successfully", created));
    }

    /** PUT /api/employees/{id} — ADMIN, HR */
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    public ResponseEntity<ApiResponse<Employee>> update(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeRequest req,
            @AuthenticationPrincipal AuthenticatedUser principal) {

        Employee updated = employeeService.update(id, req);

        auditService.log(
                principal.getUserId(), principal.getUsername(),
                "UPDATE", "EMPLOYEE",
                String.valueOf(id),
                "Employee updated: " + updated.getEmployeeName()
        );

        return ResponseEntity.ok(ApiResponse.success("Employee updated successfully", updated));
    }

    /** DELETE /api/employees/{id} — ADMIN only */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(
            @PathVariable Long id,
            @AuthenticationPrincipal AuthenticatedUser principal) {

        employeeService.delete(id);

        auditService.log(
                principal.getUserId(), principal.getUsername(),
                "DELETE", "EMPLOYEE",
                String.valueOf(id),
                "Employee deleted with id: " + id
        );

        return ResponseEntity.ok(ApiResponse.success("Employee deleted successfully", null));
    }
}
