const authenticate =
    require("../middleware/authenticate");

const authorize =
    require("../middleware/authorize");

const express =
    require("express");

const router =
    express.Router();

const controller =
    require(
        "../controllers/authController"
    );

router.post(
    "/register",
    authenticate,
    authorize("ADMIN"),
    controller.register
);

router.get(
    "/me",
    authenticate,
    controller.me
);


router.post(
    "/login",
    controller.login
);

module.exports =
    router;