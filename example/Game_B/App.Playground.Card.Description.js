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

  const color = props.color

  const animationCountDragIng = props.animationCountDragIng
  const animationCountControlIng = props.animationCountControlIng

  const onPointerDown = props.onPointerDown
  const onPointerMove = props.onPointerMove
  const onPointerUp = props.onPointerUp

  const min = Math.min(w, h)

  const transform = [
    {
      translate: { x: props.translateX, y: props.translateY }
    },
    {
      rotate: { angle: props.rotateAngle }
    },
    {
      translate: { x: 0 - props.translateX, y: 0 - props.translateY }
    },
  ]

  return <layout x={x} y={y} w={w} h={h} transform={transform}>

    <rectradius fill fillStyle={color} radius={min * 0.048} shadowBlur={min * 0.08} shadowColor='rgb(255, 255, 255)' onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerMoveAway={onPointerMove} onPointerUp={onPointerUp} onPointerUpAway={onPointerUp} />

    <rectradius cx='50%' cy='50%' w={w - min * 0.04} h={h - min * 0.04} clip radius={min * 0.048}>
      <image cx='50%' cy='50%' src={contextApp[card.imageIndex]} clipHorizontalCenter clipVerticalCenter />
    </rectradius>

    <rectradius fill fillStyle='black' radius={min * 0.048} globalAlpha={animationCountControlIng * 0.35} />

    <layout cx={min * 0.2} cy={min * 0.2} w={min * 0.24} h={min * 0.24} globalAlpha={1 - animationCountDragIng}>
      <rectradius fill fillStyle={color} radius={min * 0.048} globalAlpha={(1 - animationCountDragIng) * 0.8} />
      {
        card.modelType === 'Role' ? <image cx='50%' cy='50%' w='75%' h='75%' src={contextApp.imagePngDigitalTraceWhite} /> : null
      }
    </layout>

    <layout cx='50%' cy={`calc(100% - ${min * 0.2}px)`} w={w - min * 0.24} h={min * 0.2} globalAlpha={1 - animationCountDragIng}>
      <rectradius fill fillStyle={color} radius={min * 0.032} globalAlpha={(1 - animationCountDragIng) * 0.8} />
      <ReactCanvas2dExtensions.Text text={card.descriptionName} font={`bolder ${min * 0.08}px sans-serif`} w={Infinity}>
        {
          (line, location) => {
            return line.map(i => {
              return <text cx='50%' cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} />
            })
          }
        }
      </ReactCanvas2dExtensions.Text>
    </layout>

  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [card, setRole] = React.useState()

  const rotateTranslateX = contextApp.locationLayout.x
  const rotateTranslateY = contextApp.locationLayout.y + contextApp.locationLayout.h

  const w = contextApp.unitpx * 0.48
  const h = contextApp.unitpx * 0.84
  const x = contextApp.locationLayout.x - w / 2
  const y = contextApp.locationLayout.y + contextApp.locationLayout.h / 2

  const color = 'rgb(75, 75, 75)'

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameCardDescription ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (contextPlayground.gameCardDescription) {
      setRole(contextPlayground.gameCardDescription)
    }
  }, [contextPlayground.gameCardDescription])

  return <layout zIndex={contextPlayground.zIndex.CardDescription}>
    <Template
      x={x}
      y={y}
      w={w}
      h={h}
      color={color}
      animationCountAppear={animationCountAppear}
      card={card}
      translateX={rotateTranslateX}
      translateY={rotateTranslateY}
      rotateAngle={Math.PI * 0.15 * animationCountAppear}
    />
  </layout>
}

export default App