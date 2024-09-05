import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function Template(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const role = props.role

  const w = props.w
  const h = props.h
  const x = props.x
  const y = props.y

  const color = props.color

  const animationCountAppear = props.animationCountAppear

  const onPointerMove = props.onPointerMove
  const onPointerUp = props.onPointerUp

  const min = Math.min(w, h)

  return <layout x={x} y={y} w={w} h={h}>

    {
      role && animationCountAppear > 0 ?
        <layout globalAlpha={animationCountAppear}>
          <rectradius fill fillStyle={color} radius={min * 0.048} shadowBlur={min * 0.08} shadowColor='rgb(255, 255, 255)' />
          <rectradius cx='50%' cy='50%' w={w - min * 0.04} h={h - min * 0.04} clip radius={min * 0.048}>
            <image cx='50%' cy='50%' src={contextApp[role.imageIndex]} clipHorizontalCenter clipVerticalCenter />
          </rectradius>
        </layout>
        : null
    }

    <rect onPointerMove={onPointerMove} onPointerMoveAway={onPointerMove} onPointerUp={onPointerUp} onPointerUpAway={onPointerUp} />

  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42

  const color = 'rgb(75, 75, 75)'

  const [role, setRole] = React.useState()
  
  const [x, setX] = React.useState()
  const [y, setY] = React.useState()

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameCardControl ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })

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

  React.useEffect(() => {
    if (contextPlayground.gameCardControl) {
      setRole(contextPlayground.gameCardControl)
    }
  },[contextPlayground.gameCardControl])

  return <layout zIndex={contextPlayground.zIndex.CardControl}>
    <Template
      x={x - w / 2}
      y={y - h / 2}
      w={w}
      h={h}
      color={color}
      role={role}
      animationCountAppear={animationCountAppear}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    />
  </layout>
}

export default App