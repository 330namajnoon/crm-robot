const { getSecretCodeService } = require("../services");

const secretCodeVerificationMiddleware = async (req, res, next) => {
    const DIGIACOUNT_SECTRET_CODE = process.env.DIGIACOUNT_SECTRET_CODE;
    if (!!DIGIACOUNT_SECTRET_CODE)
        next();
    else {
        await getSecretCodeService();
        next();
    }
        
};

module.exports = secretCodeVerificationMiddleware;