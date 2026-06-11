import {
    Navigate
}
from "react-router-dom";

import {
    getRole,
    isLoggedIn
}
from "../utils/auth";

function ProtectedRoute({ children, allowedRoles = [] }) {

    if (!isLoggedIn()) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }

    if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(getRole())
    ) {

        const fallbackPath =
            getRole() === "EMPLOYEE"
                ? "/profile"
                : "/dashboard";

        return (
            <Navigate
                to={fallbackPath}
                replace
            />
        );

    }

    return children;

}

export default ProtectedRoute;