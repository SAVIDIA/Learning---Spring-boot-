package com.ems.repository;

import com.ems.model.AuditLog;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class AuditRepository {

    private final JdbcTemplate jdbc;

    private final RowMapper<AuditLog> auditRowMapper = (rs, rowNum) -> {
        AuditLog a = new AuditLog();
        a.setAuditId(rs.getLong("AUDIT_ID"));
        a.setUserId(rs.getObject("USER_ID") != null ? rs.getLong("USER_ID") : null);
        a.setUsername(rs.getString("USERNAME"));
        a.setAction(rs.getString("ACTION"));
        a.setEntityName(rs.getString("ENTITY_NAME"));
        a.setEntityId(rs.getString("ENTITY_ID"));
        a.setDescription(rs.getString("DESCRIPTION"));
        Timestamp ts = rs.getTimestamp("CREATED_DATE");
        if (ts != null) {
            a.setCreatedDate(ts.toLocalDateTime());
        }
        return a;
    };

    public void saveAudit(AuditLog log) {
        String sql = """
                INSERT INTO AUDIT_LOG
                    (AUDIT_ID, USER_ID, USERNAME, ACTION, ENTITY_NAME, ENTITY_ID, DESCRIPTION, CREATED_DATE)
                VALUES
                    (AUDIT_LOG_SEQ.NEXTVAL, ?, ?, ?, ?, ?, ?, SYSDATE)
                """;

        jdbc.update(sql,
                log.getUserId(),
                log.getUsername(),
                log.getAction(),
                log.getEntityName(),
                log.getEntityId(),
                log.getDescription()
        );
    }

    public List<AuditLog> getAuditLogs() {
        String sql = "SELECT * FROM AUDIT_LOG ORDER BY CREATED_DATE DESC";
        return jdbc.query(sql, auditRowMapper);
    }
}
