const fs = require('fs');
var Jimp = require('jimp');
var bmpJs = require('bmp-js');
const { bit1Encoder } = require('./utils');
const path = require('path');
const { createCanvas, Path2D } = require('@napi-rs/canvas');

const { getIcons } = require('./utils');

const icons = getIcons();
// Lazy get width
const guess = Math.ceil(Math.sqrt(icons.length));
const guessWidth = guess * 22;
const width = Math.ceil(guessWidth / 32) * 32;
const columns = Math.floor(width / 22);
const rows = Math.ceil(icons.length / columns);

// Playdate files
const imageFile = 'memory.bmp';
const tsFile = 'icons.ts';
const jsFile = 'icons.js';

// Render all SVG's to a image
const image = createCanvas(columns * 22, rows * 22);
const ctx = image.getContext('2d');

ctx.fillStyle = 'black';
ctx.lineWidth = 0;
icons.forEach(({ path, name }, i) => {
    const x = i % columns;
    const y = Math.floor(i / columns);
    const offsetX = x * 22;
    const offsetY = y * 22;

    ctx.translate(offsetX, offsetY);
    ctx.fill(new Path2D(path));
    ctx.translate(-offsetX, -offsetY);
});

image.encode('png').then((pngData) => {
    Jimp.read(pngData, (err, image) => {
        if (err) throw err;
        image
          .background(0xFFFFFFFF)
          .flip(false, true)
          .getBuffer(Jimp.MIME_BMP, (err, data) => {
            if (err) throw err;
            var bmpData = bmpJs.decode(data);
            const bit1 = bit1Encoder(bmpData, 0);
            fs.writeFileSync(path.join(__dirname, '..', 'moddable', imageFile), bit1.data);
          });
      });
});

// Write JS / TS files
function camelCase(str) {
    return str
        .split('-')
        .map((a) => a.charAt(0).toUpperCase() + a.slice(1))
        .join('');
}
const jsList = icons.map(({ name }, i) => {
    const x = i % columns;
    const y = Math.floor(i / columns);
    return `export const Icon${camelCase(name)} = [icons22, SIZE_22, ${x}, ${y}];`;
});

const jsScript = `import Resource from "Resource";
import parseBMP from "commodetto/parseBMP";

const icons22 = parseBMP(new Resource("./assets/memory.bmp"));
const SIZE_22 = 22;

${jsList.join('\n')}
`;

const jsFilePath = path.join(__dirname, '..', 'moddable', jsFile);
fs.writeFileSync(jsFilePath, jsScript);

const tsFilePath = path.join(__dirname, '..', 'moddable', tsFile);
fs.writeFileSync(tsFilePath, jsScript);
