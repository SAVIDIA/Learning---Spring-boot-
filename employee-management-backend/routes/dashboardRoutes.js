const express =
require("express");

const router =
express.Router();

const controller =
require("../controllers/dashboardController");

const authenticate =
require("../middleware/authenticate");

const authorize =
require("../middleware/authorize");

router.get(
    "/admin",
    authenticate,
    authorize(
        "ADMIN",
        "HR"
    ),
    controller.adminDashboard
);

module.exports =
router;