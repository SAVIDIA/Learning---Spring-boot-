const dashboardService =
require("../services/dashboardService");

exports.adminDashboard =
async (
    req,
    res,
    next
) => {

    try {

        const data =
            await dashboardService
                .getAdminDashboard();

        res.json({

            status:
                "SUCCESS",

            message:
                "Dashboard Loaded",

            data

        });

    }
    catch (error) {

        next(error);

    }

};