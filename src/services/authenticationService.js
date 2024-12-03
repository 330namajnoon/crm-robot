const { default: puppeteer } = require("puppeteer-core");
const otplib = require("otplib");
const { saveSession } = require("../utils/puppeteerSession");
const config = require("../../config");


async function authenticationService() {
    let browser;
    try {
        const browserConfig = config.BROWSER_CONFIG;
        browser = await puppeteer.launch(browserConfig);
        const page = await browser.newPage();
        await page.goto(config.DIGIACOUNT_LOGIN_URL);
        await page.waitForSelector("#inputEmail");
        await page.type("#inputEmail", config.RDSDB_USER);
        await page.type("#inputPassword", config.RDSDB_PASSWORD);
        await page.click(".mt-4.btn.btn-md.btn-primary.mt-3.w-100.g-recaptcha-custom");
        await page.waitForSelector("#inputCode", { timeout: 10000 });
        await page.evaluate( async (code) => {
            let buffer = null;
            return await new Promise((resolve, reject) => {
                buffer = setInterval(() => {
                    const codeInput = document.querySelector("#inputCode");
                    const button = document.querySelector(".mt-4.btn.btn-md.btn-success.mt-3.w-100");
                    if (codeInput && button) {
                        codeInput.value = code;
                        button.click();
                        clearInterval(buffer);
                        resolve();
                    }
                }, 1000);
            });
        }, otplib.authenticator.generate(config.DIGIACOUNT_SECTRET_CODE));
        await page.waitForNavigation({ timeout: 10000 });
        await page.waitForSelector(".card-header.text-truncate", { timeout: 1000 });
        await saveSession(page, "./session.json");
        await browser.close();
        return true;
    } catch (error) {
        console.log(error);
        if (browser)
            browser.close();
        throw error;
    }
}

module.exports = authenticationService;