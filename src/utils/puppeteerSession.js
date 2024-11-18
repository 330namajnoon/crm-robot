const fs = require('fs');

async function saveSession(page, path) {
    const cookies = await page.cookies();
    fs.writeFileSync(path, JSON.stringify(cookies));
    return true;
}

async function loadSession(page, path) {
    if (fs.existsSync(path)) {
        const cookies = JSON.parse(fs.readFileSync(path));
        await page.setCookie(...cookies);
    }
}

function removeSession(path) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify([]), (err) => {
            if (err) resolve(false);
            else resolve(true);
        });

    })
}

module.exports = {
    saveSession,
    loadSession,
    removeSession
}