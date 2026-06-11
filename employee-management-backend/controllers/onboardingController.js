const service =
    require(
        "../services/onboardingService"
    );

exports.onboardEmployee =
async (
    req,
    res,
    next
) => {

    try {

        await service
            .onboardEmployee(
                req.body
            );

        res.json({

            status:
                "SUCCESS",

            message:
                "Employee Onboarded Successfully",

            data: null

        });

    }
    catch (error) {

        next(error);

    }

};