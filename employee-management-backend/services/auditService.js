const repository =
require("../repositories/auditRepository");

exports.log =
async (
    user,
    action,
    entityName,
    entityId,
    description
) => {

    await repository.saveAudit({

        userId:
            user?.userId || null,

        username:
            user?.username || "SYSTEM",

        action,

        entityName,

        entityId,

        description

    });

};