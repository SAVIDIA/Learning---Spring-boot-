const dbUtil =
require("../utils/dbUtil");

exports.saveAudit =
async (audit) => {

    return await dbUtil.execute(
        `
        INSERT INTO AUDIT_LOG
        (
            AUDIT_ID,
            USER_ID,
            USERNAME,
            ACTION,
            ENTITY_NAME,
            ENTITY_ID,
            DESCRIPTION,
            CREATED_DATE
        )
        VALUES
        (
            AUDIT_LOG_SEQ.NEXTVAL,
            :userId,
            :username,
            :action,
            :entityName,
            :entityId,
            :description,
            SYSDATE
        )
        `,
        audit
    );

};

exports.getAuditLogs =
async () => {

    return await dbUtil.execute(
        `
        SELECT
            AUDIT_ID,
            USER_ID,
            USERNAME,
            ACTION,
            ENTITY_NAME,
            ENTITY_ID,
            DESCRIPTION,
            CREATED_DATE
        FROM AUDIT_LOG
        ORDER BY CREATED_DATE DESC
        `
    );

};