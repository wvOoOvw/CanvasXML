import * as Canvas2dExtensions from '../Canvas2dExtensions'

const horizontalForward = (layoutPosition, unitPositons, gap) => {
  var x = 0

  unitPositons.forEach(i => {
    i.x = 0 - layoutPosition.w / 2 + i.w / 2 + x
    console.log(i.x)
    x = x + i.w + gap
  })

  return unitPositons
}

const horizontalReverse = (layoutPosition, unitPositons, gap) => {
  var x = 0

  unitPositons.forEach(i => {
    i.x = 0 + layoutPosition.w / 2 - i.w / 2 - x
    x = x + i.w + gap
  })

  return unitPositons
}

const horizontalCenter = (layoutPosition, unitPositons, gap) => {
  var x = 0
  var w = Canvas2dExtensions.Location.add(unitPositons).w + (unitPositons.length - 1) * gap

  unitPositons.forEach(i => {
    i.x = 0 - w / 2 + i.w / 2 + x
    x = x + i.w + gap
  })

  return unitPositons
}

const horizontalAround = (layoutPosition, unitPositons) => {
  var x = 0
  var w = Canvas2dExtensions.Location.add(unitPositons).w

  unitPositons.forEach((i, index) => {
    i.x = 0 - layoutPosition.w / 2 + (layoutPosition.w - w) / (unitPositons.length + 1) * (index + 1) + i.w / 2 + x
    x = x + i.w
  })

  return unitPositons
}

const horizontalBetween = (layoutPosition, unitPositons) => {
  var x = 0
  var w = Canvas2dExtensions.Location.add(unitPositons).w

  unitPositons.forEach((i, index) => {
    i.x = 0 - layoutPosition.w / 2 + (layoutPosition.w - w) / (unitPositons.length - 1) * index + i.w / 2 + x
    x = x + i.w
  })

  return unitPositons
}

const horizontalAlignForward = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.x = 0 - layoutPosition.w / 2 + i.w / 2
  })

  return unitPositons
}

const horizontalAlignReverse = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.x = 0 + layoutPosition.w / 2 - i.w / 2
  })

  return unitPositons
}

const horizontalAlignCenter = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.x = 0
  })

  return unitPositons
}

const horizontalFlex = (layoutPosition, unitPositons, gap) => {
  const tw = unitPositons.reduce((t, i) => t + i.w, 0) + gap * (unitPositons.length - 1)
  const tgrow = unitPositons.reduce((t, i) => t + (i.grow || 0), 0)
  const tshrink = unitPositons.reduce((t, i) => t + (i.shrink || 0), 0)

  if (tw > layoutPosition.w && tshrink > 0) {
    unitPositons.forEach(i => {
      if (i.shrink) i.w = i.w - (tw - layoutPosition.w) * (i.shrink / tshrink)
    })
  }

  if (tw < layoutPosition.w && tgrow > 0) {
    unitPositons.forEach(i => {
      if (i.grow) i.w = i.w - (tw - layoutPosition.w) * (i.grow / tgrow)
    })
  }

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
    i.y = 0 - layoutPosition.h / 2 + i.h / 2 + y
    y = y + i.h + gap
  })

  return unitPositons
}

const verticalReverse = (layoutPosition, unitPositons, gap) => {
  var y = 0

  unitPositons.forEach(i => {
    i.y = 0 + layoutPosition.h / 2 - i.h / 2 - y
    y = y + i.h + gap
  })

  return unitPositons
}

const verticalCenter = (layoutPosition, unitPositons, gap) => {
  var y = 0
  var h = Canvas2dExtensions.Location.add(unitPositons).h + (unitPositons.length - 1) * gap

  unitPositons.forEach(i => {
    i.y = 0 - h / 2 + i.h / 2 + y
    y = y + i.h + gap
  })

  return unitPositons
}

const verticalAround = (layoutPosition, unitPositons) => {
  var y = 0
  var h = Canvas2dExtensions.Location.add(unitPositons).h

  unitPositons.forEach((i, index) => {
    i.y = 0 - layoutPosition.h / 2 + (layoutPosition.h - h) / (unitPositons.length + 1) * (index + 1) + i.h / 2 + y
    y = y + i.h
  })

  return unitPositons
}

