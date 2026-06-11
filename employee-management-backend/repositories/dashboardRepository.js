const dbUtil =
    require("../utils/dbUtil");

exports.totalEmployees =
async () => {

    return await dbUtil.execute(
        `
        SELECT COUNT(*) TOTAL
        FROM EMPLOYEE
        `
    );

};

exports.activeEmployees =
async () => {

    return await dbUtil.execute(
        `
        SELECT COUNT(*) TOTAL
        FROM EMPLOYEE
        WHERE STATUS='ACTIVE'
        `
    );

};

exports.totalDepartments =
async () => {

    return await dbUtil.execute(
        `
        SELECT COUNT(DISTINCT DEPARTMENT)
        TOTAL
        FROM EMPLOYEE
        `
    );

};

exports.totalSalary =
async () => {

    return await dbUtil.execute(
        `
        SELECT NVL(SUM(SALARY),0)
        TOTAL
        FROM EMPLOYEE
        `
    );

};

exports.departmentWiseCount =
async () => {

    return await dbUtil.execute(
        `
        SELECT
            DEPARTMENT,
            COUNT(*) EMPLOYEE_COUNT
        FROM EMPLOYEE
        GROUP BY DEPARTMENT
        ORDER BY DEPARTMENT
        `
    );

};

exports.recentJoiners =
async () => {

    return await dbUtil.execute(
        `
        SELECT *
        FROM EMPLOYEE
        ORDER BY DATE_OF_JOINING DESC
        FETCH FIRST 5 ROWS ONLY
        `
    );

};