const createController = require("sm-express-server/modules/createController");
const fs = require("fs");
const { errorResponse, successResponse } = require("../utils/responseHandler");
const pth = require("path");

const setFileController = createController(async (req, res) => {
    try {
        const path = req.body.path;
        const value = req.body.value;
        fs.writeFile(path, value, (err) => {
            if (err) {
                console.log(err);
                return errorResponse(res, err);
            }
            return successResponse(res, "File created successfully");
        });
    } catch (error) {
        console.log(error);
        return errorResponse(res, error);
    }
});

module.exports = setFileController;