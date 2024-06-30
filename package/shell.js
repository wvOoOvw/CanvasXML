const fs = require('fs');
const path = require('path');

const filename = fs.readdirSync(__dirname)

console.log(filename)

filename.forEach(i => {
    const newFilename = i.replace('CanvasXML.ReactCanvas2d.Tag.', 'CanvasXML.Canvas2d.Tag.');
    fs.renameSync(path.join(__dirname, i), path.join(__dirname, newFilename));
})