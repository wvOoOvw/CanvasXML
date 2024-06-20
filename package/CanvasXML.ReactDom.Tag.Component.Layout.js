import React from './CanvasXML.React'
import ReactDom from './CanvasXML.ReactDom'

import ReactDomTag from './CanvasXML.ReactDom.Tag'

import Location from './CanvasXML.Location'


const horizontalForward = (layoutPosition, unitPositons, gap) => {
  var x = 0

  unitPositons.forEach(i => {
    i.x = layoutPosition.x + x
    x = x + i.w + gap
  })

  return unitPositons
}

const horizontalReverse = (layoutPosition, unitPositons, gap) => {
  var x = 0

  unitPositons.forEach(i => {
    i.x = layoutPosition.x + layoutPosition.w - i.w - x
    x = x + i.w + gap
  })

  return unitPositons
}

const horizontalCenter = (layoutPosition, unitPositons, gap) => {
  var x = 0
  var w = Location.add(unitPositons).w + (unitPositons.length - 1) * gap

  unitPositons.forEach(i => {
    i.x = layoutPosition.x + (layoutPosition.w - w) / 2 + x
    x = x + i.w + gap
  })

  return unitPositons
}

const horizontalAround = (layoutPosition, unitPositons) => {
  var x = 0
  var w = Location.add(unitPositons).w

  unitPositons.forEach((i, index) => {
    i.x = layoutPosition.x + (layoutPosition.w - w) / (unitPositons.length - 1) * index + x
    x = x + i.w
  })

  return unitPositons
}

const horizontalBetween = (layoutPosition, unitPositons) => {
  var x = 0
  var w = Location.add(unitPositons).w

  unitPositons.forEach((i, index) => {
    i.x = layoutPosition.x + (layoutPosition.w - w) / (unitPositons.length + 1) * (index + 1) + x
    x = x + i.w
  })

  return unitPositons
}


const horizontalAlignForward = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.x = layoutPosition.x
  })

  return unitPositons
}

const horizontalAlignReverse = (layoutPosition, unitPositons) => {
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


const horizontalAccommodate = (layoutPosition, unitPositons, gap) => {
  var x = 0
  var accommodated = false
  var result = []

  unitPositons.forEach(i => {
    if (accommodated === false && (x + i.w + gap < layoutPosition.w || x + i.w + gap === layoutPosition.w)) result.push(i)
    if (accommodated === false && (x + i.w + gap < layoutPosition.w || x + i.w + gap === layoutPosition.w)) x = x + i.w + gap
    if (x + i.w + gap > layoutPosition.w) accommodated = true
  })

  return { result: result, rest: unitPositons.filter((i, index) => index > result.length - 1) }
}


const verticalForward = (layoutPosition, unitPositons, gap) => {
  var y = 0

  unitPositons.forEach(i => {
    i.y = layoutPosition.y + y
    y = y + i.h + gap
  })

  return unitPositons
}

const verticalReverse = (layoutPosition, unitPositons, gap) => {
  var y = 0

  unitPositons.forEach(i => {
    i.y = layoutPosition.y + layoutPosition.h - i.h - y
    y = y + i.h + gap
  })

  return unitPositons
}

const verticalCenter = (layoutPosition, unitPositons, gap) => {
  var y = 0
  var h = Location.add(unitPositons).h + (unitPositons.length - 1) * gap

  unitPositons.forEach(i => {
    i.y = layoutPosition.y + (layoutPosition.h - h) / 2 + y
    y = y + i.h + gap
  })

  return unitPositons
}

const verticalAround = (layoutPosition, unitPositons) => {
  var y = 0
  var h = Location.add(unitPositons).h

  unitPositons.forEach((i, index) => {
    i.y = layoutPosition.y + (layoutPosition.h - h) / (unitPositons.length - 1) * index + y
    y = y + i.h
  })

  return unitPositons
}

const verticalBetween = (layoutPosition, unitPositons) => {
  var y = 0
  var h = Location.add(unitPositons).h

  unitPositons.forEach((i, index) => {
    i.y = layoutPosition.y + (layoutPosition.h - h) / (unitPositons.length + 1) * (index + 1) + y
    y = y + i.h
  })

  return unitPositons
}


const verticalAlignForward = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.y = layoutPosition.y
  })

  return unitPositons
}

