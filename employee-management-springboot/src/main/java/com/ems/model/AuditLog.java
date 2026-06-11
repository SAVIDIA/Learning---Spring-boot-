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
public class AuditLog {

    private Long          auditId;
    private Long          userId;
    private String        username;
    private String        action;
    private String        entityName;
    private String        entityId;
    private String        description;
    private LocalDateTime createdDate;
}

