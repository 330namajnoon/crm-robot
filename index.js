const { Server } = require("sm-express-server");
const routes = require("./src/routes");
const middlewares = require("./src/middlewares");
const config = require("./config");
const express = require("express");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-core");


fs.readFile("./config.json", async (err, data) => {
    if (!err) {
        const newConfig = {...config, ...JSON.parse(data.toString())};
        Object.keys(newConfig).forEach((key) => {
            if (newConfig[key]) {
                config[key] = newConfig[key];
            }
        });
    }
    
    try {
        const port = config.PORT || 4000;
        const server = new Server(port, "./", [...middlewares, express.json(), express.static("public")], [routes]);
        server.start(async () => {
            console.log(`server is up on port ${port}!`);
        });
    } catch (error) {
        console.log(error);
        return;
    }
});
