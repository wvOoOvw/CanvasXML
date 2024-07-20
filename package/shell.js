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
    
  while ((match = regex.exec(data)) !== null) {  
    const functionName = match[2];  
    const newFilePath = path.join(__dirname, `./CanvasXML.ReactCanvas2d.Plugin.${functionName}.js`);  
    fs.writeFile(newFilePath, '', (err) => {  
      if (err) {  
        console.error(err);  
      } else {  
        console.log(`File ${newFilePath} created.`);  
      }  
    });  
  }  
});