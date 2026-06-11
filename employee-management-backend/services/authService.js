const repository =
    require("../repositories/authRepository");

const passwordUtil =
    require("../utils/passwordUtil");

const jwtUtil =
    require("../utils/jwtUtil");

const auditService =
    require("./auditService");

exports.login =
    async (
        username,
        password
    ) => {

        const users =
            await repository.findByUsername(
                username
            );

        if (
            !users ||
            users.length === 0
        ) {

            throw new Error(
                "Invalid Username"
            );

        }

        const user =
            users[0];

        const valid =
            await passwordUtil.comparePassword(
                password,
                user.PASSWORD
            );

        if (!valid) {

            throw new Error(
                "Invalid Password"
            );

        }

        // Audit Login
        await auditService.log(

            {
                userId:
                    user.USER_ID,

                username:
                    user.USERNAME
            },

            "LOGIN",

            "APP_USERS",

            user.USER_ID,

            "User Logged In"

        );

        return {

            token:
                jwtUtil.generateToken(
                    user
                ),

            username:
                user.USERNAME,

            role:
                user.ROLE

        };

    };

exports.register =
    async (user) => {

        const existing =
            await repository.findByUsername(
                user.username
            );

        if (
            existing &&
            existing.length > 0
        ) {

            throw new Error(
                "Username already exists"
            );

        }

        const hash =
            await passwordUtil.hashPassword(
                user.password
            );

        await repository.createUser({

            username:
                user.username,

            password:
                hash,

            fullName:
                user.fullName,

            email:
                user.email,

            role:
                user.role ||
                "EMPLOYEE"

        });

        // Audit Register
        await auditService.log(

            null,

            "REGISTER",

            "APP_USERS",

            user.username,

            "New User Registered"

        );

        return true;

    };