const locationAnalysis = (dom, limit) => {
  const limits = (property) => {
    return limit === undefined || (typeof limit === 'string' && limit === property) || (typeof limit === 'object' && limit.includes(property))
  }

  const undefineds = (property) => {
    return property.every(i => typeof dom.props[i] === 'undefined')
  }

  const unit = (value, property) => {
    if (value.match(/^[\d\.-]+$/) && isNaN(value) === false) {
      return Number(value)
    }

    if (value.match(/^.+px$/)) {
      return Number(value.replace(/px/, ''))
    }

    if (value.match(/^min\(.+\)$/)) {
      const splits = value.replace(/^min\(/, '').replace(/\)$/, '').split(/\s?,\s?/)

      splits.forEach((i, index) => {
        splits[index] = unit(i, property)
      })

      return Math.min(...splits)
    }

    if (value.match(/^max\(.+\)$/)) {
      const splits = value.replace(/^max\(/, '').replace(/\)$/, '').split(/(\s+)?,(\s+)?/)

      splits.forEach((i, index) => {
        splits[index] = unit(i, property)
      })

      return Math.max(...splits)
    }

    if (value.match(/^.+%$/)) {
      if (property === 'x' || property === 'cx' || property === 'gx' || property === 'w' || property === 'l' || property === 'r') return dom.parent.props.w * Number(value.replace(/%/, '')) / 100
      if (property === 'y' || property === 'cy' || property === 'gy' || property === 'h' || property === 'r' || property === 'b') return dom.parent.props.h * Number(value.replace(/%/, '')) / 100
    }

    if (value.match(/^.+vmin$/)) {
      return dom.parent.props.vmin * Number(value.replace(/vmin/, ''))
    }

    if (value.match(/^.+vmax$/)) {
      return dom.parent.props.vmax * Number(value.replace(/vmax/, ''))
    }

    if (value.match(/^.+vw$/)) {
      return dom.parent.props.vw * Number(value.replace(/vw/, ''))
    }

    if (value.match(/^.+vh$/)) {
      return dom.parent.props.vh * Number(value.replace(/vh/, ''))
    }

    if (value.match(/^calc\(.+\)$/)) {
      return value
        .replace(/^calc\(/, '')
        .replace(/\)$/, '')
        .split(/\s+/)
        .reduce(
          (t, i) => {
            if (i === '+' || i === '-' || i === '*' || i === '/') t.operator = i
            if (i !== '+' && i !== '-' && i !== '*' && i !== '/' && t.operator === '+') t.value = t.value + unit(i, property)
            if (i !== '+' && i !== '-' && i !== '*' && i !== '/' && t.operator === '-') t.value = t.value - unit(i, property)
            if (i !== '+' && i !== '-' && i !== '*' && i !== '/' && t.operator === '*') t.value = t.value * unit(i, property)
            if (i !== '+' && i !== '-' && i !== '*' && i !== '/' && t.operator === '/') t.value = t.value / unit(i, property)
            if (i !== '+' && i !== '-' && i !== '*' && i !== '/' && t.operator === undefined) t.value = unit(i, property)
            return t
          },
          { value: undefined, operator: undefined }
        ).value
    }
  }

  const caculate = (property) => {
    var r

    if (typeof dom.props[property] === 'number') {
      r = dom.props[property]
    }
    if (typeof dom.props[property] === 'function') {
      r = value(dom.parent.props)
    }
    if (typeof dom.props[property] === 'string') {
      r = unit(dom.props[property], property)
    }
    if (typeof dom.props[property] === 'undefined') {
      r = dom.parent.props[property]
    }

    return r
  }

  const analysis = () => {
    if (dom.props && dom.parent) {
      if (limits('w')) {
        dom.props.w = caculate('w')
      }

      if (limits('h')) {
        dom.props.h = caculate('h')
      }

      if (limits('x') && (typeof dom.props.x !== 'undefined' || undefineds(['x', 'cx', 'gx', 'l', 'r']))) {
        if (typeof dom.props.x !== 'undefined') dom.props.x = dom.parent.props.x + caculate('x')
        if (typeof dom.props.x === 'undefined') dom.props.x = dom.parent.props.x
      }

      if (limits('y') && (typeof dom.props.y !== 'undefined' || undefineds(['y', 'cy', 'gy', 't', 'b']))) {
        if (typeof dom.props.y !== 'undefined') dom.props.y = dom.parent.props.y + caculate('y')
        if (typeof dom.props.y === 'undefined') dom.props.y = dom.parent.props.y
      }

      if (limits('cx') && (typeof dom.props.cx !== 'undefined' && undefineds(['x', 'gx', 'l', 'r']))) {
        dom.props.x = dom.parent.props.x - dom.props.w / 2 + caculate('cx')
      }

      if (limits('cy') && (typeof dom.props.cy !== 'undefined' && undefineds(['y', 'gy', 't', 'b']))) {
        dom.props.y = dom.parent.props.y - dom.props.h / 2 + caculate('cy')
      }

      if (limits('gx') && (typeof dom.props.gx !== 'undefined' && undefineds(['x', 'cx', 'l', 'r']))) {
        dom.props.x = caculate('gx')
      }

      if (limits('gy') && (typeof dom.props.gy !== 'undefined' && undefineds(['y', 'cy', 't', 'b']))) {
        dom.props.y = caculate('gy')
      }

      if (limits('l') && (typeof dom.props.l !== 'undefined' && undefineds(['x', 'cx', 'gx', 'r']))) {
        dom.props.x = dom.parent.props.x + caculate('l')
      }

      if (limits('r') && (typeof dom.props.r !== 'undefined' && undefineds(['x', 'cx', 'gx', 'l']))) {
        dom.props.x = dom.parent.props.x + dom.parent.props.w - dom.props.w - caculate('r')
      }

      if (limits('t') && (typeof dom.props.t !== 'undefined' && undefineds(['y', 'cy', 'gy', 'b']))) {
        dom.props.y = dom.parent.props.y + caculate('t')
      }

      if (limits('b') && (typeof dom.props.b !== 'undefined' && undefineds(['y', 'cy', 'gy', 't']))) {
        dom.props.y = dom.parent.props.y + dom.parent.props.h - dom.props.h - caculate('b')
      }
    }
  }

  analysis()
}

export default locationAnalysis