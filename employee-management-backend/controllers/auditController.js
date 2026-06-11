const auditRepository =
    require("../repositories/auditRepository");

const response =
    require("../utils/apiResponse");

exports.getAuditLogs =
async (
    req,
    res,
    next
) => {

    try {

        const data =
            await auditRepository
                .getAuditLogs();

        res.json(

            response.success(
                "Audit Logs Fetched Successfully",
                data
            )

        );

    }
    catch (error) {

        next(error);

    }

};