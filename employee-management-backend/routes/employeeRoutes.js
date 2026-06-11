const express =
    require("express");

const router =
    express.Router();

const controller =
    require("../controllers/employeeController");

const authenticate =
    require("../middleware/authenticate");

const authorize =
    require("../middleware/authorize");

/*
====================================
SELF PROFILE
====================================
*/

router.get(

    "/me",

    authenticate,

    authorize(
        "ADMIN",
        "HR",
        "MANAGER",
        "EMPLOYEE"
    ),

    controller.myProfile

);

/*
====================================
SEARCH ROUTES
(MUST COME BEFORE /:id)
====================================
*/

router.get(

    "/search",

    authenticate,

    authorize(
        "ADMIN",
        "HR",
        "MANAGER"
    ),

    controller.searchByName

);

router.get(

    "/department/:department",

    authenticate,

    authorize(
        "ADMIN",
        "HR",
        "MANAGER"
    ),

    controller.searchByDepartment

);

/*
====================================
EMPLOYEE CRUD
====================================
*/

router.get(

    "/",

    authenticate,

    authorize(
        "ADMIN",
        "HR",
        "MANAGER"
    ),

    controller.getAllEmployees

);

router.get(

    "/:id",

    authenticate,

    authorize(
        "ADMIN",
        "HR",
        "MANAGER"
    ),

    controller.getEmployeeById

);

router.post(

    "/",

    authenticate,

    authorize(
        "ADMIN",
        "HR"
    ),

    controller.createEmployee

);

router.put(

    "/:id",

    authenticate,

    authorize(
        "ADMIN",
        "HR"
    ),

    controller.updateEmployee

);

router.delete(

    "/:id",

    authenticate,

    authorize(
        "ADMIN"
    ),

    controller.deleteEmployee

);

module.exports =
    router;