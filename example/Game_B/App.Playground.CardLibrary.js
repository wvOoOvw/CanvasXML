import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [x, setX] = React.useState()
  const [y, setY] = React.useState()

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameRoleControl ? 1 : 0, rate: 1 / 15, postprocess: n => Number(n.toFixed(4)) })

  const w = contextApp.unitpx * 0.32
  const h = contextApp.unitpx * 0.48

  const onPointerMove = e => {
    if (contextPlayground.gameRoleDrag || contextPlayground.gameRoleControl) {
      setX(e.x)
      setY(e.y)
      e.stopPropagation()
    }
  }

  const onPointerUp = e => {
    contextPlayground.setGameRoleDrag()
    contextPlayground.setGameRoleControl()
    setX()
    setY()
    e.stopPropagation()
  }

  return <>
    {
      contextPlayground.gameRoleControl ?
        <rectradius clip fill fillStyle='white' cx={x} cy={y} w={w} h={h} radius={contextApp.unitpx * 0.02} zIndex={contextPlayground.zIndex.CardControl}>
          <image cx='50%' cy='50%' w={w - contextApp.unitpx * 0.04} h={h - contextApp.unitpx * 0.04} src={contextApp[contextPlayground.gameRoleControl.option.imageIndex]} clipHorizontalCenter clipVerticalCenter />
        </rectradius>
        : null
    }
    <layout onPointerMove={onPointerMove} onPointerUp={onPointerUp} />
  </>
}

export default App