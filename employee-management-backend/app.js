const express =
    require("express");

const cors =
    require("cors");

const authRoutes =
    require("./routes/authRoutes");

const onboardingRoutes =
    require("./routes/onboardingRoutes");

const dashboardRoutes =
    require("./routes/dashboardRoutes");

const employeeRoutes =
    require("./routes/employeeRoutes");

const auditRoutes =
    require("./routes/auditRoutes");

const loggerMiddleware =
    require("./middleware/loggerMiddleware");

const errorHandler =
    require("./middleware/errorHandler");

const app =
    express();

/*
====================================
MIDDLEWARE
====================================
*/

app.use(cors());

app.use(express.json());

app.use(loggerMiddleware);

/*
====================================
AUTH ROUTES
====================================
*/

app.use(
    "/api/auth",
    authRoutes
);

/*
====================================
EMPLOYEE ROUTES
====================================
*/

app.use(
    "/api/employees",
    employeeRoutes
);

/*
====================================
ONBOARDING ROUTES
====================================
*/

app.use(
    "/api/onboarding",
    onboardingRoutes
);

/*
====================================
DASHBOARD ROUTES
====================================
*/

app.use(
    "/api/dashboard",
    dashboardRoutes
);

/*
====================================
AUDIT ROUTES
====================================
*/

app.use(
    "/api/audit",
    auditRoutes
);

/*
====================================
GLOBAL ERROR HANDLER
====================================
*/

app.use(errorHandler);

module.exports =
    app;