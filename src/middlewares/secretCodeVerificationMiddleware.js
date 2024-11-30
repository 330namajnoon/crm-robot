const { getSecretCodeService } = require("../services");
const config = require("../../config");

const secretCodeVerificationMiddleware = async (req, res, next) => {
    const DIGIACOUNT_SECTRET_CODE = config.DIGIACOUNT_SECTRET_CODE;
    if (!!DIGIACOUNT_SECTRET_CODE)
        next();
    else {
        await getSecretCodeService();
        next();
    }
        
};

module.exports = secretCodeVerificationMiddleware;