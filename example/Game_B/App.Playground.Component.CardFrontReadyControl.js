import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function Block(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = props.w
  const h = props.h
  const x = props.x
  const y = props.y
  const globalAlpha = props.globalAlpha
  const image = props.image
  const text = props.text
  const color = props.color

  return <layout x={x} y={y} w={w} h={h} globalAlpha={globalAlpha}>
    <rectradiusarc fill fillStyle={color} radius={w * 0.24} globalAlpha={globalAlpha * 1} />
    {
      text === undefined ?
        <>
          <image cx='50%' cy='50%' w='75%' h='75%' src={image} />
        </>
        : null
    }
    {
      text !== undefined ?
        <>
          <ReactCanvas2dExtensions.Text text={text} font={`bolder ${w * 0.42}px sans-serif`} w={Infinity}>
            {
              (line, location) => {
                return line.map(i => {
                  return <text cx='50%' cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} />
                })
              }
            }
          </ReactCanvas2dExtensions.Text>
        </>
        : null
    }
  </layout>
}

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
  const animationCountUse = props.animationCountUse

  const onPointerDown = props.onPointerDown
  const onPointerDownAway = props.onPointerDownAway
  const onPointerMove = props.onPointerMove
  const onPointerMoveAway = props.onPointerMoveAway
  const onPointerUp = props.onPointerUp
  const onPointerUpAway = props.onPointerUpAway

  const transform = translateX || translateY || rotateAngle ?
    [
      { translate: { x: translateX, y: translateY } },
      { rotate: { angle: rotateAngle } },
      { translate: { x: 0 - translateX, y: 0 - translateY } },
    ]
    : []

  return <layout x={x} y={y} w={w} h={h} transform={transform}>

    <ReactCanvas2dExtensions.CanvasOffscreen dependence={[x, y, w, h, translateX, translateY, rotateAngle, animationCountAppear, animationCountUse, card]}>
      <rectradiusarc fill radius={Math.min(w, h) * 0.064} shadowBlur={Math.min(w, h) * 0.08 + animationCountUse * Math.min(w, h) * 0.08} fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' />
      <rectradiusarc cx='50%' cy='50%' clip radius={Math.min(w, h) * 0.064}>
        <image cx='50%' cy='50%' w={w * (1 + animationCountUse * 0.25)} h={h * (1 + animationCountUse * 0.25)} src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
      </rectradiusarc>
    </ReactCanvas2dExtensions.CanvasOffscreen>

    <rectradiusarc radius={Math.min(w, h) * 0.064} onPointerDown={onPointerDown} onPointerDownAway={onPointerDownAway} onPointerMove={onPointerMove} onPointerMoveAway={onPointerMoveAway} onPointerUp={onPointerUp} onPointerUpAway={onPointerUpAway} />

  </layout>
}

export default App