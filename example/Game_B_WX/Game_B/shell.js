const fs = require('fs');
const path = require('path');

const ds = fs.readdirSync(path.resolve(__dirname, './'))

ds.forEach(i => {
  if(i.includes('App.Scene.Playground')) {
    fs.renameSync(path.resolve(__dirname, './' + i), path.resolve(__dirname, './' + i.replace('App.Scene.Playground', 'App.Scene.Playground')))
  }
})