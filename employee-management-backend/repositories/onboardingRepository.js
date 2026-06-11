const oracledb =
    require("oracledb");

const db =
    require("../config/db");

exports.createEmployeeWithUser =
async (
    user,
    employee
) => {

    let connection;

    try {

        connection =
            await db.getConnection();

        await connection.execute(
            `
            INSERT INTO APP_USERS
            (
                USER_ID,
                USERNAME,
                PASSWORD,
                FULL_NAME,
                EMAIL,
                ROLE,
                STATUS
            )
            VALUES
            (
                APP_USERS_SEQ.NEXTVAL,
                :username,
                :password,
                :fullName,
                :email,
                :role,
                'ACTIVE'
            )
            `,
            user
        );

        const userResult =
            await connection.execute(
                `
                SELECT USER_ID
                FROM APP_USERS
                WHERE USERNAME=:username
                `,
                {
                    username:
                        user.username
                },
                {
                    outFormat:
                        oracledb.OUT_FORMAT_OBJECT
                }
            );

        const userId =
            userResult.rows[0]
                .USER_ID;

        await connection.execute(
            `
            INSERT INTO EMPLOYEE
            (
                EMPLOYEE_ID,
                USER_ID,
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
                :userId,
                :employeeName,
                :email,
                :mobileNumber,
                :department,
                :designation,
                :salary,
                TO_DATE(
                    :dateOfJoining,
                    'YYYY-MM-DD'
                ),
                :status
            )
            `,
            {
                userId,
                ...employee
            }
        );

        await connection.commit();

    }
    catch (error) {

        if (
            connection
        ) {

            await connection.rollback();

        }

        throw error;

    }
    finally {

        if (
            connection
        ) {

            await connection.close();

        }

    }

};