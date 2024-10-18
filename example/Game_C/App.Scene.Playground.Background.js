import React from '../../package/React'
import * as ReactExtensions from '../../package/ReactExtensions'

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
      <rect fill fillStyle='rgb(25, 45, 75)' />
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

  const caculate = (indexX, indexY) => {
    var x = (indexX - (lengthX - 1) / 2) * (w + contextApp.unitpx * 0.01)

    if (indexX % 2 === 0) var y = (indexY - (lengthY - 1) / 2) * (h + contextApp.unitpx * 0.01)
    if (indexX % 2 !== 0) var y = (indexY - (lengthY - 1) / 2) * (h + contextApp.unitpx * 0.01) + h / 2

    return { x, y }
  }

  const Component =
    <>
      {
        new Array(lengthX).fill().map((i, indexX) => new Array(lengthY).fill().map((i, indexY) => <FloorPlank w={w} h={h} {...caculate(indexX, indexY)} />))
      }
    </>

  return React.useMemo(() => Component, [])
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