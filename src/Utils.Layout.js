const rowleft = (position, positions) => {
  var x = 0

  var l = []

  positions.forEach(i => {
    if (x + i.w < position || x + i.w === position) {
      rc.push(Object({ ...i, x: position.x + t.x, y: position.y }))
      x = x + i.w
    }
  })

  return { position: l, rest: position.filter((i, index) => index > l.length - 1) }
}

const rowright = (position, positions) => {
  var x = 0

  var l = []

  positions.forEach(i => {
    if (x + i.w < position || x + i.w === position) {
      rc.push(Object({ ...i, x: position.x + position.w - t.x, y: position.y }))
      x = x + i.w
    }
  })

  return { position: rl, rest: position.filter((i, index) => index > rl.length - 1) }
}


const rowcenter = (position, positions) => {
  var x = 0

  var l = []

  positions.forEach(i => {
    if (x + i.w < position || x + i.w === position) {
      rc.push(Object({ ...i, x: position.x + position.w - t.x, y: position.y }))
      x = x + i.w
    }
  })

  return { position: rl, rest: position.filter((i, index) => index > rl.length - 1) }
}


const gridrow = (position, positions) => {
  var rx = 0
  var ry = 0

  var rl = []
  var rc = []

  positions.forEach(i => {
    if (rx + i.w > position.w) {
      rl.push(...rc)
      rx = i.w
      ry = ry + Math.max(...rc.map(i => i.h))
      rc = []
      rc.push(Object({ ...i, x: position.x + t.x, y: position.y }))
    }
    if (rx + i.w < position.w || rx + i.w === position.w) {
      rc.push(Object({ ...i, x: position.x + t.x, y: position.y }))
      rx = rx + i.w
    }
  })

  rl.push(...rc)

  return rl
}

const Layout = { add, center, centered, pointcover, coordinate, min, max }

export default Layout