import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import CardControl from './App.Playground.CardControl'
import CardLibrary from './App.Playground.CardLibrary'
import CardPanel from './App.Playground.CardPanel'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = contextApp.unitpx * 0.72
  const h = contextApp.unitpx * 0.48

  const moveMaxY = contextPlayground.gameEnemy.length * (h + contextApp.unitpx * 0.12) - h

  const [moveIng, setMoveIng] = React.useState(false)
  const [moveX, setMoveX] = React.useState(0)
  const [moveY, setMoveY] = React.useState(0)

  const onChange = (params) => {
    const { status, e, x, y, changedX, changedY, continuedX, continuedY } = params

    if (status === 'afterStart') {
      setMoveIng(true)
    }

    if (status === 'afterMove' && moveIng) {
      setMoveY(i => i + changedY)
    }

    if (status === 'afterEnd') {
      setMoveIng(false)
    }
  }

  const { onStart, onMove, onEnd } = ReactCanvas2dExtensions.useEventDrag({ enable: true, onChange: onChange })

  const onPointerDown = e => {
    onStart(e)
    e.stopPropagation()
  }

  React.useEffect(() => {
    if (moveIng === false) {
      if (moveY > 0 && moveY === 1) setMoveY(0)
      if (moveY > 0 && moveY < 1) setMoveY(0)
      if (moveY > 0 && moveY > 1) setMoveY(i => i / 2)

      if (moveY < moveMaxY * -1 && moveY === -1) setMoveY(0)
      if (moveY < moveMaxY * -1 && moveY > -1) setMoveY(0)
      if (moveY < moveMaxY * -1 && moveY < -1) setMoveY(i => i / 2)
    }
  }, [moveIng, moveX, moveY])

  return <layout zIndex={contextPlayground.zIndex.EnemyPanel}>
    <layout x={moveX} y={moveY} container verticalForward horizontalAlignCenter gap={contextApp.unitpx * 0.12}>
      {
        contextPlayground.gameEnemy.map((i, index) => {
          return <layout item w={w} h={h}>
            <rect fill fillStyle='skyblue' />
          </layout>
        })
      }
    </layout>
    <rect onPointerDown={onPointerDown} onPointerMove={onMove} onPointerUp={onEnd} />
  </layout>
}


export default App