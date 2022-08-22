// Generate preview.png

const fs = require('fs');


fs.writeFileSync('preview.html', `<html>
<head>

</head>

<body>
<canvas id="canvas" width="400" height="200"></canvas>
<script>
const helper = document.createElement('canvas');
helper.setAttribute('width', '22');
helper.setAttribute('height', '22');
const helperCtx = helper.getContext('2d');
function getCanvas(path) {
    helperCtx.fillStyle = '#B1AEA7';
    helperCtx.fillRect(0, 0, 22, 22);
    helperCtx.fillStyle = '#322F28';
    const p = new Path2D(path);
    ctx.fill(p);
    return helper;
}
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#B1AEA7';
ctx.fillRect(0, 0, 200, 200);

ctx.fillStyle = '#322F28';
const path = 'M20 20H2V19H1V15H2V13H3V11H4V9H5V7H6V5H7V3H8V2H14V3H15V5H16V7H17V9H18V11H19V13H20V15H21V19H20V20M9 6H8V8H7V10H6V12H5V14H4V16H3V18H19V16H18V14H17V12H16V10H15V8H14V6H13V4H9V6M10 7H12V13H10V7M10 14H12V16H10V14Z';
ctx.drawImage(getCanvas(path), 22, 22);
</script>
</body>

</html>`)