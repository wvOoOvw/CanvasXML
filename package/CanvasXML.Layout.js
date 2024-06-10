import Position from './CanvasXML.Position'
import PositionBatch from './CanvasXML.Position.Batch'

const horizontalForward = (layoutPosition, unitPositons) => {
  var x = 0

  unitPositons.forEach(i => {
    i.x = layoutPosition.x + x
    x = x + i.w
  })

  return unitPositons
}

const horizontalReverse = (layoutPosition, unitPositons) => {
  var x = 0

  unitPositons.forEach(i => {
    i.x = layoutPosition.x + layoutPosition.w - i.w - x
    x = x + i.w
  })

  return unitPositons
}

const horizontalCenter = (layoutPosition, unitPositons) => {
  var x = 0
  var w = PositionBatch.add(unitPositons).w

  unitPositons.forEach(i => {
    i.x = layoutPosition.x + (layoutPosition.w - w) / 2 + x
    x = x + i.w
  })

  return unitPositons
}

const horizontalAround = (layoutPosition, unitPositons) => {
  var x = 0
  var w = PositionBatch.add(unitPositons).w

  unitPositons.forEach((i, index) => {
    i.x = layoutPosition.x + (layoutPosition.w - w) / (unitPositons.length - 1) * index + x
    x = x + i.w
  })

  return unitPositons
}

const horizontalBetween = (layoutPosition, unitPositons) => {
  var x = 0
  var w = PositionBatch.add(unitPositons).w

  unitPositons.forEach((i, index) => {
    i.x = layoutPosition.x + (layoutPosition.w - w) / (unitPositons.length + 1) * (index + 1) + x
    x = x + i.w
  })

  return unitPositons
}

const horizontalAccommodate = (layoutPosition, unitPositons) => {
  var x = 0
  var accommodated = false
  var result = []

  unitPositons.forEach(i => {
    if (accommodated === false && (x + i.w < layoutPosition.w || x + i.w === layoutPosition.w)) result.push(i)
    if (accommodated === false && (x + i.w < layoutPosition.w || x + i.w === layoutPosition.w)) x = x + i.w
    if (x + i.w > layoutPosition.w) accommodated = true
  })

  return { result: result, rest: unitPositons.filter((i, index) => index > result.length - 1) }
}

const horizontalInfinite = (layoutPosition, unitPositons, horizontal) => {
  var result = []

  var rest = unitPositons

  while (rest.length) {
    const accommodate = horizontalAccommodate(layoutPosition, rest)
    result = [...result, horizontal(layoutPosition, accommodate.result)]
    rest = accommodate.rest
  }

  return { result: result, rest: unitPositons.filter((i, index) => index < result.flat().length - 1) }
}

const horizontalAlignLeft = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.x = layoutPosition.x
  })

  return unitPositons
}

const horizontalAlignRight = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.x = layoutPosition.x + layoutPosition.w
  })

  return unitPositons
}

const horizontalAlignCenter = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.x = layoutPosition.x + (layoutPosition.w - i.w) / 2
  })

  return unitPositons
}


const verticalForward = (layoutPosition, unitPositons) => {
  var y = 0

  unitPositons.forEach(i => {
    i.y = layoutPosition.y + y
    y = y + i.h
  })

  return unitPositons
}

const verticalReverse = (layoutPosition, unitPositons) => {
  var y = 0

  unitPositons.forEach(i => {
    i.y = layoutPosition.y + layoutPosition.h - i.h - y
    y = y + i.h
  })

  return unitPositons
}

const verticalCenter = (layoutPosition, unitPositons) => {
  var y = 0
  var h = PositionBatch.add(unitPositons).h

  unitPositons.forEach(i => {
    i.y = layoutPosition.y + (layoutPosition.h - h) / 2 + y
    y = y + i.h
  })

  return unitPositons
}

const verticalAround = (layoutPosition, unitPositons) => {
  var y = 0
  var h = PositionBatch.add(unitPositons).h

  unitPositons.forEach((i, index) => {
    i.y = layoutPosition.y + (layoutPosition.h - h) / (unitPositons.length - 1) * index + y
    y = y + i.h
  })

  return unitPositons
}

