const service =
    require("../services/authService");

exports.login =
    async (
        req,
        res,
        next
    ) => {

        try {

            const result =
                await service.login(
                    req.body.username,
                    req.body.password
                );

            res.json({

                status:
                    "SUCCESS",

                message:
                    "Login Successful",

                data:
                    result

            });

        } catch (error) {

            if (
                error.message === "Invalid Username" ||
                error.message === "Invalid Password"
            ) {

                error.statusCode = 401;

            }

            next(error);

        }

    };



    exports.register =
async (
    req,
    res,
    next
) => {

    try {

        await service.register(
            req.body
        );

        res.json({

            status:
                "SUCCESS",

            message:
                "User Registered Successfully",

            data:
                null

        });

    } catch (error) {

        if (
            error.message === "Username already exists"
        ) {

            error.statusCode = 409;

        }

        next(error);

    }

};

exports.me =
async (
    req,
    res,
    next
) => {

    try {

        res.json({

            status:
                "SUCCESS",

            message:
                "Authenticated user fetched successfully",

            data: {
                userId: req.user.userId,
                username: req.user.username,
                role: req.user.role
            }

        });

    } catch (error) {

        next(error);

    }

};