const repository =
    require(
        "../repositories/onboardingRepository"
    );

const passwordUtil =
    require(
        "../utils/passwordUtil"
    );

exports.onboardEmployee =
async (request) => {

    const hash =
        await passwordUtil.hashPassword(
            request.password
        );

    await repository
        .createEmployeeWithUser(

            {
                username:
                    request.username,

                password:
                    hash,

                fullName:
                    request.employeeName,

                email:
                    request.email,

                role:
                    request.role
            },

            request

        );

};