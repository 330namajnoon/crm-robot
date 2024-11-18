const { createController } = require("sm-express-server");
const { entornBuilderService } = require("../services");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const entornBuilderController = createController(async (req, res) => {
    try {
        const repository = req.query.repository;
        const branch = req.query.branch;
        const newPassword = req.query.newPassword;
        const response = await entornBuilderService({
            country: req.params.country,
            repository,
            branch,
            newPassword,
        });
        return successResponse(res, response);
    } catch (error) {
        return errorResponse(res, error);
    }
});

module.exports = entornBuilderController;
