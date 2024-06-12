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

const verticalInfinite = (layoutPosition, unitPositons, verticalt) => {
  var result = []

  var rest = unitPositons

  while (rest.length) {
    result = [...result, verticalt(layoutPosition, rest).result]
    rest = verticalt(layoutPosition, rest).rest
  }

  return { result: result, rest: unitPositons.filter((i, index) => index < result.flat().length - 1) }
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


const horizontalRun = (props) => {
  if (Boolean(props.horizontalAccommodate) === true) {
    const accommodate = horizontalAccommodate(props, props.children.map(i => i.props)).result
    props.children = props.children.filter((i, index) => index < accommodate.length)
  }

  if (Boolean(props.horizontalInfinite) === false && props.horizontal === 'forward') horizontalForward(props, props.children.map(i => i.props))
  if (Boolean(props.horizontalInfinite) === false && props.horizontal === 'reverse') horizontalReverse(props, props.children.map(i => i.props))
  if (Boolean(props.horizontalInfinite) === false && props.horizontal === 'center') horizontalCenter(props, props.children.map(i => i.props))
  if (Boolean(props.horizontalInfinite) === false && props.horizontal === 'around') horizontalAround(props, props.children.map(i => i.props))
  if (Boolean(props.horizontalInfinite) === false && props.horizontal === 'between') horizontalBetween(props, props.children.map(i => i.props))

  if (Boolean(props.horizontalInfinite) === true && props.horizontal === 'forward') horizontalInfinite(props, props.children.map(i => i.props), horizontalForward)
  if (Boolean(props.horizontalInfinite) === true && props.horizontal === 'reverse') horizontalInfinite(props, props.children.map(i => i.props), horizontalReverse)
  if (Boolean(props.horizontalInfinite) === true && props.horizontal === 'center') horizontalInfinite(props, props.children.map(i => i.props), horizontalCenter)
  if (Boolean(props.horizontalInfinite) === true && props.horizontal === 'around') horizontalInfinite(props, props.children.map(i => i.props), horizontalAround)
  if (Boolean(props.horizontalInfinite) === true && props.horizontal === 'between') horizontalInfinite(props, props.children.map(i => i.props), horizontalBetween)
}

const verticalRun = (props) => {
  if (Boolean(props.verticalAccommodate) === true) {
    const accommodate = verticalAccommodate(props, props.children.map(i => i.props)).result
    props.children = props.children.filter((i, index) => index < accommodate.length)
  }

  if (Boolean(props.verticalInfinite) === false && props.vertical === 'forward') verticalForward(props, props.children.map(i => i.props))
  if (Boolean(props.verticalInfinite) === false && props.vertical === 'reverse') verticalReverse(props, props.children.map(i => i.props))
  if (Boolean(props.verticalInfinite) === false && props.vertical === 'center') verticalCenter(props, props.children.map(i => i.props))
  if (Boolean(props.verticalInfinite) === false && props.vertical === 'around') verticalAround(props, props.children.map(i => i.props))
  if (Boolean(props.verticalInfinite) === false && props.vertical === 'between') verticalBetween(props, props.children.map(i => i.props))

  if (Boolean(props.verticalInfinite) === true && props.vertical === 'forward') verticalInfinite(props, props.children.map(i => i.props), verticalForward)
  if (Boolean(props.verticalInfinite) === true && props.vertical === 'reverse') verticalInfinite(props, props.children.map(i => i.props), verticalReverse)
  if (Boolean(props.verticalInfinite) === true && props.vertical === 'center') verticalInfinite(props, props.children.map(i => i.props), verticalCenter)
  if (Boolean(props.verticalInfinite) === true && props.vertical === 'around') verticalInfinite(props, props.children.map(i => i.props), verticalAround)
  if (Boolean(props.verticalInfinite) === true && props.vertical === 'between') verticalInfinite(props, props.children.map(i => i.props), verticalBetween)
}

const horizontalAlignRun = (props) => {
  if (props.horizontalAlign === 'left') horizontalAlignLeft(props, props.children.map(i => i.props))
  if (props.horizontalAlign === 'right') horizontalAlignRight(props, props.children.map(i => i.props))
  if (props.horizontalAlign === 'center') horizontalAlignCenter(props, props.children.map(i => i.props))
}

const verticalAlignRun = (props) => {
  if (props.verticalAlign === 'top') verticalAlignTop(props, props.children.map(i => i.props))
  if (props.verticalAlign === 'bottom') verticalAlignBottom(props, props.children.map(i => i.props))
  if (props.verticalAlign === 'center') verticalAlignCenter(props, props.children.map(i => i.props))
}

const flow = (props) => {
  props.flow.forEach(i => {
    if (i === 'horizontal') horizontalRun(props)
    if (i === 'vertical') verticalRun(props)
    if (i === 'horizontalAlign') horizontalAlignRun(props)
    if (i === 'verticalAlign') verticalAlignRun(props)
  })
}

const App = (props) => {
  ReactDomTag.preprocessing(props)

  if (typeof props.children === 'object' && props.children.every(i => i.alternate === 'layout') && props.flow) {
    flow(props)
  }

  ReactDomTag.postprocessing(props)

  const result = props.children.map(i => {
    if (typeof i === 'function') {
      return i({ x: props.x, y: props.y, w: props.w, h: props.h })
    }
    if (typeof i === 'object') {
      return i
    }
  })

  return result
}

export default App