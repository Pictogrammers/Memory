// Generate packages/memory-svg
const fs = require('fs');
const path = require('path');

const {
    getIcons,
    emptyDirSync
} = require('./utils');

const icons = getIcons();
const width = 22;
const height = 22;

// Empty directory
const svgDirectory = path.join(__dirname, '..', 'packages', 'memory-svg', 'svg');
emptyDirSync(svgDirectory);

// Write svg files
icons.forEach(({ name, path: data }, i) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><path d="${data}"/></svg>`;
    const svgFile = `${name}.svg`;
    const svgFilePath = path.join(svgDirectory, svgFile);
    fs.writeFileSync(svgFilePath, svg);
});

// meta.json
const metaFile = 'meta.json';
const srcMetaFilePath = path.join(__dirname, '..', 'src', metaFile);
const metaFilePath = path.join(__dirname, '..', 'packages', 'memory-svg', metaFile);
const meta = fs.readFileSync(srcMetaFilePath);
fs.writeFileSync(metaFilePath, meta);

// font-build.json
const fbFile = 'font-build.json';
const srcFbFilePath = path.join(__dirname, '..', 'src', fbFile);
const fbFilePath = path.join(__dirname, '..', 'packages', 'memory-svg', fbFile);
const fb = fs.readFileSync(srcFbFilePath);
fs.writeFileSync(fbFilePath, fb);

// sync version from parent
const inPackFile = path.join(__dirname, '..', 'package.json');
const inPack = JSON.parse(fs.readFileSync(inPackFile));
const version = inPack.version;
const outPackFile = path.join(__dirname, '..', 'packages', 'memory-svg', 'package.json');
const outPack = JSON.parse(fs.readFileSync(outPackFile));
outPack.version = version;
fs.writeFileSync(outPackFile, JSON.stringify(outPack, null, 4));

// Friendly message
console.log(`SVG Package Complete (${icons.length})`)
