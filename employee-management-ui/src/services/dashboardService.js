import api from "./api";

const toStatsFromEmployees = (employees = []) => {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(
        (emp) =>
            String(emp.status || "").toUpperCase() === "ACTIVE"
    ).length;
    const inactiveEmployees = totalEmployees - activeEmployees;
    const departmentsCount = new Set(
        employees
            .map((emp) => emp.department)
            .filter(Boolean)
    ).size;

    return {
        totalEmployees,
        activeEmployees,
        inactiveEmployees,
        departmentsCount
    };
};

export const getDashboardStats = async () => {
    try {
        const res = await api.get("/dashboard/admin");
        const data = res.data?.data || {};

        return {
            totalEmployees: Number(data.totalEmployees || 0),
            activeEmployees: Number(data.activeEmployees || 0),
            inactiveEmployees:
                Number(data.totalEmployees || 0) -
                Number(data.activeEmployees || 0),
            departmentsCount: Number(data.totalDepartments || 0)
        };
    } catch (error) {
        if ([403, 404].includes(error?.response?.status)) {
            const employeeRes = await api.get("/employees");
            const employees = employeeRes.data?.data || [];
            return toStatsFromEmployees(employees);
        }

        throw error;
    }
};