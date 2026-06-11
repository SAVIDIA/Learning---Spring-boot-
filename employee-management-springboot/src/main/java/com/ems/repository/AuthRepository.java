package com.ems.repository;

import com.ems.model.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class AuthRepository {

    private final JdbcTemplate jdbc;

    private final RowMapper<AppUser> userRowMapper = (rs, rowNum) -> {
        AppUser u = new AppUser();
        u.setUserId(rs.getLong("USER_ID"));
        u.setUsername(rs.getString("USERNAME"));
        u.setPassword(rs.getString("PASSWORD"));
        u.setFullName(rs.getString("FULL_NAME"));
        u.setEmail(rs.getString("EMAIL"));
        u.setRole(rs.getString("ROLE"));
        u.setStatus(rs.getString("STATUS"));
        return u;
    };

    public Optional<AppUser> findByUsername(String username) {
        String sql = "SELECT * FROM APP_USERS WHERE USERNAME = ?";
        return jdbc.query(sql, userRowMapper, username)
                   .stream()
                   .findFirst();
    }

    public Optional<AppUser> findById(Long userId) {
        String sql = "SELECT * FROM APP_USERS WHERE USER_ID = ?";
        return jdbc.query(sql, userRowMapper, userId)
                   .stream()
                   .findFirst();
    }

    public AppUser createUser(AppUser user) {
        String sql = """
                INSERT INTO APP_USERS
                    (USER_ID, USERNAME, PASSWORD, FULL_NAME, EMAIL, ROLE, STATUS)
                VALUES
                    (APP_USERS_SEQ.NEXTVAL, ?, ?, ?, ?, ?, 'ACTIVE')
                """;

        jdbc.update(sql,
                user.getUsername(),
                user.getPassword(),
                user.getFullName(),
                user.getEmail(),
                user.getRole()
        );

        return findByUsername(user.getUsername())
                .orElseThrow(() -> new RuntimeException("User creation failed"));
    }

    public boolean existsByUsername(String username) {
        String sql = "SELECT COUNT(*) FROM APP_USERS WHERE USERNAME = ?";
        Integer count = jdbc.queryForObject(sql, Integer.class, username);
        return count != null && count > 0;
    }
}