const verticalBetween = (layoutPosition, unitPositons) => {
  var y = 0
  var h = Canvas2dExtensions.Location.add(unitPositons).h

  unitPositons.forEach((i, index) => {
    i.y = 0 - layoutPosition.h / 2 + (layoutPosition.h - h) / (unitPositons.length + 1) * index + i.h / 2 + y
    y = y + i.h
  })

  return unitPositons
}

const verticalAlignForward = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.y = 0 - layoutPosition.h / 2 + i.h / 2
  })

  return unitPositons
}

const verticalAlignReverse = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.y = 0 + layoutPosition.h / 2 - i.h / 2
  })

  return unitPositons
}

const verticalAlignCenter = (layoutPosition, unitPositons) => {
  unitPositons.forEach((i, index) => {
    i.y = 0
  })

  return unitPositons
}

const verticalFlex = (layoutPosition, unitPositons, gap) => {
  const th = unitPositons.reduce((t, i) => t + i.h, 0) + gap * (unitPositons.length - 1)
  const tgrow = unitPositons.reduce((t, i) => t + (i.grow || 0), 0)
  const tshrink = unitPositons.reduce((t, i) => t + (i.shrink || 0), 0)

  if (th > layoutPosition.h && tshrink > 0) {
    unitPositons.forEach(i => {
      if (i.shrink) i.h = i.h - (th - layoutPosition.h) * (i.shrink / tshrink)
    })
  }

  if (th < layoutPosition.h && tgrow > 0) {
    unitPositons.forEach(i => {
      if (i.grow) i.h = i.h - (th - layoutPosition.h) * (i.grow / tgrow)
    })
  }

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

const wrapHorizontal = (layoutPosition, unitPositons, layoutInner, layoutOuter, gap) => {
  var accommodateResult = []

  var accommodateRest = unitPositons

  while (accommodateRest.length) {
    const accommodate = horizontalAccommodate(layoutPosition, accommodateRest, gap)

    if (accommodate.result.length === 0) {
      accommodateResult = [...accommodateResult, accommodate.rest[0]]
      accommodateRest = accommodate.rest.filter((i, index) => index !== 0)
    }

    if (accommodate.result.length > 0) {
      accommodateResult = [...accommodateResult, accommodate.result]
      accommodateRest = accommodate.rest
    }
  }

  layoutOuter(
    layoutPosition,
    accommodateResult.map(i => Object({ y: layoutPosition.y, h: Canvas2dExtensions.Location.hmax(i) })),
    gap
  )
    .forEach((i, index) => accommodateResult[index].forEach(a => a.y = i.y))

  accommodateResult.forEach(i => layoutInner({ x: layoutPosition.x, y: i.y, w: layoutPosition.w }, i, gap))

  return unitPositons
}

const wrapVertical = (layoutPosition, unitPositons, layoutInner, layoutOuter, gap) => {
  var accommodateResult = []

  var accommodateRest = unitPositons

  while (accommodateRest.length) {
    const accommodate = verticalAccommodate(layoutPosition, accommodateRest, gap)

    if (accommodate.result.length === 0) {
      accommodateResult = [...accommodateResult, accommodate.rest[0]]
      accommodateRest = accommodate.rest.filter((i, index) => index !== 0)
    }

    if (accommodate.result.length > 0) {
      accommodateResult = [...accommodateResult, accommodate.result]
      accommodateRest = accommodate.rest
    }
  }

  layoutOuter(
    layoutPosition,
    accommodateResult.map(i => Object({ x: layoutPosition.x, w: Canvas2dExtensions.Location.wmax(i) })),
    gap
  )
    .forEach((i, index) => accommodateResult[index].forEach(a => a.x = i.x))

  accommodateResult.forEach(i => layoutInner({ y: layoutPosition.y, h: layoutPosition.h }, i), gap)

  return unitPositons
}


const App = {
  onConstructMounted: (dom) => {
    dom.props.container = dom.element.props.container
    dom.props.item = dom.element.props.item
    dom.props.wrap = dom.element.props.wrap
    dom.props.gap = dom.element.props.gap
    dom.props.horizontalForward = dom.element.props.horizontalForward
    dom.props.horizontalReverse = dom.element.props.horizontalReverse
    dom.props.horizontalCenter = dom.element.props.horizontalCenter
    dom.props.horizontalAround = dom.element.props.horizontalAround
    dom.props.horizontalBetween = dom.element.props.horizontalBetween
    dom.props.horizontalAlignForward = dom.element.props.horizontalAlignForward
    dom.props.horizontalAlignReverse = dom.element.props.horizontalAlignReverse
    dom.props.horizontalAlignCenter = dom.element.props.horizontalAlignCenter
    dom.props.verticalForward = dom.element.props.verticalForward
    dom.props.verticalReverse = dom.element.props.verticalReverse
    dom.props.verticalCenter = dom.element.props.verticalCenter
    dom.props.verticalAround = dom.element.props.verticalAround
    dom.props.verticalBetween = dom.element.props.verticalBetween
    dom.props.verticalAlignForward = dom.element.props.verticalAlignForward
    dom.props.verticalAlignReverse = dom.element.props.verticalAlignReverse
    dom.props.verticalAlignCenter = dom.element.props.verticalAlignCenter
  },

  onLocationMounted: (dom) => {
    if (dom.props.gap === undefined) dom.props.gap = 0

    if (dom.props.container) {
      const itemProps = []

      dom.children.forEach(i => {
        if (i.element.tag === 'layout' && i.props.item) {
          i.resize()
          itemProps.push(i.props)
        }
      })

      const indexHorizontal = Object.keys(dom.props).findIndex(i => {
        return ['horizontalForward', 'horizontalReverse', 'horizontalCenter', 'horizontalAround', 'horizontalBetween'].includes(i) && dom.props[i]
      })

      const indexVertical = Object.keys(dom.props).findIndex(i => {
        return ['verticalForward', 'verticalReverse', 'verticalCenter', 'verticalAround', 'verticalAround', 'verticalBetween'].includes(i) && dom.props[i]
      })

      const indexHorizontalAlign = Object.keys(dom.props).findIndex(i => {
        return ['horizontalAlignForward', 'horizontalAlignReverse', 'horizontalAlignCenter'].includes(i) && dom.props[i]
      })

      const indexVerticalAlign = Object.keys(dom.props).findIndex(i => {
        return ['verticalAlignForward', 'verticalAlignReverse', 'verticalAlignCenter'].includes(i) && dom.props[i]
      })

      if (Boolean(dom.props.wrap) === true) {
        if (indexHorizontal > -1 && indexVertical > -1 && indexHorizontal < indexVertical) {
          wrapHorizontal({ x: dom.props.x, y: dom.props.y, w: dom.props.w, h: dom.props.h },itemProps,maps[Object.keys(dom.props)[indexHorizontal]],maps[Object.keys(dom.props)[indexVertical]],dom.props.gap)
        }

        if (indexVertical > -1 && indexVertical > -1 && indexVertical < indexHorizontal) {
          wrapVertical({ x: dom.props.x, y: dom.props.y, w: dom.props.w, h: dom.props.h },itemProps,maps[Object.keys(dom.props)[indexVertical]],maps[Object.keys(dom.props)[indexHorizontal]],dom.props.gap)
        }
      }

      if (Boolean(dom.props.wrap) !== true) {
        if (indexHorizontal > -1) {
          horizontalFlex({ x: dom.props.x, y: dom.props.y, w: dom.props.w, h: dom.props.h }, itemProps, dom.props.gap)
        }

        if (indexVertical > -1) {
          verticalFlex({ x: dom.props.x, y: dom.props.y, w: dom.props.w, h: dom.props.h }, itemProps, dom.props.gap)
        }

        if (indexHorizontal > -1) {
          maps[Object.keys(dom.props)[indexHorizontal]]({ x: dom.props.x, y: dom.props.y, w: dom.props.w, h: dom.props.h }, itemProps, dom.props.gap)
        }

        if (indexVertical > -1) {
          maps[Object.keys(dom.props)[indexVertical]]({ x: dom.props.x, y: dom.props.y, w: dom.props.w, h: dom.props.h }, itemProps, dom.props.gap)
        }

        if (indexHorizontalAlign > -1) {
          maps[Object.keys(dom.props)[indexHorizontalAlign]]({ x: dom.props.x, y: dom.props.y, w: dom.props.w, h: dom.props.h }, itemProps, dom.props.gap)
        }

        if (indexVerticalAlign > -1) {
          maps[Object.keys(dom.props)[indexVerticalAlign]]({ x: dom.props.x, y: dom.props.y, w: dom.props.w, h: dom.props.h }, itemProps, dom.props.gap)
        }
      }
    }
  },
}

export default App