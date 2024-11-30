const authenticationService = require("./authenticationService");
const getSecretCodeService = require("./getSecretCodeService");
const midigiLoginService = require("./midigiLoginService");
const televentaLoginService = require("./televentaLoginService");

module.exports = {
    authenticationService,
    midigiLoginService,
    televentaLoginService,
    getSecretCodeService,
};
