const fs = require('fs');
const path = require('path');

function getIcons() {
    const svgDir = path.join('src', 'svg');
    const dir = fs.opendirSync(svgDir);
    let file;
    const icons = [];
    while ((file = dir.readSync()) !== null) {
        const svg = fs.readFileSync(path.join(svgDir, file.name), 'utf-8');
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

// Copied from `image-to-bmp`

/**
 * this is copied from bmp-js
 */
 function BmpEncoder(imgData) {
    this.buffer = imgData.data;
    this.width = imgData.width;
    this.height = imgData.height;
    //this.extraBytes = this.width % 4;
    //this.rgbSize = this.height * (1 * this.width + this.extraBytes);
    this.headerInfoSize = 40;

    this.data = [];
    /******************header***********************/
    this.flag = "BM";
    this.reserved = 0;
    this.offset = 54;
    //this.fileSize = this.rgbSize + this.offset;
    this.planes = 1;
    this.bitPP = 1;
    this.compress = 0;
    this.hr = 0;
    this.vr = 0;
    this.colors = Math.min(
        2 ** (this.bitPP - 1 || 1),
        imgData.colors || Infinity
    );
    this.importantColors = 0;

    if (this.colors && this.bitPP < 16) {
        this.offset += this.colors * 4;
    } else {
        this.colors = 0;
    }

    switch (this.bitPP) {
        case 32:
            this.bytesInColor = 4;
            break;
        case 16:
            this.bytesInColor = 2;
            break;
        case 8:
            this.bytesInColor = 1;
            break;
        case 4:
            this.bytesInColor = 1 / 2;
            break;
        case 1:
            this.bytesInColor = 1 / 8;
            break;
        default:
            this.bytesInColor = 3;
            this.bitPP = 24;
    }

    const rowWidth = (this.width * this.bitPP) / 32;
    const rowBytes = Math.ceil(rowWidth);

    this.extraBytes = (rowBytes - rowWidth) * 4;
    // Why 2?
    this.rawSize = this.height * rowBytes * 4 + 2;
    this.fileSize = this.rawSize + this.offset;
    this.data = Buffer.alloc(this.fileSize, 0x1);
}

function createInteger(numbers) {
    return numbers.reduce((final, n) => (final << 1) | n, 0);
}

BmpEncoder.prototype.encode = function (modify) {
    this.pos = 0;

    this.data.write(this.flag, this.pos, 2); this.pos += 2;
    this.data.writeUInt32LE(this.fileSize, this.pos); this.pos += 4;
    this.data.writeUInt32LE(this.reserved, this.pos); this.pos += 4;
    this.data.writeUInt32LE(this.offset, this.pos); this.pos += 4;

    this.data.writeUInt32LE(this.headerInfoSize, this.pos); this.pos += 4;
    this.data.writeUInt32LE(this.width, this.pos); this.pos += 4;
    this.data.writeInt32LE(-this.height, this.pos); this.pos += 4; // top to bottom
    this.data.writeUInt16LE(this.planes, this.pos); this.pos += 2;
    this.data.writeUInt16LE(this.bitPP, this.pos); this.pos += 2;
    this.data.writeUInt32LE(this.compress, this.pos); this.pos += 4;
    this.data.writeUInt32LE(this.rgbSize, this.pos); this.pos += 4;
    this.data.writeUInt32LE(this.hr, this.pos); this.pos += 4;
    this.data.writeUInt32LE(this.vr, this.pos); this.pos += 4;
    this.data.writeUInt32LE(this.colors, this.pos); this.pos += 4;
    this.data.writeUInt32LE(this.importantColors, this.pos); this.pos += 4;


    var i = 0;
    var rowBytes = this.extraBytes + this.width * this.bytesInColor;
    let lineArr = [];

    if (this.bitPP === 1) {
        this.data.writeUInt32LE(0x00ffffff, this.pos); this.pos += 4; // Black
        this.data.writeUInt32LE(0x00000000, this.pos); this.pos += 4; // White
        this.pos++;
    }

    // Regular
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            const p = Math.floor(
                this.pos + (this.height - 1 - y) * rowBytes + x * this.bytesInColor
            );
            switch (this.bitPP) {
                case 24:
                    i++; // a, not used
                    this.data[p] = this.buffer[i++]; // b
                    this.data[p + 1] = this.buffer[i++]; // g
                    this.data[p + 2] = this.buffer[i++]; // r

                    break;
                case 1:
                    i++; // a, not used
                    const b = this.buffer[i++];
                    const g = this.buffer[i++];
                    const r = this.buffer[i++];

                    const brightness = r * 0.2126 + g * 0.7152 + b * 0.0722;
                    const pixel = brightness > 127 ? 1 : 0;

                    lineArr.push(brightness > (127 * modify) ? 0 : 1);

                    if ((x + 1) % 8 === 0) {
                        this.data[p - 1] = createInteger(lineArr);
                        lineArr = [];
                    } else if (x === this.width - 1 && lineArr.length > 0) {
                        this.data[p - 1] = createInteger(lineArr) << 4;
                        lineArr = [];
                    }

                    break;
                default:
                    throw new Error('Too lazy to add other depths.');
            }
        }

        // Not necessary?
        /*if (this.extraBytes > 0) {
            var fillOffset = this.pos + y * rowBytes + this.width * 3;
            this.data.fill(0, fillOffset, fillOffset + this.extraBytes);
        }*/
    }
    return this.data;
};

exports.bit1Encoder = function (imgData, modify) {
    var encoder = new BmpEncoder(imgData);
    var data = encoder.encode(modify);
    return {
        data: data,
        width: imgData.width,
        height: imgData.height
    };
};
