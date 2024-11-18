const { Server } = require("sm-express-server");
const routes = require("./src/routes");
const middlewares = require("./src/middlewares");

const port = process.env.PORT || 4000;
const server = new Server(port, "./public/", middlewares, [routes]);

server.start(() => {
    console.log(`server is up on port ${port}!`);
})


