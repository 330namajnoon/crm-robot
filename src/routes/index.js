const { createRouter, createStorage } = require("sm-express-server");
const controllers = require("../controllers");

const routes = createRouter("/v2", (router) => {
    router.get("/auth", controllers.authenticationController);
    router.get("/midigi/login/:country", controllers.midigiLoginController);
    router.get("/televenta/login/:country", controllers.televentaLoginController);
    router.get("/file", controllers.getFileController);
    router.post("/file", controllers.setFileController);
    router.get("/datalist", controllers.getDataList);
});

module.exports = routes;
