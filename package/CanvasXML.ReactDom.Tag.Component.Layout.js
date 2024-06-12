import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

import ReactDomTag from './CanvasXML.ReactDom.Tag'

import Position from './CanvasXML.Position'

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
  var w = Position.add(unitPositons).w

  unitPositons.forEach(i => {
    i.x = layoutPosition.x + (layoutPosition.w - w) / 2 + x
    x = x + i.w
  })

  return unitPositons
}

const horizontalAround = (layoutPosition, unitPositons) => {
  var x = 0
  var w = Position.add(unitPositons).w

  unitPositons.forEach((i, index) => {
    i.x = layoutPosition.x + (layoutPosition.w - w) / (unitPositons.length - 1) * index + x
    x = x + i.w
  })

  return unitPositons
}

const horizontalBetween = (layoutPosition, unitPositons) => {
  var x = 0
  var w = Position.add(unitPositons).w

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

  return unitPositons
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
  var h = Position.add(unitPositons).h

  unitPositons.forEach(i => {
    i.y = layoutPosition.y + (layoutPosition.h - h) / 2 + y
    y = y + i.h
  })

  return unitPositons
}

const verticalAround = (layoutPosition, unitPositons) => {
  var y = 0
  var h = Position.add(unitPositons).h

  unitPositons.forEach((i, index) => {
    i.y = layoutPosition.y + (layoutPosition.h - h) / (unitPositons.length - 1) * index + y
    y = y + i.h
  })

  return unitPositons
}

const verticalBetween = (layoutPosition, unitPositons) => {
  var y = 0
  var h = Position.add(unitPositons).h

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

const verticalInfinite = (layoutPosition, unitPositons, vertical) => {
  var result = []

  var rest = unitPositons

  while (rest.length) {
    const accommodate = verticalAccommodate(layoutPosition, rest)
    result = [...result, vertical(layoutPosition, accommodate.result)]
    rest = accommodate.rest
  }

  return unitPositons
}


const verticalAlignTop = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.y = layoutPosition.y
  })

  return unitPositons
}

const verticalAlignBottom = (layoutPosition, unitPositons) => {
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

const layoutActions = {
  horizontalForward: horizontalForward,
  horizontalReverse: horizontalReverse,
  horizontalCenter: horizontalCenter,
  horizontalAround: horizontalAround,
  horizontalBetween: horizontalBetween,
  
  horizontalInfiniteForward: (layoutPosition, unitPositons) => horizontalInfinite(layoutPosition, unitPositons, horizontalForward), 
  horizontalInfiniteReverse: (layoutPosition, unitPositons) => horizontalInfinite(layoutPosition, unitPositons, horizontalReverse),
  horizontalInfiniteCenter: (layoutPosition, unitPositons) => horizontalInfinite(layoutPosition, unitPositons, horizontalCenter),
  horizontalInfiniteAround: (layoutPosition, unitPositons) => horizontalInfinite(layoutPosition, unitPositons, horizontalAround),
  horizontalInfiniteBetween: (layoutPosition, unitPositons) => horizontalInfinite(layoutPosition, unitPositons, horizontalBetween),

  horizontalAlignLeft: horizontalAlignLeft,
  horizontalAlignRight: horizontalAlignRight,
  horizontalAlignCenter: horizontalAlignCenter,

  verticalForward: verticalForward,
  verticalReverse: verticalReverse,
  verticalCenter: verticalCenter,
  verticalAround: verticalAround,
  verticalBetween: verticalBetween,

  verticalInfiniteForward: (layoutPosition, unitPositons) => verticalInfinite(layoutPosition, unitPositons, verticalForward), 
  verticalInfiniteReverse: (layoutPosition, unitPositons) => verticalInfinite(layoutPosition, unitPositons, verticalReverse),
  verticalInfiniteCenter: (layoutPosition, unitPositons) => verticalInfinite(layoutPosition, unitPositons, verticalCenter),
  verticalInfiniteAround: (layoutPosition, unitPositons) => verticalInfinite(layoutPosition, unitPositons, verticalAround),
  verticalInfiniteBetween: (layoutPosition, unitPositons) => verticalInfinite(layoutPosition, unitPositons, verticalBetween),

  verticalAlignTop: verticalAlignTop,
  verticalAlignBottom: verticalAlignBottom,
  verticalAlignCenter: verticalAlignCenter,
}

const App = (props) => {
  ReactDomTag.preprocessing(props)

  Object.values(props)
  .filter(i => layoutActions[i])
  .forEach(i => {
    layoutActions[i](
      { x: props.x, y: props.y, w: props.w, h: props.h }, 
      props.children
      .filter(i => i.alternate === 'layout')
      .map(i => i.props))

  })

  props.children.forEach((i,index) => {if (typeof i === 'function') props.children[index] = i({ x: props.x, y: props.y, w: props.w, h: props.h })})

  ReactDomTag.postprocessing(props)

  return result
}

export default App