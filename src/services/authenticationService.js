const { default: puppeteer } = require("puppeteer");
const otplib = require("otplib");
const { saveSession } = require("../utils/puppeteerSession");


async function authenticationService() {
    let browser;
    try {
        const browserConfig = JSON.parse(process.env.BROWSER_CONFIG);
        browser = await puppeteer.launch(browserConfig);
        const page = await browser.newPage();
        await page.goto(process.env.DIGIACOUNT_LOGIN_URL);
        await page.waitForSelector("#inputEmail");
        await page.type("#inputEmail", process.env.RDSDB_USER);
        await page.type("#inputPassword", process.env.RDSDB_PASSWORD);
        await page.click(".mt-4.btn.btn-md.btn-primary.mt-3.w-100.g-recaptcha-custom");
        await page.waitForNavigation({ timeout: 10000 });
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
        }, otplib.authenticator.generate(process.env.DIGIACOUNT_SECTRET_CODE));
        await page.waitForNavigation({ timeout: 10000 });
        await page.waitForSelector(".card-header.text-truncate", { timeout: 1000 });
        await saveSession(page, "./session.json");
        await browser.close();
        return true;
    } catch (error) {
        if (browser)
            browser.close();
        throw error;
    }
}

module.exports = authenticationService;