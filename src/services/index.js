const authenticationService = require("./authenticationService");
const entornBuilderService = require("./entornBuilderService");
const getSecretCodeService = require("./getSecretCodeService");
const midigiLoginService = require("./midigiLoginService");
const televentaLoginService = require("./televentaLoginService");
const testEntornBuilderService = require("./testEntornBuilderService");

module.exports = {
    authenticationService,
    midigiLoginService,
    televentaLoginService,
    entornBuilderService,
    testEntornBuilderService,
    getSecretCodeService,
};
