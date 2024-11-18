const { createRouter } = require("sm-express-server");
const controllers = require("../controllers");

const routes = createRouter("/v2", (router) => {
    router.get("/auth", controllers.authenticationController);
    router.get("/midigi/login/:country", controllers.midigiLoginController);
    router.get("/entorn-builder/:country", controllers.entornBuilderController);
    router.get("/televenta/login/:country", controllers.televentaLoginController);
    router.get("/test-entorn-builder/:country", controllers.testEntornBuilderController);
});

module.exports = routes;