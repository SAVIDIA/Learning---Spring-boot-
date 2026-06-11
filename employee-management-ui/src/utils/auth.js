const TOKEN_KEY = "token";
const USERNAME_KEY = "username";
const ROLE_KEY = "role";

export const saveAuthData = (data) => {

    localStorage.setItem(
        TOKEN_KEY,
        data.token
    );

    localStorage.setItem(
        USERNAME_KEY,
        data.username
    );

    localStorage.setItem(
        ROLE_KEY,
        data.role
    );

};

export const getToken = () =>
    localStorage.getItem(TOKEN_KEY);

export const getUsername = () =>
    localStorage.getItem(USERNAME_KEY);

export const getRole = () =>
    localStorage.getItem(ROLE_KEY);

export const isLoggedIn = () => {

    const token =
        localStorage.getItem(TOKEN_KEY);

    return !!token;

};

export const clearAuthData = () => {

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(ROLE_KEY);

};

export const logout = clearAuthData;

export const isAdmin = () =>
    getRole() === "ADMIN";

export const isHR = () =>
    getRole() === "HR";

export const isManager = () =>
    getRole() === "MANAGER";

export const isEmployee = () =>
    getRole() === "EMPLOYEE";