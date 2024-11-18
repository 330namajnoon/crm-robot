const { createController } = require("sm-express-server");
const { testEntornBuilderService } = require("../services");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const testEntornBuilderController = createController(async (req, res) => {
    try {
        const country = req.params.country;
        const projectNames = req.query.projectNames;
        const branchs = req.query.branchs;
        const response = await testEntornBuilderService({ country, projectNames, branchs });
        return successResponse(res, response);
    } catch (error) {
        return errorResponse(res, error);
    }
});

module.exports = testEntornBuilderController;
