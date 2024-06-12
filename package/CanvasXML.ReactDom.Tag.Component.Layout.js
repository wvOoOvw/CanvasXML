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


const infiniteHorizontal = (layoutPosition, unitPositons, layoutActionOuter, layoutActionInner, layoutAlignActionOuter, layoutAlignActionInner) => {
  var accommodateResult = []

  var accommodateRest = unitPositons

  while (accommodateRest.length) {
    const accommodate = horizontalAccommodate(layoutPosition, accommodateRest)
    accommodateResult = [...accommodateResult, accommodate.result]
    accommodateRest = accommodate.rest
  }

  if(layoutActionOuter) layoutActionOuter(layoutPosition, accommodateResult.map(i => Position.box(i))).forEach((i,index) => accommodateResult[index].forEach(a => a.y = i.y))
  if(layoutActionInner) accommodateResult.forEach(i => layoutActionInner(Position.box(i), i))

  if(layoutAlignActionOuter) layoutAlignActionOuter(layoutPosition, accommodateResult.map(i => Position.box(i))).forEach((i,index) => accommodateResult[index].forEach(a => a.x = i.x))
  if(layoutAlignActionInner) accommodateResult.forEach(i => layoutAlignActionInner(Position.box(i), i))

  return unitPositons
}


const infiniteVertical = (layoutPosition, unitPositons, layoutActionOuter, layoutActionInner, layoutAlignActionOuter, layoutAlignActionInner) => {
  var accommodateResult = []

  var accommodateRest = unitPositons

  while (accommodateRest.length) {
    const accommodate = verticalAccommodate(layoutPosition, accommodateRest)
    accommodateResult = [...accommodateResult, accommodate.result]
    accommodateRest = accommodate.rest
  }

  if(layoutActionOuter) layoutActionOuter(layoutPosition, accommodateResult.map(i => Position.box(i))).forEach((i,index) => accommodateResult[index].forEach(a => a.x = i.x))
  if(layoutActionInner) accommodateResult.forEach(i => layoutActionInner(Position.box(i), i))
    
  if(layoutAlignActionOuter) layoutAlignActionOuter(layoutPosition, accommodateResult.map(i => Position.box(i))).forEach((i,index) => accommodateResult[index].forEach(a => a.x = i.x))
  if(layoutAlignActionInner) accommodateResult.forEach(i => layoutAlignActionInner(Position.box(i), i))

  return unitPositons
}

const infinite = (layoutPosition, unitPositons, layoutActionOuter, layoutActionInner, layoutAlignActionOuter, layoutAlignActionInner, type) => {
  if (type === 'horizontal') infiniteHorizontal(layoutPosition, unitPositons, layoutActionOuter, layoutActionInner, layoutAlignActionOuter, layoutAlignActionInner)
  if (type === 'vertical') infiniteVertical(layoutPosition, unitPositons, layoutActionOuter, layoutActionInner, layoutAlignActionOuter, layoutAlignActionInner)
}

const App = (props) => {
  ReactDomTag.preprocessing(props)

  const layoutChildrenProps = props.children.filter((i) => i.alternate === 'layout').map((i) => i.props)

  if (props.infinite !== undefined && props.infinite === 'horizontal') {
    infinite(
      { x: props.x, y: props.y, w: props.w, h: props.h }, 
      layoutChildrenProps, 
      props.horizontalForward || props.horizontalReverse || props.horizontalCenter || props.horizontalAround || props.horizontalAround || props.horizontalBetween,
      props.verticalForward || props.verticalReverse || props.verticalCenter || props.verticalAround || props.verticalAround || props.verticalBetween,
      props.verticalAlignLeft || props.verticalAlignRight || props.verticalAlignCenter,
      props.horizontalAlignLeft || props.horizontalAlignRight || props.horizontalAlignCenter,
    )
  }

  if (props.infinite !== undefined && props.infinite === 'vertical') {
    infinite(
      { x: props.x, y: props.y, w: props.w, h: props.h }, 
      layoutChildrenProps, 
      props.verticalForward || props.verticalReverse || props.verticalCenter || props.verticalAround || props.verticalAround || props.verticalBetween,
      props.horizontalForward || props.horizontalReverse || props.horizontalCenter || props.horizontalAround || props.horizontalAround || props.horizontalBetween,
      props.horizontalAlignLeft || props.horizontalAlignRight || props.horizontalAlignCenter,
      props.verticalAlignTop || props.verticalAlignBottom || props.verticalAlignCenter,
    )
  }

  if (props.infinite === undefined) {
    Object.values(props).forEach((i) => { 
      if(i === 'horizontalForward') horizontalForward({ x: props.x, y: props.y, w: props.w, h: props.h }, layoutChildrenProps)
      if(i === 'horizontalReverse') horizontalReverse({ x: props.x, y: props.y, w: props.w, h: props.h }, layoutChildrenProps)
      if(i === 'horizontalCenter') horizontalCenter({ x: props.x, y: props.y, w: props.w, h: props.h }, layoutChildrenProps)
      if(i === 'horizontalAround') horizontalAround({ x: props.x, y: props.y, w: props.w, h: props.h }, layoutChildrenProps)
      if(i === 'horizontalBetween') horizontalBetween({ x: props.x, y: props.y, w: props.w, h: props.h }, layoutChildrenProps)
      if(i === 'horizontalAlignLeft') horizontalAlignLeft({ x: props.x, y: props.y, w: props.w, h: props.h }, layoutChildrenProps)
      if(i === 'horizontalAlignRight') horizontalAlignRight({ x: props.x, y: props.y, w: props.w, h: props.h }, layoutChildrenProps)
      if(i === 'horizontalAlignCenter') horizontalAlignCenter({ x: props.x, y: props.y, w: props.w, h: props.h }, layoutChildrenProps)
      if(i === 'verticalForward') verticalForward({ x: props.x, y: props.y, w: props.w, h: props.h }, layoutChildrenProps)
      if(i === 'verticalReverse') verticalReverse({ x: props.x, y: props.y, w: props.w, h: props.h }, layoutChildrenProps)
      if(i === 'verticalCenter') verticalCenter({ x: props.x, y: props.y, w: props.w, h: props.h }, layoutChildrenProps)
      if(i === 'verticalAround') verticalAround({ x: props.x, y: props.y, w: props.w, h: props.h }, layoutChildrenProps)
      if(i === 'verticalBetween') verticalBetween({ x: props.x, y: props.y, w: props.w, h: props.h }, layoutChildrenProps)
      if(i === 'verticalAlignTop') verticalAlignTop({ x: props.x, y: props.y, w: props.w, h: props.h }, layoutChildrenProps)
      if(i === 'verticalAlignBottom') verticalAlignBottom({ x: props.x, y: props.y, w: props.w, h: props.h }, layoutChildrenProps)
      if(i === 'verticalAlignCenter') verticalAlignCenter({ x: props.x, y: props.y, w: props.w, h: props.h }, layoutChildrenProps)
    })
  }

  props.children.forEach((i,index) => {if (typeof i === 'function') props.children[index] = i({ x: props.x, y: props.y, w: props.w, h: props.h })})

  ReactDomTag.postprocessing(props)

  return result
}

export default App