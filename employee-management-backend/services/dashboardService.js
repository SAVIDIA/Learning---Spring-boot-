const repository =
require("../repositories/dashboardRepository");

exports.getAdminDashboard =
async () => {

    const totalEmployees =
        await repository.totalEmployees();

    const activeEmployees =
        await repository.activeEmployees();

    const totalDepartments =
        await repository.totalDepartments();

    const totalSalary =
        await repository.totalSalary();

    const departmentStats =
        await repository.departmentWiseCount();

    const recentJoiners =
        await repository.recentJoiners();

    return {

        totalEmployees:
            totalEmployees.rows[0].TOTAL,

        activeEmployees:
            activeEmployees.rows[0].TOTAL,

        totalDepartments:
            totalDepartments.rows[0].TOTAL,

        totalSalary:
            totalSalary.rows[0].TOTAL,

        departmentStats:
            departmentStats.rows,

        recentJoiners:
            recentJoiners.rows

    };

};