const puppeteer = require('puppeteer'); // Usa puppeteer-core si no necesitas el binario por defecto
const { install } = require('puppeteer/lib/cjs/puppeteer/node/install.js');
const path = require('path');

const browserPath = path.resolve(__dirname, 'chromium-browser');

const ensureChromium = async () => {
  try {
    console.log('Verificando instalación de Chromium...');
    const browserFetcher = install({
      browser: 'chrome',
      cacheDir: browserPath, // Carpeta donde almacenar el navegador
    });

    const revision = '1095492'; // Versión de Chromium compatible con tu Puppeteer
    const chromiumInfo = await browserFetcher.download(revision);

    console.log('Chromium descargado en:', chromiumInfo.executablePath);
    return chromiumInfo.executablePath;
  } catch (error) {
    console.error('Error al descargar Chromium:', error);
    throw error;
  }
}

module.exports = ensureChromium;