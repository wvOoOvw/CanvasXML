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
    i.y = position.y

    x = x + i.w
  })

  return accommodate
}

const horizontalreverse = (position, positions) => {
  const accommodate = horizontalaccommodate(position, positions)

  var x = 0

  accommodate.result.forEach(i => {
    i.x = position.x + position.w - x
    i.y = position.y

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
    i.y = position.y

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
    i.y = position.y

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
    i.y = position.y

    x = x + i.w
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

const Layout = { horizontalaccommodate, horizontalforward, horizontalreverse, horizontalcenter, horizontalaround, horizontalbetween }

export default Layout