// Generate assets/preview.svg

const fs = require('fs');
const path = require('path');
const { getIcons } = require('./utils');

const icons = getIcons();

const width = 600;
const padding = 10;
const border = 8;
const bezel = 25 - border;
const columns = Math.floor((width - 50) / 28);
const paths = icons.map((icon, i) => {
    const x = i % columns;
    const y = Math.floor(i / columns);
    return `<g transform="translate(${padding + 25 + (x * 28)} ${padding + 25 + (y * 28)})"><path d="${icon.path}" fill="#322F28"/></g>`;
});

const height = 48 + (Math.ceil(icons.length / columns) * 28) + (padding * 2);

const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="${width}" height="${height}" fill="white"/>
<rect width="${width}" height="${height}" rx="20" fill="#6437A3"/>
<rect x="${border}" y="${border}" width="${width - (border * 2)}" height="${height - (border * 2)}" rx="16" fill="black"/>
<rect x="25" y="25" width="${width - 50}" height="${height - 50}" fill="#B1AEA7"/>
${paths.join("\n")}
</svg>`;

fs.writeFileSync(path.join('assets', 'preview.svg'), svg);
