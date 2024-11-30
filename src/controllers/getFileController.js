const { createController } = require("sm-express-server");
const fs = require("fs");
const { errorResponse, successResponse } = require("../utils/responseHandler");
const pth = require("path");


const getFileController = createController(async (req, res) => {
    try {
        const path = req.query.path;
        console.log(path)
        fs.readFile(path, (err, data) => {
            if (err) {
                console.log(err);
                return errorResponse(res, err);
            }
            return successResponse(res, data.toString());
        });
    } catch (error) {
        console.log(error);
        return errorResponse(res, error);
    }
});

module.exports = getFileController;