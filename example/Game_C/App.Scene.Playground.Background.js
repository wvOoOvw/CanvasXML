import React from '../../package/React'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function FloorPlank(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const x = props.x
  const y = props.y
  const w = props.w
  const h = props.h

  const Component =
    <layout x={x} y={y} w={w} h={h}>
      <rect fill fillStyle='rgb(175, 125, 175)' />
    </layout>

  return Component
}

function Floor() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [w, setW] = React.useState(contextApp.unitpx * 0.32)
  const [h, setH] = React.useState(contextApp.unitpx * 0.64)

  const [lengthX, setLengthX] = React.useState(Math.ceil(contextApp.locationLayout.w / 2 / w) * 2 + 1)
  const [lengthY, setLengthY] = React.useState(Math.ceil(contextApp.locationLayout.h / 2 / h) * 2 + 1)

  const { animationCountProcessed: animationCountMove } = ReactExtensions.useAnimationCount({ play: true, defaultCount: 0, defaultDestination: 1, defaultRate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const caculate = (indexX, indexY) => {
    var x = (indexX - (lengthX - 1) / 2) * (w + contextApp.unitpx * 0.04)
    var y = (indexY - (lengthY - 1) / 2) * (h + contextApp.unitpx * 0.04)

    if (indexX % 2 !== 0) y = y + h / 2

    y = y - animationCountMove * h

    return { x, y }
  }

  const Component =
    <ReactCanvas2dExtensions.CanvasOffscreen dependence={[animationCountMove]}>
      {
        new Array(lengthX).fill().map((i, indexX) => new Array(lengthY).fill().map((i, indexY) => <FloorPlank w={w} h={h} {...caculate(indexX, indexY)} />))
      }
    </ReactCanvas2dExtensions.CanvasOffscreen>

  return React.useMemo(() => Component, [animationCountMove])
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <layout zIndex={contextPlayground.zIndex.Background}>
      <Floor />
    </layout>

  return Component
}

export default App