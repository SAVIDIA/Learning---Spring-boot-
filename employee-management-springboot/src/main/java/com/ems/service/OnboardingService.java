package com.ems.service;

import com.ems.dto.OnboardingRequest;
import com.ems.exception.AppException;
import com.ems.model.Employee;
import com.ems.repository.AuthRepository;
import com.ems.repository.OnboardingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OnboardingService {

    private final OnboardingRepository onboardingRepository;
    private final AuthRepository       authRepository;
    private final PasswordEncoder      passwordEncoder;

    public Employee onboard(OnboardingRequest req) {
        if (authRepository.existsByUsername(req.getUsername())) {
            throw new AppException("Username already exists", HttpStatus.CONFLICT);
        }

        String hashedPassword = passwordEncoder.encode(req.getPassword());
        return onboardingRepository.onboard(req, hashedPassword);
    }
}
