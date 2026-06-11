import {
    BrowserRouter,
    Navigate,
    Route,
    Routes
} from "react-router-dom";

import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AddEmployee from "./pages/AddEmployee";
import AuditLogPage from "./pages/AuditLogPage";
import DashboardPage from "./pages/DashboardPage";
import EditEmployee from "./pages/EditEmployee";
import EmployeeList from "./pages/EmployeeList";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ViewEmployee from "./pages/ViewEmployee";
import { getRole, isLoggedIn } from "./utils/auth";

const getAuthenticatedHomePath = () =>
    getRole() === "EMPLOYEE" ? "/profile" : "/dashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        isLoggedIn() ? <Navigate to={getAuthenticatedHomePath()} replace /> : <LandingPage />
                    }
                />

                <Route
                    path="/login"
                    element={
                        isLoggedIn() ? <Navigate to={getAuthenticatedHomePath()} replace /> : <LoginPage />
                    }
                />

                <Route
                    element={
                        <ProtectedRoute>
                            <AppLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute
                                allowedRoles={["ADMIN", "HR", "MANAGER"]}
                            >
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/profile" element={<ProfilePage />} />

                    <Route
                        path="/register"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN"]}>
                                <RegisterPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/employees"
                        element={
                            <ProtectedRoute
                                allowedRoles={["ADMIN", "HR", "MANAGER"]}
                            >
                                <EmployeeList />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/employees/add"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN", "HR"]}>
                                <AddEmployee />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/employees/:id/edit"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN", "HR"]}>
                                <EditEmployee />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/employees/:id"
                        element={
                            <ProtectedRoute
                                allowedRoles={["ADMIN", "HR", "MANAGER"]}
                            >
                                <ViewEmployee />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/audit"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN"]}>
                                <AuditLogPage />
                            </ProtectedRoute>
                        }
                    />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;