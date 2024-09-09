import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App(props) {
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

  const animationCountAppear = props.animationCountAppear
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

  return <layout x={x} y={y} w={w} h={h} transform={transform} globalAlpha={(1 - animationCountControlIng)}>
    <rectradius fill fillStyle='rgb(25, 75, 125)' radius={min * 0.048} onPointerDown={onPointerDown} onPointerDownAway={onPointerDownAway} onPointerMove={onPointerMove} onPointerMoveAway={onPointerMoveAway} onPointerUp={onPointerUp} onPointerUpAway={onPointerUpAway} />

    <rectradius cx='50%' cy='50%' w={w - min * 0.04} h={h - min * 0.04} clip radius={min * 0.048}>
      <image cx='50%' cy='50%' src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
    </rectradius>

    <layout cx={0} cy={min * 0.2} w={min * 0.24} h={min * 0.24}>
      <rectradius fill fillStyle='rgb(75, 75, 75)' radius={min * 0.048} />
      <image cx='50%' cy='50%' w='75%' h='75%' src={contextApp.imagePngBeanstalkWhite} />
    </layout>

    <layout cx={0} cy={min * 0.2 + min * 0.28 * 1} w={min * 0.24} h={min * 0.24}>
      <rectradius fill fillStyle='rgb(75, 75, 75)' radius={min * 0.048} />
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

    <layout cx={0} cy={min * 0.2 + min * 0.28 * 2} w={min * 0.24} h={min * 0.24}>
      <rectradius fill fillStyle='rgb(75, 75, 75)' radius={min * 0.048} />
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

  </layout>
}

export default App