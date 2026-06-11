const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {

    return jwt.sign(
        {
            userId: user.USER_ID,
            username: user.USERNAME,
            role: user.ROLE
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "8h"
        }
    );

};

exports.verifyToken = (token) => {

    return jwt.verify(
        token,
        process.env.JWT_SECRET
    );

};