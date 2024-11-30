const { createController } = require("sm-express-server");
const { midigiLoginService } = require("../services");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const midigiLoginController = createController(async (req, res) => {
    try {
        const base = req.query.base;
        const email = req.query.email;
        const clientId = req.query.clientId;
        const phoneNumber = req.query.phoneNumber;
        const contractId = req.query.contractId;
        const documentNumber = req.query.documentNumber;

        const response = await midigiLoginService({
            country: req.params.country,
            clientId: clientId || "",
            phoneNumber: phoneNumber || "",
            base: base || "",
            email: email || "",
            contractId: contractId || "",
            documentNumber: documentNumber || "",
        });
        return successResponse(res, response);
    } catch (error) {
        console.log(error);
        return errorResponse(res, error);
    }
});

module.exports = midigiLoginController;
