package com.ems.service;

import com.ems.dto.LoginRequest;
import com.ems.dto.LoginResponse;
import com.ems.dto.RegisterRequest;
import com.ems.exception.AppException;
import com.ems.model.AppUser;
import com.ems.repository.AuthRepository;
import com.ems.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final AuthRepository  authRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil         jwtUtil;

    public LoginResponse login(LoginRequest req) {
        log.debug("AuthService.login - username: {}", req.getUsername());
        
        AppUser user = authRepository.findByUsername(req.getUsername())
                .orElseThrow(() -> {
                    log.warn("User not found: {}", req.getUsername());
                    return new AppException("Invalid username or password", HttpStatus.UNAUTHORIZED);
                });

        log.debug("User found: {} with status: {}", user.getUsername(), user.getStatus());

        if (!"ACTIVE".equalsIgnoreCase(user.getStatus())) {
            log.warn("Account inactive for user: {}", user.getUsername());
            throw new AppException("Account is inactive", HttpStatus.UNAUTHORIZED);
        }

        log.debug("Comparing passwords...");
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            log.warn("Invalid password for user: {}", user.getUsername());
            throw new AppException("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }

        log.debug("Generating token for user: {} with role: {}", user.getUsername(), user.getRole());
        String token = jwtUtil.generateToken(user.getUserId(), user.getUsername(), user.getRole());
        return new LoginResponse(token, user.getUsername(), user.getRole());
    }

    public AppUser register(RegisterRequest req) {
        if (authRepository.existsByUsername(req.getUsername())) {
            throw new AppException("Username already exists", HttpStatus.CONFLICT);
        }

        String hashedPassword = passwordEncoder.encode(req.getPassword());

        AppUser user = new AppUser();
        user.setUsername(req.getUsername());
        user.setPassword(hashedPassword);
        user.setFullName(req.getFullName());
        user.setEmail(req.getEmail());
        user.setRole(req.getRole() != null ? req.getRole() : "EMPLOYEE");

        return authRepository.createUser(user);
    }

    public AppUser getMe(Long userId) {
        return authRepository.findById(userId)
                .orElseThrow(() ->
                        new AppException("User not found", HttpStatus.NOT_FOUND));
    }
}
