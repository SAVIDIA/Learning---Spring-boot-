# Employee Management System — Spring Boot

Spring Boot 3 migration of the Node.js/Express backend.  
Identical REST API contracts — drop-in replacement for the React frontend.

---

## Tech Stack

| Layer       | Technology                          |
|-------------|--------------------------------------|
| Framework   | Spring Boot 3.3 (Java 17)            |
| Security    | Spring Security 6 + JJWT 0.12       |
| Database    | Oracle 19c via Spring JDBC Template  |
| Validation  | Spring Validation (Jakarta)          |
| Utilities   | Lombok                               |
| Build       | Maven 3.9+                           |

---

## Prerequisites

- Java 17+
- Maven 3.9+
- Oracle DB reachable at `192.168.132.71:1521/orclpdb`

---

## Run

```bash
cd employee-management-springboot
mvn spring-boot:run
```

Server starts on **http://localhost:5000**

---

## Build JAR

```bash
mvn clean package -DskipTests
java -jar target/employee-management-1.0.0.jar
```

---

## API Reference (identical to Node.js backend)

### Auth
| Method | URL                   | Auth        | Description            |
|--------|-----------------------|-------------|------------------------|
| POST   | `/api/auth/login`     | public      | Login, returns JWT     |
| POST   | `/api/auth/register`  | ADMIN only  | Register new user      |
| GET    | `/api/auth/me`        | any         | Current user info      |

### Employees
| Method | URL                              | Roles               |
|--------|----------------------------------|---------------------|
| GET    | `/api/employees`                 | ADMIN, HR, MANAGER  |
| GET    | `/api/employees/me`              | any (own profile)   |
| GET    | `/api/employees/search?name=`    | ADMIN, HR, MANAGER  |
| GET    | `/api/employees/department/{d}`  | ADMIN, HR, MANAGER  |
| GET    | `/api/employees/{id}`            | ADMIN, HR, MANAGER  |
| POST   | `/api/employees`                 | ADMIN, HR           |
| PUT    | `/api/employees/{id}`            | ADMIN, HR           |
| DELETE | `/api/employees/{id}`            | ADMIN               |

### Dashboard
| Method | URL                   | Roles               |
|--------|-----------------------|---------------------|
| GET    | `/api/dashboard/admin`| ADMIN, HR, MANAGER  |

### Audit
| Method | URL         | Roles  |
|--------|-------------|--------|
| GET    | `/api/audit`| ADMIN  |

### Onboarding
| Method | URL               | Roles      |
|--------|-------------------|------------|
| POST   | `/api/onboarding` | ADMIN, HR  |

---

## JWT Token Payload

```json
{
  "userId": 1,
  "username": "admin",
  "role": "ADMIN",
  "iat": ...,
  "exp": ...
}
```

Token expiry: **8 hours** (28 800 000 ms)

---

## Project Structure

```
src/main/java/com/ems/
├── EmployeeManagementApplication.java
├── config/
│   ├── SecurityConfig.java
│   └── CorsConfig.java
├── security/
│   ├── JwtUtil.java
│   ├── JwtAuthFilter.java
│   └── AuthenticatedUser.java
├── model/          AppUser, Employee, AuditLog
├── dto/            ApiResponse, LoginRequest/Response, RegisterRequest,
│                   EmployeeRequest, OnboardingRequest, DashboardStats
├── repository/     AuthRepository, EmployeeRepository, DashboardRepository,
│                   AuditRepository, OnboardingRepository
├── service/        AuthService, EmployeeService, DashboardService,
│                   AuditService, OnboardingService
├── controller/     AuthController, EmployeeController, DashboardController,
│                   AuditController, OnboardingController
└── exception/      AppException, GlobalExceptionHandler
```
