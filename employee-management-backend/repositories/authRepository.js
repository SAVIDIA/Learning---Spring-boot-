const dbUtil =
    require("../utils/dbUtil");

exports.findByUsername =
    async (username) => {

        const result =
            await dbUtil.execute(
                `
                SELECT
                    USER_ID,
                    USERNAME,
                    PASSWORD,
                    FULL_NAME,
                    EMAIL,
                    ROLE,
                    STATUS
                FROM APP_USERS
                WHERE USERNAME = :username
                `,
                { username }
            );

        return result.rows;
    };

exports.createUser =
    async (user) => {

        return await dbUtil.execute(
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

    };