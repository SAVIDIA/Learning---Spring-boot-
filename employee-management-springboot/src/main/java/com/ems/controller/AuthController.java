package com.ems.controller;

import com.ems.dto.ApiResponse;
import com.ems.dto.LoginRequest;
import com.ems.dto.LoginResponse;
import com.ems.dto.RegisterRequest;
import com.ems.model.AppUser;
import com.ems.security.AuthenticatedUser;
import com.ems.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;

    /** POST /api/auth/login  — public */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @Valid @RequestBody LoginRequest req) {

        log.info("Login attempt for user: {}", req.getUsername());
        try {
            LoginResponse response = authService.login(req);
            log.info("Login successful for user: {}", req.getUsername());
            return ResponseEntity.ok(ApiResponse.success("Login successful", response));
        } catch (Exception e) {
            log.error("Login error for user: {}: {}", req.getUsername(), e.getMessage(), e);
            throw e;
        }
    }

    /** POST /api/auth/register  — ADMIN only */
    @PostMapping("/register")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<AppUser>> register(
            @Valid @RequestBody RegisterRequest req) {

        AppUser created = authService.register(req);
        created.setPassword(null); // never return password
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("User registered successfully", created));
    }

    /** GET /api/auth/me  — any authenticated user */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<AppUser>> me(
            @AuthenticationPrincipal AuthenticatedUser principal) {

        AppUser user = authService.getMe(principal.getUserId());
        user.setPassword(null);
        return ResponseEntity.ok(ApiResponse.success("User details fetched", user));
    }
}
