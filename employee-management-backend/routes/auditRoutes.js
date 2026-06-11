const express =
    require("express");

const router =
    express.Router();

const controller =
    require("../controllers/auditController");

const authenticate =
    require("../middleware/authenticate");

const authorize =
    require("../middleware/authorize");

router.get(

    "/",

    authenticate,

    authorize("ADMIN"),

    controller.getAuditLogs

);

module.exports =
    router;