const verticalBetween = (layoutPosition, unitPositons) => {
  var y = 0
  var h = PositionBatch.add(unitPositons).h

  unitPositons.forEach((i, index) => {
    i.y = layoutPosition.y + (layoutPosition.h - h) / (unitPositons.length + 1) * (index + 1) + y
    y = y + i.h
  })

  return unitPositons
}

const verticalAccommodate = (layoutPosition, unitPositons) => {
  var y = 0
  var accommodated = false
  var result = []

  unitPositons.forEach(i => {
    if (accommodated === false && (y + i.h < layoutPosition.h || y + i.h === layoutPosition.h)) result.push(i)
    if (accommodated === false && (y + i.h < layoutPosition.h || y + i.h === layoutPosition.h)) y = y + i.h
    if (y + i.y > layoutPosition.h) accommodated = true
  })

  return { result: result, rest: unitPositons.filter((i, index) => index > result.length - 1) }
}

const verticalInfinite = (layoutPosition, unitPositons, verticalt) => {
  var result = []

  var rest = unitPositons

  while (rest.length) {
    result = [...result, verticalt(layoutPosition, rest).result]
    rest = verticalt(layoutPosition, rest).rest
  }

  return { result: result, rest: unitPositons.filter((i, index) => index < result.flat().length - 1) }
}

const verticalAlignLeft = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.y = layoutPosition.y
  })

  return unitPositons
}

const verticalAlignRight = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.y = layoutPosition.y + layoutPosition.h
  })

  return unitPositons
}

const verticalAlignCenter = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.y = layoutPosition.y + (layoutPosition.h - i.h) / 2
  })

  return unitPositons
}


const layout = (structure) => {
  const r = []

  if (typeof structure.tag === 'function') structure.tag({ ...structure, layoutProcess: undefined, preprocess: undefined, postprocess: undefined })
  if (typeof structure.tag === 'string' && structure.tag === 'layout' && structure.component) structure.component({ ...structure, layoutProcess: undefined, preprocess: undefined, postprocess: undefined })

  if (structure.children) {
    const children = structure.children.map(i => typeof i === 'function' ? i(structure.position) : i)

    children.filter(i => typeof i.position === 'function').forEach(i => i.position = i.position(structure.position))

    children.filter(i => i.preprocess).forEach(i => i.preprocess.forEach(i => i(structure.position, children.map(i => i.position), i.position)))

    if (structure.layoutProcess) structure.layoutProcess.forEach(i => i(structure.position, children.map(i => i.position)))

    children.filter(i => i.postprocess).forEach(i => i.postprocess.forEach(i => i(structure.position, children.map(i => i.position), i.position)))

    children.forEach(i => r.push(...layout(i)))
  }

  r.push({ ...structure, layoutProcess: undefined, preprocess: undefined, postprocess: undefined })

  return r
}

const layoutReactBabelCreateElement = (tag, props, ...children) => ({ ...props, tag: tag, children: children.filter(i => i).flat() })

const layoutProcessCopy = (keys) => (layoutPosition, unitPositons) => unitPositons.forEach(i => keys.forEach(key => i[key] = layoutPosition[key]))

const layoutProcessCoordinate = (layoutPosition, unitPositons) => unitPositons.forEach(i => Object.assign(i, Position.coordinate(i)))

const Layout = { horizontalForward, horizontalReverse, horizontalCenter, horizontalAround, horizontalBetween, horizontalAccommodate, horizontalInfinite, horizontalAlignLeft, horizontalAlignRight, horizontalAlignCenter, verticalForward, verticalReverse, verticalCenter, verticalAround, verticalBetween, verticalAccommodate, verticalInfinite, verticalAlignLeft, verticalAlignCenter, verticalAlignRight, layout, layoutReactBabelCreateElement, layoutProcessCopy, layoutProcessCoordinate }

export default Layout