const verticalAlignReverse = (layoutPosition, unitPositons) => {
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


const verticalAccommodate = (layoutPosition, unitPositons, gap) => {
  var y = 0
  var accommodated = false
  var result = []

  unitPositons.forEach(i => {
    if (accommodated === false && (y + i.h + gap < layoutPosition.h || y + i.h + gap === layoutPosition.h)) result.push(i)
    if (accommodated === false && (y + i.h + gap < layoutPosition.h || y + i.h + gap === layoutPosition.h)) y = y + i.h + gap
    if (y + i.h + gap > layoutPosition.h) accommodated = true
  })

  return { result: result, rest: unitPositons.filter((i, index) => index > result.length - 1) }
}


const maps = {
  horizontalForward: horizontalForward,
  horizontalReverse: horizontalReverse,
  horizontalCenter: horizontalCenter,
  horizontalAround: horizontalAround,
  horizontalBetween: horizontalBetween,
  horizontalAlignForward: horizontalAlignForward,
  horizontalAlignReverse: horizontalAlignReverse,
  horizontalAlignCenter: horizontalAlignCenter,
  verticalForward: verticalForward,
  verticalReverse: verticalReverse,
  verticalCenter: verticalCenter,
  verticalAround: verticalAround,
  verticalBetween: verticalBetween,
  verticalAlignForward: verticalAlignForward,
  verticalAlignReverse: verticalAlignReverse,
  verticalAlignCenter: verticalAlignCenter,
}

const wrapHorizontal = (layoutPosition, unitPositons, layoutOuter, layoutInner, gap) => {
  var accommodateResult = []

  var accommodateRest = unitPositons

  while (accommodateRest.length) {
    const accommodate = horizontalAccommodate(layoutPosition, accommodateRest, gap)
    accommodateResult = [...accommodateResult, accommodate.result]
    accommodateRest = accommodate.rest
  }

  layoutOuter(
    layoutPosition,
    accommodateResult.map(i => Object({ y: layoutPosition.y, h: Location.hmax(i) })),
    gap
  )
    .forEach((i, index) => accommodateResult[index].forEach(a => a.y = i.y))

  accommodateResult.forEach(i => layoutInner({ x: layoutPosition.x, y: i.y, w: layoutPosition.w }, i, gap))

  return unitPositons
}

const wrapVertical = (layoutPosition, unitPositons, layoutOuter, layoutInner, gap) => {
  var accommodateResult = []

  var accommodateRest = unitPositons

  while (accommodateRest.length) {
    const accommodate = verticalAccommodate(layoutPosition, accommodateRest, gap)
    accommodateResult = [...accommodateResult, accommodate.result]
    accommodateRest = accommodate.rest
  }

  layoutOuter(
    layoutPosition,
    accommodateResult.map(i => Object({ x: layoutPosition.x, w: Location.wmax(i) })),
    gap
  )
    .forEach((i, index) => accommodateResult[index].forEach(a => a.x = i.x))

  accommodateResult.forEach(i => layoutInner({ y: layoutPosition.y, h: layoutPosition.h }, i), gap)

  return unitPositons
}


const App = {
  renderMount: (dom) => {
    ReactDomTag.renderMount_0(dom)
    ReactDomTag.renderMount_1(dom)

    if (Boolean(dom.props.container) === true) {
      const gap = dom.props.gap || 0

      const indexHorizontal = Object.keys(dom.props).findIndex(i => {
        return ['horizontalForward', 'horizontalReverse', 'horizontalCenter', 'horizontalAround', 'horizontalAround', 'horizontalBetween'].includes(i)
      })

      const indexVertical = Object.keys(dom.props).findIndex(i => {
        return ['verticalForward', 'verticalReverse', 'verticalCenter', 'verticalAround', 'verticalAround', 'verticalBetween'].includes(i)
      })

      const childrenDom = dom.children
        .flat()
        .filter((i) => typeof i === 'object' && i.element.alternate === 'layout' && Boolean(i.props.item) === true)


      childrenDom.forEach(i => ReactDomTag.renderMount_0(i))

      const childrenProps = childrenDom.map((i) => i.props)

      if (Boolean(dom.props.wrap) === true && indexVertical > -1 && indexVertical > -1 && indexVertical < indexHorizontal) {
        wrapHorizontal(
          { x: dom.props.x, y: dom.props.y, w: dom.props.w, h: dom.props.h },
          childrenProps,
          maps[Object.keys(dom.props)[indexVertical]],
          maps[Object.keys(dom.props)[indexHorizontal]],
          gap
        )
      }

      if (Boolean(dom.props.wrap) === true && indexHorizontal > -1 && indexVertical > -1 && indexHorizontal < indexVertical) {
        wrapVertical(
          { x: dom.props.x, y: dom.props.y, w: dom.props.w, h: dom.props.h },
          childrenProps,
          maps[Object.keys(props)[indexHorizontal]],
          maps[Object.keys(props)[indexVertical]],
          gap
        )
      }

      if (Boolean(dom.props.wrap) === false) {
        Object.keys(dom.props).forEach(i => {
          if (Boolean(dom.props[i]) === true && maps[i]) maps[i]({ x: dom.props.x, y: dom.props.y, w: dom.props.w, h: dom.props.h }, childrenProps, gap)
        })
      }
    }

    ReactDomTag.renderMount_2(dom)
  },

  renderUnmount: (dom) => {
    ReactDomTag.renderUnmount(dom)
  },
}

export default App