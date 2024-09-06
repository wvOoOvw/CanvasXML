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

  const card = props.card

  const w = props.w
  const h = props.h
  const x = props.x
  const y = props.y

  const animationCountAppear = props.animationCountAppear

  const min = Math.min(w, h)

  const color = React.useMemo(() => {
    if (card.modelType === 'Role') return 'rgb(75, 75, 75)'
    if (card.modelType === 'Attack') return 'rgb(125, 75, 75)'
    if (card.modelType === 'Magic') return 'rgb(75, 75, 125)'
    if (card.modelType === 'Cure') return 'rgb(75, 125, 125)'
  }, [card.modelType])

  return <layout x={x} y={y} w={w} h={h}>
    <rectradius fill fillStyle={color} radius={min * 0.048} shadowBlur={min * 0.04} shadowColor={color} />
    <rectradius cx='50%' cy='50%' w={w - min * 0.04} h={h - min * 0.04} clip radius={min * 0.048}>
      <image cx='50%' cy='50%' src={contextApp[card.imageIndex]} clipHorizontalCenter clipVerticalCenter />
    </rectradius>
  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42

  const [x, setX] = React.useState()
  const [y, setY] = React.useState()

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameSelfCardControl ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })

  const onPointerMove = e => {
    if (contextPlayground.gameSelfCardDrag || contextPlayground.gameSelfCardControl) {
      setX(e.x)
      setY(e.y)
    }
  }

  const onPointerUp = e => {
    contextPlayground.setGameSelfCardDrag(undefined)
    contextPlayground.setGameSelfCardControl(undefined)
    contextPlayground.setGameSelfCardDescription(undefined)
    setX()
    setY()
  }

  return <layout zIndex={contextPlayground.zIndex.SelfCardControl}>
    {
      contextPlayground.gameSelfCardControl ?
        <Template
          x={x - w / 2}
          y={y - h / 2}
          w={w}
          h={h}
          card={contextPlayground.gameSelfCardControl}
          animationCountAppear={animationCountAppear}
        />
        : null
    }
    <rect onPointerMove={onPointerMove} onPointerMoveAway={onPointerMove} onPointerUp={onPointerUp} onPointerUpAway={onPointerUp} />
  </layout>
}

export default App