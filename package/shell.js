const fs = require('fs');
const path = require('path');

const sourceFilePath = path.join(__dirname, './CanvasXML.ReactCanvas2d.Plugin.js');

fs.readFile(sourceFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const regex = /\b(const|function)\s+(\w+)\s*=\s*[\(=>{]/g;
  let match;

  const s = []

  while ((match = regex.exec(data)) !== null) {
    const functionName = match[2];
    s.push(`import ${functionName} from './CanvasXML.ReactCanvas2d.Plugin.${functionName}'`)
  }

  console.log(s.join('\n'))
});