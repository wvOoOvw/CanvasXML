const fs = require("fs");
const path = require("path");

const filename = fs.readdirSync(__dirname)

console.log(filename)

filename.forEach(i => {
    const newFilename = i.replace("ReactCanvas2d", "ReactCanvas2d");
    fs.renameSync(path.join(__dirname, i), path.join(__dirname, newFilename));
})