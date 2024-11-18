const { createController } = require("sm-express-server");
const { authenticationService } = require("../services");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const authenticationController = createController(async (_, res) => {
    try {
        await authenticationService();
        return successResponse(res, "Authentication successful");
    } catch (error) {
        return errorResponse(res, error);
    }
});

module.exports = authenticationController;
