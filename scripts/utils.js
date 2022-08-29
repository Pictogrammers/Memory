const fs = require('fs');
const path = require('path');

function getIcons() {
    const dir = fs.opendirSync('src');
    let file;
    const icons = [];
    while ((file = dir.readSync()) !== null) {
        const svg = fs.readFileSync(path.join('src', file.name), 'utf-8');
        const data = svg.match(' d="([^"]+)"')[1];
        icons.push({
            name: file.name.replace('.svg', ''),
            path: data
        });
    }
    dir.closeSync();
    return icons;
};

exports.getIcons = getIcons;
