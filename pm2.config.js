module.exports = {
    apps : [{
        name: "robot",
        script: "./index.js",
        env: {
            PORT: 4000,
            PROJECTS_PATH: "",
            DIGIACOUNT_SECTRET_CODE: "",
            AUTH_SECTRET_CODE: "",
            RDSDB_USER: "",
            RDSDB_PASSWORD: "",
            GITLAB_USER: "",
            GITLAB_PASSWORD: "",
            DIGIACOUNT_LOGIN_URL: "",
            COUNTRY_CONFIG: {
                es: {
                    RDSDB_URL: "",
                    GITLAB: ""
                },
                pt: {
                    RDSDB_URL: "",
                    GITLAB: ""
                }
            },
            BROWSER_CONFIG: {
                headless: false,
                defaultViewport: { width: 1080, height: 1024 },
                protocolTimeout: 600000,
            },
        },
    }]
}