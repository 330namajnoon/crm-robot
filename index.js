const { Server } = require("sm-express-server");
const routes = require("./src/routes");

const port = process.env.PORT || 4000;
const server = new Server(port, "./public/", [], [routes]);

server.start(() => {
    console.log(`server is up on port ${port}!`);
})


