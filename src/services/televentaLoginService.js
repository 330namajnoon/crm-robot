const puppeteer = require("puppeteer-core");
const { loadSession } = require("../utils/puppeteerSession");
const authenticationService = require("./authenticationService");
const configuration = require("../../config");

async function televentaLoginService({country = "es", base = ""}) {
    const config = configuration.COUNTRY_CONFIG;
    const browserConfig = configuration.BROWSER_CONFIG;
    const browser = await puppeteer.launch(browserConfig);
    try {
        const page = await browser.newPage();
        await loadSession(page, "./session.json");
        await page.goto(`${config[country].RDSDB_URL}call-center/store/view/channel/3`);
        const isLoged = await page.evaluate(async () => {
            const emailInput = document.querySelector("#inputEmail");
            if (emailInput) return false;
            else return true;
        });
        if (!isLoged) {
            browser.close();
            await authenticationService();
            return await televentaLoginService({ country, base });
        } else {
            await page.waitForSelector(".btn.btn-primary");
            await page.click(".btn.btn-primary");
            await page.goto(`${config[country].RDSDB_URL}call-center/store/view/channel/3`);
            await page.waitForSelector("#select-referals");
            await page.select("#select-referals", "f113c1cacee52ef67539408f64cea496");
            await page.waitForSelector("#storeIframe");
            const token = await page.evaluate(() => {
                return document.querySelector("#storeIframe").src.split("?")[1];
            });
            await browser.close();
            return `${base}?${token}`;
        }
    } catch (error) {
        console.log(error);
        await browser.close();
        throw error;
    }
}

module.exports = televentaLoginService;
