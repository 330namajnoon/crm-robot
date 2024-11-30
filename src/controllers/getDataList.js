const { createController } = require("sm-express-server");
const config = require("../../config");
const { successResponse } = require("../utils/responseHandler");

const getDataList = createController(async (req, res) => {
    return successResponse(res, config.datalist);
});

module.exports = getDataList;