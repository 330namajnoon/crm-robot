module.exports = {
    apps: [
        {
            name: "robot",
            script: "index.js",
            watch: true,
            ignore_watch: ["node_modules", "public", "session.json"],
        },
    ],
};
