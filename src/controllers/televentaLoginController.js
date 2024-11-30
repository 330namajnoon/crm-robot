const { createController } = require("sm-express-server");
const { televentaLoginService } = require("../services");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const televentaLoginController = createController(async (req, res) => {
    try {
        const base = req.query.base;
        const response = await televentaLoginService({
            country: req.params.country,
            base: base || "",
        });
        return successResponse(res, response);
    } catch (error) {
        console.log(error);
        return errorResponse(res, error);
    }
});

module.exports = televentaLoginController;
