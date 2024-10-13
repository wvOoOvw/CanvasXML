const App = {
  onConstructMounted: (dom) => {
    dom.props.path = dom.element.props.path && JSON.parse(JSON.stringify(dom.element.props.path))
    dom.props.container = dom.element.props.container
    dom.props.closePath = dom.element.props.closePath
    dom.props.moveTo = dom.element.props.moveTo
    dom.props.lineTo = dom.element.props.lineTo
    dom.props.arcTo = dom.element.props.arcTo
    dom.props.quadraticCurveTo = dom.element.props.quadraticCurveTo
    dom.props.bezierCurveTo = dom.element.props.bezierCurveTo
  },

  onRenderMount: (dom) => {
    if (dom.props.container) {
      if (dom.props.path === undefined) {
        const exec = i => {
          var pathFunction = Object.keys(i.props).find(n => ['moveTo', 'lineTo', 'arcTo', 'quadraticCurveTo', 'bezierCurveTo'].includes(n) && i.props[n])
          var pathProps = i.children.filter((i) => i.element.tag === 'path').map(i => [i.props.x, i.props.y]).flat()

          if (pathFunction === 'arcTo') pathProps = [...pathProps, i.radius]

          return [pathFunction, pathProps]
        }
        dom.props.path = dom.children.filter((i) => i.element.tag === 'path').map(exec)
      }

      dom.path = (context) => {
        dom.props.path.forEach((i) => context[i[0]](...i[1]))
        if (dom.props.closePath) context.closePath()
      }
    }
  },
}

export default App