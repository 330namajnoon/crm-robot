const { Server } = require("sm-express-server");
const routes = require("./src/routes");
const middlewares = require("./src/middlewares");
const config = require("./config");
const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");
const Admzip = require("adm-zip");
const path = require("path");
const { mergeObjects } = require("./src/utils");

const executableDir = path.dirname(process.execPath);
const zipPath = path.join(__dirname, "resources.zip");
const configPath = path.join(executableDir, "config");
const dataDir = path.join(executableDir, "data");

if ((!fs.existsSync(configPath) || !fs.existsSync(dataDir)) && fs.existsSync(zipPath)) {
    console.log("Extrayendo archivos desde el .zip...");
    console.log("executableDir", executableDir);
    console.log("zipPath", zipPath);
    const zip = new Admzip(zipPath);
    zip.extractAllTo(executableDir, true); 
    console.log("Archivos extraidos correctamente");
}

fs.readFile("./config.json", async (err, data) => {
    if (!err) {
        const newConfig = mergeObjects(config, JSON.parse(data.toString()));
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
            exec(`${config.OPEN_BROWSER_COMMAND} http://localhost:${port}`, (err, stdout, stderr) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(stdout);
            });
        });
    } catch (error) {
        console.log(error);
        return;
    }
});