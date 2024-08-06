const fs = require('fs');
const path = require('path');

const ds = fs.readdirSync(path.resolve(__dirname, './'))

ds.forEach(i => {
  if(i.includes('Plugin.use')) {
    fs.renameSync(path.resolve(__dirname, './' + i), path.resolve(__dirname, './' + i.replace('.use', '.Use')))
  }
})