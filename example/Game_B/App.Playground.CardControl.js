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

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameCardControl ? 1 : 0, rate: 1 / 15, postprocess: n => Number(n.toFixed(4)) })

  const w = contextApp.unitpx * 0.32
  const h = contextApp.unitpx * 0.48

  const onPointerMove = e => {
    if (contextPlayground.gameCardDrag || contextPlayground.gameCardControl) {
      setX(e.x)
      setY(e.y)
    }
  }

  const onPointerUp = e => {
    contextPlayground.setGameCardDrag()
    contextPlayground.setGameCardControl()
    setX()
    setY()
  }

  return <layout zIndex={contextPlayground.zIndex.CardControl}>
    {
      contextPlayground.gameCardControl ?
        <layout cx={x} cy={y} w={w} h={h}>
          <rectradius fill fillStyle='white' radius={contextApp.unitpx * 0.02} />
          <rectradius cx='50%' cy='50%' w={w - contextApp.unitpx * 0.04} h={h - contextApp.unitpx * 0.04} clip radius={contextApp.unitpx * 0.02}>
            <image cx='50%' cy='50%' src={contextApp[contextPlayground.gameCardControl.imageIndex]} clipHorizontalCenter clipVerticalCenter />
          </rectradius>
        </layout>
        : null
    }
    <layout onPointerMove={onPointerMove} onPointerUp={onPointerUp} />
  </layout>
}

export default App