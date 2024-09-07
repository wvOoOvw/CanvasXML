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
  const translateX = props.translateX
  const translateY = props.translateY
  const rotateAngle = props.rotateAngle

  const animationCountDragIng = props.animationCountDragIng
  const animationCountControlIng = props.animationCountControlIng

  const onPointerDown = props.onPointerDown
  const onPointerDownAway = props.onPointerDownAway
  const onPointerMove = props.onPointerMove
  const onPointerMoveAway = props.onPointerMoveAway
  const onPointerUp = props.onPointerUp
  const onPointerUpAway = props.onPointerUpAway

  const min = Math.min(w, h)

  const transform = [
    {
      translate: { x: translateX, y: translateY }
    },
    {
      rotate: { angle: rotateAngle }
    },
    {
      translate: { x: 0 - translateX, y: 0 - translateY }
    },
  ]

  return <layout x={x} y={y} w={w} h={h} transform={transform}>
    <rectradius fill fillStyle='rgb(255, 255, 255)' radius={min * 0.048} shadowBlur={min * 0.08} shadowColor='rgb(255, 255, 255)' onPointerDown={onPointerDown} onPointerDownAway={onPointerDownAway} onPointerMove={onPointerMove} onPointerMoveAway={onPointerMoveAway} onPointerUp={onPointerUp} onPointerUpAway={onPointerUpAway} />
    <rectradius cx='50%' cy='50%' w={w - min * 0.04} h={h - min * 0.04} clip radius={min * 0.048}>
      <image cx='50%' cy='50%' src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
    </rectradius>
    <rectradius fill fillStyle='rgb(0, 0, 0)' radius={min * 0.048} globalAlpha={animationCountControlIng * 0.35} />

    {/* <layout cx={0} cy={min * 0.2} w={min * 0.24} h={min * 0.24} globalAlpha={(1 - animationCountDragIng)}>
      <rectradius fill fillStyle={color} radius={min * 0.048} globalAlpha={(1 - animationCountDragIng) * 0.8} />
      <image cx='50%' cy='50%' w='75%' h='75%' src={contextApp[modelTypeImageIndex]} />
    </layout> */}

    {/* {
      card.modelType === 'Role' ?
        <layout cx={0} cy={min * 0.2 + min * 0.28 * 1} w={min * 0.24} h={min * 0.24} globalAlpha={1 - animationCountDragIng}>
          <rectradius fill fillStyle={color} radius={min * 0.048} globalAlpha={(1 - animationCountDragIng) * 0.8} />
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
        : null
    }
    {
      card.modelType === 'Role' ?
        <layout cx={0} cy={min * 0.2 + min * 0.28 * 2} w={min * 0.24} h={min * 0.24} globalAlpha={1 - animationCountDragIng}>
          <rectradius fill fillStyle={color} radius={min * 0.048} globalAlpha={(1 - animationCountDragIng) * 0.8} />
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
        : null
    }

    <layout cx='50%' cy={`calc(100% - ${min * 0.2}px)`} w={w - min * 0.24} h={min * 0.16} globalAlpha={1 - animationCountDragIng}>
      <rect fill fillStyle={color} globalAlpha={(1 - animationCountDragIng) * 0.8} />
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

    {
      card.modelType === 'Role' ?
        <layout cx='50%' cy={`calc(100% - ${min * 0.1}px)`} w={w - min * 0.24} h={min * 0.02} globalAlpha={1 - animationCountDragIng}>
          <rect fill fillStyle='rgb(175, 75, 75)' />
        </layout>
        : null
    }

    {
      card.modelType !== 'Role' ?
        <layout cx='50%' cy={`calc(100% - ${min * 0.1}px)`} w={w - min * 0.24} h={min * 0.02} globalAlpha={1 - animationCountDragIng}>
          <rect fill fillStyle='rgb(255, 255, 255)' />
        </layout>
        : null
    } */}

  </layout>
}

