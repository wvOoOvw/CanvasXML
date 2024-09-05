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

    <rectradius fill fillStyle='rgb(75, 75, 75)' radius={min * 0.048} shadowBlur={min * 0.04} shadowColor='rgb(255, 255, 255)' onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerMoveAway={onPointerMove} onPointerUp={onPointerUp} onPointerUpAway={onPointerUp} />
    <rectradius cx='50%' cy='50%' w={w - min * 0.04} h={h - min * 0.04} clip radius={min * 0.048}>
      <image cx='50%' cy='50%' src={contextApp[card.imageIndex]} clipHorizontalCenter clipVerticalCenter />
    </rectradius>
    <rectradius fill fillStyle='black' radius={min * 0.048} globalAlpha={animationCountControlIng * 0.35} />

    <layout cx={min * 0.04} cy={min * 0.2} w={min * 0.24} h={min * 0.24} globalAlpha={1 - animationCountDragIng}>
      <rectradius fill fillStyle='rgb(75, 75, 75)' radius={min * 0.048} globalAlpha={(1 - animationCountDragIng) * 0.8} />
      {
        card.modelType === 'Role' ? <image cx='50%' cy='50%' w='75%' h='75%' src={contextApp.imagePngDigitalTraceWhite} /> : null
      }
    </layout>
    <layout cx={min * 0.04} cy={min * 0.2 + min * 0.28 * 1} w={min * 0.24} h={min * 0.24} globalAlpha={1 - animationCountDragIng}>
      <rectradius fill fillStyle='rgb(75, 75, 75)' radius={min * 0.048} globalAlpha={(1 - animationCountDragIng) * 0.8} />
      <image cx='50%' cy='50%' w='75%' h='75%' src={contextApp.imagePngWizardStaff4A90E2} />
      <ReactCanvas2dExtensions.Text text={String(8)} font={`bolder ${min * 0.12}px sans-serif`} w={Infinity}>
        {
          (line, location) => {
            return line.map(i => {
              return <text cx='50%' cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} />
            })
          }
        }
      </ReactCanvas2dExtensions.Text>
    </layout>
    <layout cx={min * 0.04} cy={min * 0.2 + min * 0.28 * 2} w={min * 0.24} h={min * 0.24} globalAlpha={1 - animationCountDragIng}>
      <rectradius fill fillStyle='rgb(75, 75, 75)' radius={min * 0.048} globalAlpha={(1 - animationCountDragIng) * 0.8} />
      <image cx='50%' cy='50%' w='75%' h='75%' src={contextApp.imagePngLayeredArmor8B572A} />
      <ReactCanvas2dExtensions.Text text={String(2)} font={`bolder ${min * 0.12}px sans-serif`} w={Infinity}>
        {
          (line, location) => {
            return line.map(i => {
              return <text cx='50%' cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} />
            })
          }
        }
      </ReactCanvas2dExtensions.Text>
    </layout>
    <layout cx='50%' cy={`calc(100% - ${min * 0.2}px)`} w={w - min * 0.24} h={min * 0.16} globalAlpha={1 - animationCountDragIng}>
      <rectradius fill fillStyle='rgb(75, 75, 75)' radius={[min * 0.032, min * 0.032, 0, 0]} globalAlpha={(1 - animationCountDragIng) * 0.8} />
      <rect y='100%' w='100%' h={min * 0.04} fill fillStyle='rgb(175, 75, 75)' globalAlpha={(1 - animationCountDragIng) * 0.8} />
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

