const express =
    require("express");

const router =
    express.Router();

const controller =
    require(
        "../controllers/onboardingController"
    );

const authenticate =
    require(
        "../middleware/authenticate"
    );

const authorize =
    require(
        "../middleware/authorize"
    );

router.post(
    "/",
    authenticate,
    authorize(
        "ADMIN",
        "HR"
    ),
    controller.onboardEmployee
);

module.exports =
    router;