import Position from './Utils.Position'

const horizontalforward = (position, positions) => {
  var x = 0

  positions.result.forEach(i => {
    i.x = position.x + x
    x = x + i.w
  })

  return positions
}

const horizontalreverse = (position, positions) => {
  var x = 0

  positions.result.forEach(i => {
    i.x = position.x + position.w - x
    x = x + i.w
  })

  return positions
}

const horizontalcenter = (position, positions) => {
  var x = 0
  var w = Position.add(positions.result).w

  positions.result.forEach(i => {
    i.x = position.x + (position.w - w) / 2 + x
    x = x + i.w
  })

  return positions
}

const horizontalaround = (position, positions) => {
  var x = 0
  var w = Position.add(positions.result).w

  positions.result.forEach((i, index) => {
    i.x = position.x + (position.w - w) / (positions.result.length - 1) * index + x
    x = x + i.w
  })

  return positions
}

const horizontalbetween = (position, positions) => {
  var x = 0
  var w = Position.add(positions.result).w

  positions.result.forEach((i, index) => {
    i.x = position.x + (position.w - w) / (positions.result.length + 1) * (index + 1) + x
    x = x + i.w
  })

  return positions
}

const horizontalaccommodate = (position, positions) => {
  var result = []

  var x = 0

  positions.forEach(i => {
    if (x + i.w < position.w || x + i.w === position.w) result.push(i)
    if (x + i.w < position.w || x + i.w === position.w) x = x + i.w
  })

  return { result: result, rest: positions.filter((i, index) => index > result.length - 1) }
}

const horizontalinfinite = (position, positions, horizontal) => {
  var result = []

  var rest = positions

  while (rest.length) {
    result = [...result, horizontal(position, rest).result]
    rest = horizontal(position, rest).rest
  }

  return { result: result, rest: positions.filter((i, index) => index < result.flat().length - 1) }
}


const verticalforward = (position, positions) => {
  var y = 0

  positions.result.forEach(i => {
    i.y = position.y + y
    y = y + i.h
  })

  return positions
}

const verticalreverse = (position, positions) => {
  var y = 0

  positions.result.forEach(i => {
    i.y = position.y + position.h - y
    y = y + i.h
  })

  return positions
}

const verticalcenter = (position, positions) => {
  var y = 0
  var h = Position.add(positions.result).h

  positions.result.forEach(i => {
    i.y = position.y + (position.h - h) / 2 + y
    y = y + i.h
  })

  return positions
}

const verticalaround = (position, positions) => {
  var y = 0
  var h = Position.add(positions.result).h

  positions.result.forEach((i, index) => {
    i.y = position.y + (position.h - h) / (positions.result.length - 1) * index + y
    y = y + i.h
  })

  return positions
}

const verticalbetween = (position, positions) => {
  var y = 0
  var h = Position.add(positions.result).h

  positions.result.forEach((i, index) => {
    i.y = position.y + (position.h - h) / (positions.result.length + 1) * (index + 1) + y
    y = y + i.h
  })

  return positions
}

const verticalaccommodate = (position, positions) => {
  var result = []

  var y = 0

  positions.forEach(i => {
    if (y + i.h < position.h || y + i.h === position.h) result.push(i)
    if (y + i.h < position.h || y + i.h === position.h) y = y + i.h
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


const compose = (position, positions, layout) => {
  var dimension = []
  var box = []

  var l = positions

  while (l.length) {
    const c = layout[0](position, l)
    dimension.push(c.result)
    box.push({ w: Math.max(...c.result.map(i => i.w)), h: Math.max(...c.result.map(i => i.h)) })
    l = c.rest
  }

  box = layout[1](position, box).result

  dimension.forEach((i, index) => {
    i.forEach(i => {
      if (i.x === undefined) i.x = box[index].x
      if (i.y === undefined) i.y = box[index].y
    })
  })

  dimension = dimension.flat()

  return { result: dimension, rest: positions.filter((i, index) => index < dimension.length - 1) }
}

const composecross = (position, positions, layout) => {
  var dimension = []
  var box = []

  var l = positions

  while (l.length) {
    const c = layout[0](position, l)
    dimension.push(c.result)
    box.push({ w: Math.max(...c.result.map(i => i.w)), h: Math.max(...c.result.map(i => i.h)) })
    l = c.rest
  }

  box = layout[1](position, box).result

  dimension.forEach((i, index) => {
    i.forEach(i => {
      if (i.x === undefined) i.x = box[index].x
      if (i.y === undefined) i.y = box[index].y
    })
  })

  dimension = dimension.flat()

  return { result: dimension, rest: positions.filter((i, index) => index < dimension.length - 1) }
}

const Layout = { horizontalforward, horizontalreverse, horizontalcenter, horizontalaround, horizontalbetween, horizontalaccommodate, horizontalinfinite, verticalforward, verticalreverse, verticalcenter, verticalaround, verticalbetween, verticalaccommodate, verticalinfinite, composecross }

export default Layout