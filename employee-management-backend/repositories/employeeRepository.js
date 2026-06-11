const dbUtil = require("../utils/dbUtil");

exports.getAll = async () => {

  return await dbUtil.execute(
    `
    SELECT
      EMPLOYEE_ID,
      EMPLOYEE_NAME,
      EMAIL,
      MOBILE_NUMBER,
      DEPARTMENT,
      DESIGNATION,
      SALARY,
      TO_CHAR(DATE_OF_JOINING,'YYYY-MM-DD') DATE_OF_JOINING,
      STATUS
    FROM EMPLOYEE
    ORDER BY EMPLOYEE_ID
    `
  );

};

exports.getById = async (id) => {

  return await dbUtil.execute(
    `
    SELECT
      EMPLOYEE_ID,
      EMPLOYEE_NAME,
      EMAIL,
      MOBILE_NUMBER,
      DEPARTMENT,
      DESIGNATION,
      SALARY,
      TO_CHAR(DATE_OF_JOINING,'YYYY-MM-DD') DATE_OF_JOINING,
      STATUS
    FROM EMPLOYEE
    WHERE EMPLOYEE_ID = :id
    `,
    { id }
  );

};

exports.create = async (employee) => {

  return await dbUtil.execute(
    `
    INSERT INTO EMPLOYEE
    (
      EMPLOYEE_ID,
      EMPLOYEE_NAME,
      EMAIL,
      MOBILE_NUMBER,
      DEPARTMENT,
      DESIGNATION,
      SALARY,
      DATE_OF_JOINING,
      STATUS
    )
    VALUES
    (
      EMPLOYEE_SEQ.NEXTVAL,
      :employeeName,
      :email,
      :mobileNumber,
      :department,
      :designation,
      :salary,
      TO_DATE(:dateOfJoining,'YYYY-MM-DD'),
      :status
    )
    `,
    {
      employeeName: employee.employeeName,
      email: employee.email,
      mobileNumber: employee.mobileNumber,
      department: employee.department,
      designation: employee.designation,
      salary: employee.salary,
      dateOfJoining: employee.dateOfJoining,
      status: employee.status
    }
  );

};

exports.update = async (id, employee) => {

  return await dbUtil.execute(
    `
    UPDATE EMPLOYEE
    SET
      EMPLOYEE_NAME = :employeeName,
      EMAIL = :email,
      MOBILE_NUMBER = :mobileNumber,
      DEPARTMENT = :department,
      DESIGNATION = :designation,
      SALARY = :salary,
      DATE_OF_JOINING = TO_DATE(:dateOfJoining,'YYYY-MM-DD'),
      STATUS = :status
    WHERE EMPLOYEE_ID = :id
    `,
    {
      employeeName: employee.employeeName,
      email: employee.email,
      mobileNumber: employee.mobileNumber,
      department: employee.department,
      designation: employee.designation,
      salary: employee.salary,
      dateOfJoining: employee.dateOfJoining,
      status: employee.status,
      id: id
    }
  );

};

exports.delete = async (id) => {

  return await dbUtil.execute(
    `
    DELETE FROM EMPLOYEE
    WHERE EMPLOYEE_ID = :id
    `,
    { id }
  );

};

exports.searchByName = async (name) => {

  return await dbUtil.execute(
    `
    SELECT
      *
    FROM EMPLOYEE
    WHERE UPPER(EMPLOYEE_NAME)
    LIKE UPPER('%' || :name || '%')
    `,
    { name }
  );

};

exports.searchByDepartment = async (department) => {

  return await dbUtil.execute(
    `
    SELECT
      *
    FROM EMPLOYEE
    WHERE UPPER(DEPARTMENT)
    = UPPER(:department)
    `,
    { department }
  );

};

exports.getByUserId =
async (
    userId
) => {

    return await dbUtil.execute(
        `
        SELECT *
        FROM EMPLOYEE
        WHERE USER_ID=:userId
        `,
        { userId }
    );

};