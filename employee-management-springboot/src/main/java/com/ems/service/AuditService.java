package com.ems.service;

import com.ems.model.AuditLog;
import com.ems.repository.AuditRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditService {

    private final AuditRepository auditRepository;

    public List<AuditLog> getAuditLogs() {
        return auditRepository.getAuditLogs();
    }

    public void log(Long userId, String username, String action,
                    String entityName, String entityId, String description) {

        AuditLog log = new AuditLog();
        log.setUserId(userId);
        log.setUsername(username);
        log.setAction(action);
        log.setEntityName(entityName);
        log.setEntityId(entityId);
        log.setDescription(description);

        auditRepository.saveAudit(log);
    }
}
