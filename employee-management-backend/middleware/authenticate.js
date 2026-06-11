const jwtUtil =
    require("../utils/jwtUtil");

module.exports =
    (
        req,
        res,
        next
    ) => {

        try {

            const authHeader =
                req.headers.authorization;

            if (!authHeader) {

                return res.status(401).json({

                    status: "FAILED",
                    message: "Token Missing",
                    data: null

                });

            }

            const token =
                authHeader.replace(
                    "Bearer ",
                    ""
                );

            const user =
                jwtUtil.verifyToken(
                    token
                );

            req.user = user;

            next();

        }
        catch (error) {

            return res.status(401).json({

                status: "FAILED",
                message: "Invalid Token",
                data: null

            });

        }

    };