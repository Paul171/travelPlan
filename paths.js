const path = require('path');
const srcFolder = 'src';
const srcFolderPath = path.join(__dirname, srcFolder);
const jsFolderPath = path.join(srcFolderPath, 'js');
module.exports = {
	appSource: jsFolderPath,
	appBuild: path.join(__dirname, 'dist'),
	appModules: path.join(__dirname, 'node_modules')
}