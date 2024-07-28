const fs = require("fs");
const path = require("path");

const sourceFilePath = path.join(__dirname, "./");

fs.readdir(sourceFilePath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach((file) => {
    const sourceFilePath = path.join(__dirname, file);
    const targetFilePath = path.join(
      __dirname,
      file.replace(/Module/g, "X")
    );
    fs.rename(sourceFilePath, targetFilePath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
});
