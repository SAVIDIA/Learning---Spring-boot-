const service =
    require("../services/employeeService");

const response =
    require("../utils/apiResponse");

const auditService =
    require("../services/auditService");

exports.getAllEmployees =
async (
    req,
    res,
    next
) => {

    try {

        const data =
            await service.getAllEmployees();

        res.json(
            response.success(
                "Employees fetched successfully",
                data
            )
        );

    }
    catch (err) {

        next(err);

    }

};

exports.myProfile =
async (
    req,
    res,
    next
) => {

    try {

        const employee =
            await service.getByUserId(
                req.user.userId
            );

        res.json(
            response.success(
                "Employee Found",
                employee
            )
        );

    }
    catch (error) {

        next(error);

    }

};

exports.getEmployeeById =
async (
    req,
    res,
    next
) => {

    try {

        const data =
            await service.getEmployeeById(
                req.params.id
            );

        res.json(
            response.success(
                "Employee fetched successfully",
                data
            )
        );

    }
    catch (err) {

        next(err);

    }

};

exports.createEmployee =
async (
    req,
    res,
    next
) => {

    try {

        await service.createEmployee(
            req.body
        );

        await auditService.log(

            req.user,

            "CREATE",

            "EMPLOYEE",

            "NEW",

            `Employee Created : ${req.body.employeeName}`

        );

        res.status(201).json(

            response.success(

                "Employee created successfully",

                null

            )

        );

    }
    catch (err) {

        next(err);

    }

};

exports.updateEmployee =
async (
    req,
    res,
    next
) => {

    try {

        await service.updateEmployee(

            req.params.id,

            req.body

        );

        await auditService.log(

            req.user,

            "UPDATE",

            "EMPLOYEE",

            req.params.id,

            `Employee Updated : ${req.params.id}`

        );

        res.json(

            response.success(

                "Employee updated successfully",

                null

            )

        );

    }
    catch (err) {

        next(err);

    }

};

exports.deleteEmployee =
async (
    req,
    res,
    next
) => {

    try {

        await service.deleteEmployee(
            req.params.id
        );

        await auditService.log(

            req.user,

            "DELETE",

            "EMPLOYEE",

            req.params.id,

            `Employee Deleted : ${req.params.id}`

        );

        res.json(

            response.success(

                "Employee deleted successfully",

                null

            )

        );

    }
    catch (err) {

        next(err);

    }

};

exports.searchByName =
async (
    req,
    res,
    next
) => {

    try {

        const data =
            await service.searchByName(
                req.query.name
            );

        res.json(

            response.success(

                "Employees fetched successfully",

                data

            )

        );

    }
    catch (err) {

        next(err);

    }

};

exports.searchByDepartment =
async (
    req,
    res,
    next
) => {

    try {

        const data =
            await service.searchByDepartment(
                req.params.department
            );

        res.json(

            response.success(

                "Employees fetched successfully",

                data

            )

        );

    }
    catch (err) {

        next(err);

    }

};