const horizontalaccommodate = (position, positions) => {
  var x = 0

  var l = []

  positions.forEach(i => {
    if (x + i.w < position.w || x + i.w === position.w) l.push(i)
    if (x + i.w < position.w || x + i.w === position.w) x = x + i.w
  })

  return { result: l, rest: positions.filter((i, index) => index > l.length - 1) }
}

const horizontalforward = (position, positions) => {
  const accommodate = horizontalaccommodate(position, positions)

  var x = 0

  accommodate.result.forEach(i => {
    i.x = position.x + x
    x = x + i.w
  })

  return accommodate
}

const horizontalreverse = (position, positions) => {
  const accommodate = horizontalaccommodate(position, positions)

  var x = 0

  accommodate.result.forEach(i => {
    i.x = position.x + position.w - x
    x = x + i.w
  })

  return accommodate
}

const horizontalcenter = (position, positions) => {
  const accommodate = horizontalaccommodate(position, positions)

  var x = 0
  var w = accommodate.result.reduce((t, i) => t + i.w, 0)

  accommodate.result.forEach(i => {
    i.x = position.x + (position.w - w) / 2 + x
    x = x + i.w
  })

  return accommodate
}

const horizontalaround = (position, positions) => {
  const accommodate = horizontalaccommodate(position, positions)

  var x = 0
  var w = accommodate.result.reduce((t, i) => t + i.w, 0)

  accommodate.result.forEach(i => {
    i.x = position.x + (position.w - w) / (l.length - 1) * index + x
    x = x + i.w
  })

  return accommodate
}

const horizontalbetween = (position, positions) => {
  const accommodate = horizontalaccommodate(position, positions)

  var x = 0
  var w = accommodate.result.reduce((t, i) => t + i.w, 0)

  accommodate.result.forEach(i => {
    i.x = position.x + (position.w - w) / (l.length + 1) * (index + 1) + x
    x = x + i.w
  })

  return accommodate
}


const verticalaccommodate = (position, positions) => {
  var y = 0

  var l = []

  positions.forEach(i => {
    if (y + i.h < position.h || y + i.h === position.h) l.push(i)
    if (y + i.h < position.h || y + i.h === position.h) y = y + i.h
  })

  return { result: l, rest: positions.filter((i, index) => index > l.length - 1) }
}

const verticalforward = (position, positions) => {
  const accommodate = verticalaccommodate(position, positions)

  var y = 0

  accommodate.result.forEach(i => {
    i.y = position.y + y
    y = y + i.h
  })

  return accommodate
}

const verticalreverse = (position, positions) => {
  const accommodate = verticalaccommodate(position, positions)

  var y = 0

  accommodate.result.forEach(i => {
    i.y = position.y + position.h - y
    y = y + i.h
  })

  return accommodate
}

const verticalcenter = (position, positions) => {
  const accommodate = verticalaccommodate(position, positions)

  var y = 0
  var h = accommodate.result.reduce((t, i) => t + i.h, 0)

  accommodate.result.forEach(i => {
    i.y = position.y + (position.h - h) / 2 + y
    y = y + i.h
  })

  return accommodate
}

const verticalaround = (position, positions) => {
  const accommodate = verticalaccommodate(position, positions)

  var y = 0
  var h = accommodate.result.reduce((t, i) => t + i.h, 0)

  accommodate.result.forEach(i => {
    i.y = position.y + (position.h - h) / (l.length - 1) * index + y
    y = y + i.h
  })

  return accommodate
}

const verticalbetween = (position, positions) => {
  const accommodate = verticalaccommodate(position, positions)

  var y = 0
  var h = accommodate.result.reduce((t, i) => t + i.h, 0)

  accommodate.result.forEach(i => {
    i.y = position.y + (position.h - h) / (l.length + 1) * (index + 1) + y
    y = y + i.h
  })

  return accommodate
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

const Layout = { horizontalaccommodate, horizontalforward, horizontalreverse, horizontalcenter, horizontalaround, horizontalbetween, verticalforward, verticalreverse, verticalcenter, verticalaround, verticalbetween }

export default Layout