function Card(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = props.card
  const index = props.index

  const lengthMax = 12
  const lengthGameCard = contextPlayground.gameSelfCardReady.filter(i => i !== contextPlayground.gameSelfCardControl).length

  const w = contextPlayground.gameSelfCardReadyExpand ? contextApp.unitpx * 0.24 : contextApp.unitpx * 0.16
  const h = contextPlayground.gameSelfCardReadyExpand ? contextApp.unitpx * 0.24 * 1.42 : contextApp.unitpx * 0.16 * 1.42
  const x = contextPlayground.gameSelfCardReadyExpand ? contextApp.locationLayout.x + contextApp.locationLayout.w / 2 - w / 2 : contextApp.locationLayout.x + contextApp.locationLayout.w - w * 4.2 + ((lengthMax - lengthGameCard + 1) * w * 0.048 + w * 0.36) * (index - (lengthGameCard - 1) / 2)
  const y = contextPlayground.gameSelfCardReadyExpand ? contextApp.locationLayout.y + contextApp.locationLayout.h - h + h * 0.12 : contextApp.locationLayout.y + contextApp.locationLayout.h - h + h * 0.24

  const rotateAngle = Math.PI * ((lengthMax - lengthGameCard + 1) * 0.002 + 0.01) * (index - (lengthGameCard - 1) / 2)
  const rotateTranslateX = x + w / 2
  const rotateTranslateY = y + h * 8

  const [moveX, setMoveX] = React.useState(0)
  const [moveY, setMoveY] = React.useState(0)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: card.animation ? 0 : 1, destination: 1, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDragIng } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameSelfCardDrag === card ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountControlIng } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameSelfCardControl ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountMoveX } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: moveX, destination: moveX, rate: contextApp.unitpx * 0.04, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountMoveY } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: moveY, destination: moveY, rate: contextApp.unitpx * 0.04, postprocess: n => Number(n.toFixed(4)) })

  const { animationCount: animationCountRotateAngle } = ReactExtensions.useAnimationDestinationRateTime({ play: true, defaultCount: rotateAngle, destination: rotateAngle, rateTime: 10, postprocess: n => Number(n.toFixed(4)) })

  const onChange = (params) => {
    const { status, e, x, y, changedX, changedY, continuedX, continuedY } = params

    if (status === 'afterStart' && contextPlayground.gameSelfCardDrag === undefined && contextPlayground.gameSelfCardControl === undefined) {
      contextPlayground.setGameSelfCardDrag(card)
      contextPlayground.setGameSelfCardDescription(card)
    }

    if (status === 'afterMove') {
      if (Math.abs(moveX) < h * 0.35 && moveY > h * 0.35 * -1) {
        setMoveX(i => i + changedX)
        setMoveY(i => i + changedY)
        setMoveY(i => Math.min(i, 0))
      }

      if (Math.abs(moveX) >= h * 0.35 || moveY <= h * 0.35 * -1) {
        contextPlayground.setGameSelfCardDrag(undefined)
        contextPlayground.setGameSelfCardControl(card)
        contextPlayground.setGameSelfCardDescription(undefined)
      }
    }

    if (status === 'afterEnd') {
      setMoveX(0)
      setMoveY(0)
      contextPlayground.setGameSelfCardDrag(undefined)
      contextPlayground.setGameSelfCardControl(undefined)
      contextPlayground.setGameSelfCardDescription(undefined)
    }
  }

  const { onStart, onMove, onEnd } = ReactCanvas2dExtensions.useEventDrag({ enable: true, onChange: onChange })

  const onPointerDown = e => {
    e.stopPropagation()

    if (contextPlayground.gameSelfCardReadyExpand === true) {
      onStart(e)
    }

    if (contextPlayground.gameSelfCardReadyExpand !== true) {
      contextPlayground.setGameSelfCardReadyExpand(true)
    }
  }

  return <layout zIndex={contextPlayground.zIndex.SelfCardReady}>
    <Template
      x={x + animationCountMoveX}
      y={y + animationCountMoveY + (animationCountAppear - 1) * h * 0.24}
      w={w}
      h={h}
      translateX={rotateTranslateX}
      translateY={rotateTranslateY}
      rotateAngle={contextPlayground.gameSelfCardReadyExpand ? animationCountRotateAngle : 0}
      animationCountDragIng={animationCountDragIng}
      animationCountControlIng={animationCountControlIng}
      card={card}
      onPointerDown={onPointerDown}
      onPointerMove={onMove}
      onPointerMoveAway={onMove}
      onPointerUp={onEnd}
      onPointerUpAway={onEnd}
    />
  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)


  return <>
    <rect zIndex={contextPlayground.zIndex.SelfCardReadyExpand} onPointerDown={() => contextPlayground.setGameSelfCardReadyExpand(false)} />

    {
      contextPlayground.gameSelfCardReady
        .filter(i => i !== contextPlayground.gameSelfCardControl)
        .sort((a, b) => a.modelType.localeCompare(b.modelType))
        .map((i, index) => <Card key={i.key} card={i} index={index} />)
    }

  </>

  return
}

export default App