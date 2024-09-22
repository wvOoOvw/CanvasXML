import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function CardProperty(props) {
  const w = props.w
  const h = props.h

  const color = props.color

  const text = props.text
  const image = props.image

  const Component =
    <layout w={w} h={h} item>
      <rectradiusarc fill radius={w * 0.24} fillStyle={color} shadowBlur={w * 0.24} shadowColor={color} />
      {
        image ?
          <>
            <image cx='50%' cy='50%' w='75%' h='75%' src={image} />
          </>
          : null
      }
      {
        text ?
          <>
            <ReactCanvas2dExtensions.Text text={text} font={`bolder ${w * 0.42}px sans-serif`} w={Infinity}>
              {
                (line, location) => {
                  return <text cx='50%' cy='50%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
                }
              }
            </ReactCanvas2dExtensions.Text>
          </>
          : null
      }
    </layout>

  return Component
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
  const animationCountDragIng = props.animationCountDragIng

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

  const Component =
    <>
      <ReactCanvas2dExtensions.CanvasOffscreen dependence={[x, y, w, h, animationCountDragIng, card]}>
        <layout x={x} y={y} w={w} h={h} transform={transform}>
          <rectradiusarc fill radius={w * 0.064} shadowBlur={w * 0.08} fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' />
          <rectradiusarc cx='50%' cy='50%' clip radius={w * 0.064}>
            <image cx='50%' cy='50%' src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
          </rectradiusarc>
          {
            animationCountDragIng < 1 ?
              <layout x={0 - w * 0.12} y={w * 0.12} container verticalForward gap={w * 0.04} globalAlpha={(1 - animationCountDragIng)}>
                <CardProperty w={w * 0.24} h={w * 0.24} color='rgb(15, 125, 25)' image={contextApp.imagePngBeanstalkWhite} />
                <CardProperty w={w * 0.24} h={w * 0.24} color='rgb(145, 25, 45)' text={'8'} />
                <CardProperty w={w * 0.24} h={w * 0.24} color='rgb(25, 65, 125)' text={'12'} />
              </layout>
              : null
          }
        </layout>
      </ReactCanvas2dExtensions.CanvasOffscreen>
      
      <layout x={x} y={y} w={w} h={h} transform={transform}>
        <rectradiusarc radius={w * 0.064} onPointerDown={onPointerDown} onPointerDownAway={onPointerDownAway} onPointerMove={onPointerMove} onPointerMoveAway={onPointerMoveAway} onPointerUp={onPointerUp} onPointerUpAway={onPointerUpAway} />
      </layout>
    </>

  return Component
}

export default App