const { default: puppeteer } = require("puppeteer-core");
const fs = require("fs");
const config = require("../../config");

async function getSecretCodeService() {
    const browserConfig = config.BROWSER_CONFIG;
    let browser;

    try {
        browser = await puppeteer.launch(browserConfig);
        const page = await browser.newPage();
        await page.goto("https://www.googleauthenticator.dev/");
        const secretKey = await page.evaluate(async() => {
            let buffer;
            const isScaned = await new Promise((resolve) => {
                const buffer = setInterval(() => {
                    const data = Array.from(document.querySelectorAll("tr"))?.find(tr => tr?.children[0]?.innerHTML === "Data Parameter")?.children[1]?.children[0]?.innerHTML;
                    if (!!data) {
                        clearInterval(buffer);
                        resolve(data);
                    }
                }, 1000);
            });
            document.querySelectorAll(".btn.btn-primary")[1].click();
            document.querySelectorAll(".btn.btn-primary")[2].click();
            const secretKey = Array.from(document.querySelectorAll("tr"))?.find(tr => tr?.children[0]?.innerHTML === "Shared Secret")?.children[1]?.children[0]?.innerHTML;
            return secretKey;
        });

        fs.writeFileSync("./secretKey.txt", secretKey);
        browser.close();
        return secretKey;
    } catch (error) {
        console.log(error);
        browser?.close();
        throw error;
    }

};

module.exports = getSecretCodeService;
