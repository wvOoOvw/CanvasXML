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


const maps = {
  horizontalForward: horizontalForward,
  horizontalReverse: horizontalReverse,
  horizontalCenter: horizontalCenter,
  horizontalAround: horizontalAround,
  horizontalBetween: horizontalBetween,
  horizontalAlignLeft: horizontalAlignLeft,
  horizontalAlignRight: horizontalAlignRight,
  horizontalAlignCenter: horizontalAlignCenter,
  verticalForward: verticalForward,
  verticalReverse: verticalReverse,
  verticalCenter: verticalCenter,
  verticalAround: verticalAround,
  verticalBetween: verticalBetween,
  verticalAlignTop: verticalAlignTop,
  verticalAlignBottom: verticalAlignBottom,
  verticalAlignCenter: verticalAlignCenter,
}

const wrapHorizontal = (layoutPosition, unitPositons, layoutActionOuter, layoutAlignInner) => {
  var accommodateResult = []

  var accommodateRest = unitPositons

  while (accommodateRest.length) {
    const accommodate = horizontalAccommodate(layoutPosition, accommodateRest)
    accommodateResult = [...accommodateResult, accommodate.result]
    accommodateRest = accommodate.rest
  }

  layoutActionOuter(layoutPosition, accommodateResult.map(i => Object({ y: layoutPosition.y, h: Position.hmax(i) }))).forEach((i, index) => accommodateResult[index].forEach(a => a.y = i.y))

  accommodateResult.forEach(i => layoutAlignInner({ x: layoutPosition.x, y: i.y, w: layoutPosition.w }, i))

  return unitPositons
}

const wrapVertical = (layoutPosition, unitPositons, layoutActionOuter, layoutAlignInner) => {
  var accommodateResult = []

  var accommodateRest = unitPositons

  while (accommodateRest.length) {
    const accommodate = verticalAccommodate(layoutPosition, accommodateRest)
    accommodateResult = [...accommodateResult, accommodate.result]
    accommodateRest = accommodate.rest
  }

  layoutActionOuter(layoutPosition, accommodateResult.map(i => Object({ x: layoutPosition.x, w: Position.wmax(i) }))).forEach((i, index) => accommodateResult[index].forEach(a => a.x = i.x))

  accommodateResult.forEach(i => layoutAlignInner({ y: layoutPosition.y, h: layoutPosition.h }, i))

  return unitPositons
}


const App = (props) => {
  ReactDomTag.preprocessing(props)

  const layoutPropsHorizontalIndex = Object.keys(props).findIndex(i => i === 'horizontalForward' || i === 'horizontalReverse' || i === 'horizontalCenter' || i === 'horizontalAround' || i === 'horizontalAround' || i === 'horizontalBetween')
  const layoutPropsVerticalIndex = Object.keys(props).findIndex(i => i === 'verticalForward' || i === 'verticalReverse' || i === 'verticalCenter' || i === 'verticalAround' || i === 'verticalAround' || i === 'verticalBetween')

  const layoutChildrenProps = props.children.flat().filter((i) => i.alternate === 'layout').map((i) => i.props)

  if (Boolean(props.wrap) === true && layoutPropsVerticalIndex > -1 && layoutPropsVerticalIndex > -1 && layoutPropsVerticalIndex < layoutPropsHorizontalIndex) {
    wrapHorizontal(
      { x: props.x, y: props.y, w: props.w, h: props.h },
      layoutChildrenProps,
      maps[Object.keys(props)[layoutPropsVerticalIndex]],
      maps[Object.keys(props)[layoutPropsHorizontalIndex]],
    )
  }

  if (Boolean(props.wrap) === true && layoutPropsHorizontalIndex > -1 && layoutPropsVerticalIndex > -1 && layoutPropsHorizontalIndex < layoutPropsVerticalIndex) {
    wrapVertical(
      { x: props.x, y: props.y, w: props.w, h: props.h },
      layoutChildrenProps,
      maps[Object.keys(props)[layoutPropsHorizontalIndex]],
      maps[Object.keys(props)[layoutPropsVerticalIndex]],
    )
  }

  if (Boolean(props.wrap) === false) {
    Object.keys(props)
      .forEach((i) => {
        if (Boolean(props[i]) === true && maps[i]) {
          maps[i]({ x: props.x, y: props.y, w: props.w, h: props.h }, layoutChildrenProps)
        }
      })
  }

  props.children.forEach((i, index) => { if (typeof i === 'function') props.children[index] = i({ x: props.x, y: props.y, w: props.w, h: props.h }) })

  ReactDomTag.postprocessing(props)

  return props.children
}

export default App