import React from '../React'

function App(props) {
  if (props.container) {

    const onRenderMount = dom => {
      const exec = i => {
        var pathFunction = Object.keys(i.props).find(n => ['moveTo', 'lineTo', 'arcTo', 'quadraticCurveTo', 'bezierCurveTo'].includes(n) && i.props[n])
        var pathProps = i.props.path || i.children.filter((i) => i.tag === 'path' || i.tag === App).map(i => [i.props.x, i.props.y]).flat()

        if (pathFunction === 'arcTo') pathProps = [...pathProps, i.radius]

        return [pathFunction, pathProps]
      }

      dom.props.path = props.children.flat().filter((i) => i.tag === 'path' || i.tag === App).map(exec)

      dom.props.path.forEach(i => {
        if (i[0] === 'moveTo' || i[0] === 'lineTo') {
          i[1][0] = i[1][0] + dom.props.x
          i[1][1] = i[1][1] + dom.props.y
        }

        if (i[0] === 'arcTo' || i[0] === 'quadraticCurveTo') {
          i[1][0] = i[1][0] + dom.props.x
          i[1][1] = i[1][1] + dom.props.y
          i[1][2] = i[1][2] + dom.props.x
          i[1][3] = i[1][3] + dom.props.y
        }

        if (i[0] === 'bezierCurveTo') {
          i[1][0] = i[1][0] + dom.props.x
          i[1][1] = i[1][1] + dom.props.y
          i[1][2] = i[1][2] + dom.props.x
          i[1][3] = i[1][3] + dom.props.y
          i[1][4] = i[1][4] + dom.props.x
          i[1][5] = i[1][5] + dom.props.y
        }
      })

      if (props.onRenderMount) props.onRenderMount(dom)
    }

    return <path {...props} onRenderMount={onRenderMount} />
  }
}

export default App