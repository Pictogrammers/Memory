const fs = require('fs');
const path = require('path');
// Switch back to PImage once bug is fixed
//const PImage = require('pureimage');
const { createCanvas, Path2D } = require('@napi-rs/canvas');

const { getIcons } = require('./utils');

const icons = getIcons(); // [getIcons()[0]];
// Lazy, make a square sprite map
const columns = Math.ceil(Math.sqrt(icons.length));

// Playdate files
const imageFile = 'memory-table-22-22.png';
const luaFile = 'icons.lua';
const cFile = 'icons.c';

// Render all SVG's to a image
const image = createCanvas(columns * 22, columns * 22);
//const image = PImage.make(columns * 22, columns * 22);
const ctx = image.getContext('2d');
//ctx.imageSmoothingEnabled = false;

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
    /*
    const parts = path.match(/([A-Z][^A-Z]+)/g);
    let previousX = 0;
    let previousY = 0;
    let isFirst = true;
    
    parts.forEach((part) => {
        const p = part.match(/([A-Z])(\d+) ?(\d+)?/);
        const command = p[1];
        const v1 = parseInt(p[2]);
        const v2 = parseInt(p[3]);
        switch(command) {
            case 'M':
                if (isFirst) {
                    ctx.beginPath();
                    console.log(`ctx.beginPath();`)
                }
                isFirst = false;
                ctx.moveTo(
                    v1 + offsetX,
                    v2 + offsetY
                );
                console.log(`ctx.moveTo(${v1 + offsetX}, ${v2 + offsetY});`);
                previousX = v1 + offsetX;
                previousY = v2 + offsetY;
                break;
            case 'L':
                ctx.lineTo(
                    v1 + offsetX,
                    v2 + offsetY
                );
                previousX = v1 + offsetX;
                previousY = v2 + offsetY;
                break;
            case "V":
                ctx.lineTo(
                    previousX,
                    v1 + offsetY
                );
                console.log(`ctx.lineTo(${previousX}, ${v1 + offsetY});`);
                previousY = v1 + offsetY;
                break;
            case "H":
                ctx.lineTo(
                    v1 + offsetX,
                    previousY
                );
                console.log(`ctx.lineTo(${v1 + offsetX}, ${previousY});`);
                previousX = v1 + offsetX;
                break;
            case "Z":
                console.log('ctx.closePath();')
                ctx.closePath();
                isFirst = true;
                break;
            default:
                console.error(`Unsupported ${part[0]} path in "${name}".`);
        }
    });

    ctx.fill();*/
});

const file = path.join(__dirname, '..', 'playdate', imageFile);
image.encode('png').then((pngData) => {
    fs.writeFileSync(file, pngData);
});

// Write Lua File
function camelCase(str) {
    return str
        .split('-')
        .map((a) => a.charAt(0).toUpperCase() + a.slice(1))
        .join('');
}
const luaList = icons.map(({ name }, i) => {
    return `Icon${camelCase(name)} = ${i + 1}`;
});

const luaScript = `local pd <const> = playdate
local gfx <const> = pd.graphics

local icons = playdate.graphics.imagetable.new('images/memory')

class('Icon').extends(gfx.sprite)

function Icon:init(x, y, iconIndex)
    Icon.super.init(self)
    self:moveTo(x, y)
    self:setIcon(iconIndex)
end

function Icon:setIcon(iconIndex)
    local cache = gfx.image.new(22, 22)
    gfx.pushContext(cache)
        local icon = icons:getImage(iconIndex)
        icon:draw(0, 0)
    gfx.popContext()
    self:setImage(cache)
end

${luaList.join('\n')}`;

const luaFilePath = path.join(__dirname, '..', 'playdate', luaFile);
fs.writeFileSync(luaFilePath, luaScript);

/*
PImage.encodePNGToStream(image, fs.createWriteStream(imageFile)).then(() => {
    console.log("wrote out the png file to out.png");
}).catch((e)=>{
    console.log("there was an error writing");
});
*/