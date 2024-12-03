const AdmZip = require('adm-zip');
const path = require('path');

const zip = new AdmZip();
zip.addLocalFolder(path.join(__dirname, 'config'), 'config');
zip.addLocalFolder(path.join(__dirname, 'public'), 'public');

zip.writeZip(path.join(__dirname, 'resources.zip'));

console.log('Zip created successfully!');
