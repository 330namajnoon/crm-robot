const { getSecretCodeService } = require("../services");

const secretCodeVerificationMiddleware = async (req, res, next) => {
    const MIDIGI_SECRET_CODE = process.env.MIDIGI_SECRET_CODE;
    console.log(MIDIGI_SECRET_CODE);
    if (MIDIGI_SECRET_CODE)
        next();
    else {
        await getSecretCodeService();
        next();
    }
        
};

module.exports = secretCodeVerificationMiddleware;