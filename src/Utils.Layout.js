import PositionBatch from './Utils.Position.Batch'

const horizontalforward = (position, positions) => {
  var x = 0

  positions.forEach(i => {
    i.x = position.x + x
    x = x + i.w
  })

  return positions
}

const horizontalreverse = (position, positions) => {
  var x = 0

  positions.forEach(i => {
    i.x = position.x + position.w - i.w - x
    x = x + i.w
  })

  return positions
}

const horizontalcenter = (position, positions) => {
  var x = 0
  var w = PositionBatch.add(positions).w

  positions.forEach(i => {
    i.x = position.x + (position.w - w) / 2 + x
    x = x + i.w
  })

  return positions
}

const horizontalaround = (position, positions) => {
  var x = 0
  var w = PositionBatch.add(positions).w

  positions.forEach((i, index) => {
    i.x = position.x + (position.w - w) / (positions.length - 1) * index + x
    x = x + i.w
  })

  return positions
}

const horizontalbetween = (position, positions) => {
  var x = 0
  var w = PositionBatch.add(positions).w

  positions.forEach((i, index) => {
    i.x = position.x + (position.w - w) / (positions.length + 1) * (index + 1) + x
    x = x + i.w
  })

  return positions
}

const horizontalaccommodate = (position, positions) => {
  var x = 0
  var accommodated = false
  var result = []

  positions.forEach(i => {
    if (accommodated === false && (x + i.w < position.w || x + i.w === position.w)) result.push(i)
    if (accommodated === false && (x + i.w < position.w || x + i.w === position.w)) x = x + i.w
    if (x + i.w > position.w) accommodated = true
  })

  return { result: result, rest: positions.filter((i, index) => index > result.length - 1) }
}

const horizontalinfinite = (position, positions, horizontal) => {
  var result = []

  var rest = positions

  while (rest.length) {
    const accommodate = horizontalaccommodate(position, rest)
    result = [...result, horizontal(position, accommodate.result)]
    rest = accommodate.rest
  }

  return { result: result, rest: positions.filter((i, index) => index < result.flat().length - 1) }
}


const verticalforward = (position, positions) => {
  var y = 0

  positions.forEach(i => {
    i.y = position.y + y
    y = y + i.h
  })

  return positions
}

const verticalreverse = (position, positions) => {
  var y = 0

  positions.forEach(i => {
    i.y = position.y + position.h - i.h - y
    y = y + i.h
  })

  return positions
}

const verticalcenter = (position, positions) => {
  var y = 0
  var h = PositionBatch.add(positions).h

  positions.forEach(i => {
    i.y = position.y + (position.h - h) / 2 + y
    y = y + i.h
  })

  return positions
}

const verticalaround = (position, positions) => {
  var y = 0
  var h = PositionBatch.add(positions).h

  positions.forEach((i, index) => {
    i.y = position.y + (position.h - h) / (positions.length - 1) * index + y
    y = y + i.h
  })

  return positions
}

const verticalbetween = (position, positions) => {
  var y = 0
  var h = PositionBatch.add(positions).h

  positions.forEach((i, index) => {
    i.y = position.y + (position.h - h) / (positions.length + 1) * (index + 1) + y
    y = y + i.h
  })

  return positions
}

const verticalaccommodate = (position, positions) => {
  var y = 0
  var accommodated = false
  var result = []

  positions.forEach(i => {
    if (accommodated === false && (y + i.h < position.h || y + i.h === position.h)) result.push(i)
    if (accommodated === false && (y + i.h < position.h || y + i.h === position.h)) y = y + i.h
    if (y + i.y > position.h) accommodated = true
  })

  return { result: result, rest: positions.filter((i, index) => index > result.length - 1) }
}

const verticalinfinite = (position, positions, vertical) => {
  var result = []

  var rest = positions

  while (rest.length) {
    result = [...result, vertical(position, rest).result]
    rest = vertical(position, rest).rest
  }

  return { result: result, rest: positions.filter((i, index) => index < result.flat().length - 1) }
}

const compose = (structure) => {
  const r = []

  structure.layout(structure, structure.positions.map(i => Object({ ...i }))).forEach(i => {
    r.push(i)
    if (structure.postprocess) structure.postprocess(i, structure)
    if (i.layout && i.positions) r.push(...compose(i))
  })

  return r
}

const Layout = { horizontalforward, horizontalreverse, horizontalcenter, horizontalaround, horizontalbetween, horizontalaccommodate, horizontalinfinite, verticalforward, verticalreverse, verticalcenter, verticalaround, verticalbetween, verticalaccommodate, verticalinfinite, compose }

export default Layout