package com.ems.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppUser {

    private Long          userId;
    private String        username;
    private String        password;
    private String        fullName;
    private String        email;
    private String        role;
    private String        status;
    private LocalDateTime createdDate;
}
