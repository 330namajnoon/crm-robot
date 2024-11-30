const puppeteer = require("puppeteer-core");
const { loadSession } = require("../utils/puppeteerSession");
const authenticationService = require("./authenticationService");
const configuration = require("../../config");

async function midigiLoginService({
    country = "es",
    clientId = "",
    email = "",
    phoneNumber = "",
    base = "",
    contractId = "",
    documentNumber = "",
}) {
    const browserConfig = configuration.BROWSER_CONFIG;
    const config = configuration.COUNTRY_CONFIG;
    let browser;
    try {
        browser = await puppeteer.launch(browserConfig);
        const page = await browser.newPage();
        await loadSession(page, "./session.json");
        await page.goto(`${config[country].RDSDB_URL}call-center/user-validator/user-management`);
        await page.waitForSelector(".btn.btn-primary");
        const isLoged = await page.evaluate(async () => {
            const emailInput = document.querySelector("#inputEmail");
            if (emailInput) return false;
            else return true;
        });
        if (!isLoged) {
            browser.close();
            await authenticationService();
            return await midigiLoginService({
                country,
                clientId,
                email,
                phoneNumber,
                base,
                contractId,
                documentNumber,
            });
        } else {
            await page.click(".btn.btn-primary");
            await page.goto(`${config[country].RDSDB_URL}call-center/user-validator/user-management`);
            await page.waitForSelector("#phoneNumber");
            await page.type("#phoneNumber", phoneNumber);
            await page.type("#rdsdbClientId", clientId);
            await page.type("#email", email);
            await page.type("#documentNumber", documentNumber);
            await page.type("#contract", contractId);
            await page.click("#submit");
            await page.waitForSelector(".actionSelector", { timeout: 5000 });
            await page.select(".actionSelector", "loginAsMiDigi");
            const newPages = await Promise.all([
                new Promise((resolve) => browser.once("targetcreated", (target) => resolve(target.page()))),
                page.click(".btn.btn-primary.btn-sm.actionExecutor"),
            ]);
            if (!!base) {
                const loginToken = newPages[0].url().split("?")[1];
                await browser.close();
                return `${base}?${loginToken}`;
            }
            const loginToken = newPages[0].url();
            await browser.close();
            return loginToken;
        }
    } catch (error) {
        console.log(error);
        browser.close();
        throw error;
    }
}

module.exports = midigiLoginService;
