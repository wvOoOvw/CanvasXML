const horizontal = (position, positions) => {
  var x = 0

  var l = []

  positions.forEach(i => {
    console.log(i, position)
    if (x + i.w < position.w || x + i.w === position.w) {
      l.push(Object({ ...i, x: position.x + x, y: position.y }))
      x = x + i.w
    }
  })

  return { result: l, rest: positions.filter((i, index) => index > l.length - 1) }
}

const horizontalreverse = (position, positions) => {
  var x = 0

  var l = []

  positions.forEach(i => {
    if (x + i.w < position.w || x + i.w === position.w) {
      l.push(Object({ ...i, x: position.x + position.w - x, y: position.y }))
      x = x + i.w
    }
  })

  return { result: l, rest: positions.filter((i, index) => index > l.length - 1) }
}

const horizontalcenter = (position, positions) => {
  var x = 0

  var l = []

  positions.forEach(i => {
    if (x + i.w < position.w || x + i.w === position.w) {
      l.push(Object({ ...i, y: position.y }))
      x = x + i.w
    }
  })

  var tw = l.reduce((t, i) => t + i.w, 0)

  var tx = 0

  l.forEach(i => {
    i.x = position.x + (position.w - tw) / 2 + tx
    tx = tx + i.w
  })

  return { result: l, rest: positions.filter((i, index) => index > l.length - 1) }
}

const horizontalaround = (position, positions) => {
  var x = 0

  var l = []

  positions.forEach(i => {
    if (x + i.w < position.w || x + i.w === position.w) {
      l.push(Object({ ...i, y: position.y }))
      x = x + i.w
    }
  })

  var tw = l.reduce((t, i) => t + i.w, 0)

  var tx = 0

  l.forEach((i, index) => {
    i.x = position.x + (position.w - tw) / (l.length - 1) * index + tx
    tx = tx + i.w
  })

  return { result: l, rest: positions.filter((i, index) => index > l.length - 1) }
}

const horizontalbetween = (position, positions) => {
  var x = 0

  var l = []

  positions.forEach(i => {
    if (x + i.w < position.w || x + i.w === position.w) {
      l.push(Object({ ...i, y: position.y }))
      x = x + i.w
    }
  })

  var tw = l.reduce((t, i) => t + i.w, 0)

  var tx = 0

  l.forEach((i, index) => {
    i.x = position.x + (position.w - tw) / (l.length + 1) * (index + 1) + tx
    tx = tx + i.w
  })

  return { result: l, rest: positions.filter((i, index) => index > l.length - 1) }
}

// const gridrow = (position, positions) => {
//   var rx = 0
//   var ry = 0

//   var rl = []
//   var rc = []

//   positions.forEach(i => {
//     if (rx + i.w > position.w) {
//       rl.push(...rc)
//       rx = i.w
//       ry = ry + Math.max(...rc.map(i => i.h))
//       rc = []
//       rc.push(Object({ ...i, x: position.x + t.x, y: position.y }))
//     }
//     if (rx + i.w < position.w || rx + i.w === position.w) {
//       rc.push(Object({ ...i, x: position.x + t.x, y: position.y }))
//       rx = rx + i.w
//     }
//   })

//   rl.push(...rc)

//   return rl
// }

const Layout = { horizontal, horizontalreverse, horizontalcenter, horizontalaround, horizontalbetween }

export default Layout