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
  const color = props.color

  const text = props.text
  const image = props.image

  const Component =
    <layout x={x} y={y} w={w} h={h}>
      <rectradiusarc fill fillStyle={color} radius={Math.min(w, h) * 0.24} globalAlpha={globalAlpha * 0.8} />
      {
        text === undefined ?
          <>
            <image cx='50%' cy='50%' w='75%' h='75%' src={image} globalAlpha={globalAlpha * 1} />
          </>
          : null
      }
      {
        text !== undefined ?
          <>
            <ReactCanvas2dExtensions.Text text={text} font={`bolder ${Math.min(w, h) * 0.42}px sans-serif`} w={Infinity}>
              {
                (line, location) => {
                  return <text cx='50%' cy='50%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} globalAlpha={globalAlpha * 1} />
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
    <layout x={x} y={y} w={w} h={h} transform={transform}>
      <ReactCanvas2dExtensions.CanvasOffscreen dependence={[x, y, w, h, translateX, translateY, rotateAngle, animationCountDragIng, card]}>
        <rectradiusarc fill radius={Math.min(w, h) * 0.064} shadowBlur={Math.min(w, h) * 0.08} fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' />
        <rectradiusarc cx='50%' cy='50%' clip radius={Math.min(w, h) * 0.064}>
          <image cx='50%' cy='50%' src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
        </rectradiusarc>
        {
          animationCountDragIng < 1 ?
            <Block
              x={0 - Math.min(w, h) * 0.12}
              y={Math.min(w, h) * 0.08 + Math.min(w, h) * 0.28 * 0}
              w={Math.min(w, h) * 0.24}
              h={Math.min(w, h) * 0.24}
              globalAlpha={1 - animationCountDragIng}
              image={contextApp.imagePngBeanstalkWhite}
              color='rgb(15, 125, 25)'
            />
            : null
        }
        {
          animationCountDragIng < 1 ?
            <Block
              x={0 - Math.min(w, h) * 0.12}
              y={Math.min(w, h) * 0.08 + Math.min(w, h) * 0.28 * 1}
              w={Math.min(w, h) * 0.24}
              h={Math.min(w, h) * 0.24}
              globalAlpha={1 - animationCountDragIng}
              image={contextApp.imagePngWizardStaff4A90E2}
              text={'+8'}
              color='rgb(145, 25, 45)'
            />
            : null
        }
        {
          animationCountDragIng < 1 ?
            <Block
              x={0 - Math.min(w, h) * 0.12}
              y={Math.min(w, h) * 0.08 + Math.min(w, h) * 0.28 * 2}
              w={Math.min(w, h) * 0.24}
              h={Math.min(w, h) * 0.24}
              globalAlpha={1 - animationCountDragIng}
              image={contextApp.imagePngLayeredArmor8B572A}
              text={'+12'}
              color='rgb(25, 65, 125)'
            />
            : null
        }
      </ReactCanvas2dExtensions.CanvasOffscreen>
      <rectradiusarc radius={Math.min(w, h) * 0.064} onPointerDown={onPointerDown} onPointerDownAway={onPointerDownAway} onPointerMove={onPointerMove} onPointerMoveAway={onPointerMoveAway} onPointerUp={onPointerUp} onPointerUpAway={onPointerUpAway} />
    </layout>

  return Component
}

export default App