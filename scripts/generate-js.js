// Generate packages/memory
const fs = require('fs');
const path = require('path');

const { getIcons } = require('./utils');

const icons = getIcons();

// Playdate files
const tsFile = 'icons.ts';
const jsFile = 'icons.js';

function camelCase(str) {
    return str
        .split('-')
        .map((a) => a.charAt(0).toUpperCase() + a.slice(1))
        .join('');
}

const jsList = icons.map(({ name, path }, i) => {
    return `export const Memory${camelCase(name)} = '${path}';`;
});

const jsScript = `${jsList.join('\n')}
`;

const jsFilePath = path.join(__dirname, '..', 'packages', 'memory', 'lib', jsFile);
fs.writeFileSync(jsFilePath, jsScript);

const tsFilePath = path.join(__dirname, '..', 'packages', 'memory', 'src', tsFile);
fs.writeFileSync(tsFilePath, jsScript);

// sync version from parent
const inPackFile = path.join(__dirname, '..', 'package.json');
const inPack = JSON.parse(fs.readFileSync(inPackFile));
const version = inPack.version;
const outPackFile = path.join(__dirname, '..', 'packages', 'memory-js', 'package.json');
const outPack = JSON.parse(fs.readFileSync(outPackFile));
outPack.version = version;
fs.writeFileSync(outPackFile, JSON.stringify(outPack, null, 4));

// Friendly message
console.log('JS Package Complete')