function Card(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = props.card
  const index = props.index

  const lengthMax = 12
  const lengthGameCard = contextPlayground.gameCardReady.filter(i => i !== contextPlayground.gameCardControl).length

  const rotateAngleUnit = (lengthMax - lengthGameCard + 1) * 0.002 + 0.01
  const rotateAngle = Math.PI * rotateAngleUnit * (index - (lengthGameCard - 1) / 2)
  const rotateTranslateX = contextApp.locationLayout.x + contextApp.locationLayout.w / 2
  const rotateTranslateY = contextApp.locationLayout.y + contextApp.locationLayout.h + contextApp.unitpx * 3.2

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42
  const x = contextApp.locationLayout.x + contextApp.locationLayout.w / 2 - w / 2
  const y = contextApp.locationLayout.y + contextApp.locationLayout.h - h - contextApp.unitpx * 0.12

  const shouldRender = React.useShouldRender()

  const [moveX, setMoveX] = React.useState(0)
  const [moveY, setMoveY] = React.useState(0)

  const rotateAngleUnitCache = React.useRef([undefined, undefined])

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountRotateAngle } = ReactExtensions.useAnimationDestination({ play: Boolean(rotateAngleUnitCache.current[0] !== undefined && rotateAngleUnitCache.current[1] !== undefined), defaultCount: rotateAngle, destination: rotateAngle, rate: Math.abs(rotateAngleUnitCache.current[1] - rotateAngleUnitCache.current[0]) / 10, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDragIng } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameCardDrag === card ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountControlIng } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameCardControl === card ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountActiveIng } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameCardDrag === card || contextPlayground.gameCardControl === card ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountMoveX } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: moveX, destination: moveX, rate: contextApp.unitpx * 0.04, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountMoveY } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: moveY, destination: moveY, rate: contextApp.unitpx * 0.04, postprocess: n => Number(n.toFixed(4)) })

  const onChange = (params) => {
    const { status, e, x, y, changedX, changedY, continuedX, continuedY } = params

    if (status === 'afterStart' && contextPlayground.gameCardDrag === undefined && contextPlayground.gameCardControl === undefined) {
      contextPlayground.setGameCardDrag(card)
      contextPlayground.setGameCardDescription(card)
    }

    if (status === 'afterMove') {
      if (Math.abs(moveX) < h * 0.35 && moveY > h * 0.35 * -1) {
        setMoveX(i => i + changedX)
        setMoveY(i => i + changedY)
        setMoveY(i => Math.min(i, 0))
      }

      if (Math.abs(moveX) >= h * 0.35 || moveY <= h * 0.35 * -1) {
        contextPlayground.setGameCardDrag(undefined)
        contextPlayground.setGameCardControl(card)
        contextPlayground.setGameCardDescription(undefined)
      }
    }

    if (status === 'afterEnd') {
      setMoveX(0)
      setMoveY(0)
      contextPlayground.setGameCardDrag(undefined)
      contextPlayground.setGameCardControl(undefined)
      contextPlayground.setGameCardDescription(undefined)
    }
  }

  const { onStart, onMove, onEnd } = ReactCanvas2dExtensions.useEventDrag({ enable: true, onChange: onChange })

  const onPointerDown = e => {
    onStart(e)
    e.stopPropagation()
  }

  React.useEffectImmediate(() => {
    rotateAngleUnitCache.current = [animationCountRotateAngle, rotateAngle]
    shouldRender()
  }, [rotateAngle])

  return <layout zIndex={contextPlayground.zIndex.CardReady}>
    <Template
      x={x + animationCountMoveX}
      y={y + animationCountMoveY + (animationCountAppear - 1) * y * 0.25}
      w={w}
      h={h}
      animationCountDragIng={animationCountDragIng}
      animationCountControlIng={animationCountControlIng}
      animationCountActiveIng={animationCountActiveIng}
      card={card}
      translateX={rotateTranslateX}
      translateY={rotateTranslateY}
      rotateAngle={animationCountRotateAngle}
      onPointerDown={onPointerDown}
      onPointerMove={onMove}
      onPointerUp={onEnd}
    />
  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return contextPlayground.gameCardReady.filter(i => i !== contextPlayground.gameCardControl).map((i, index) => <Card key={i.key} card={i} index={index} />)
}

export default App