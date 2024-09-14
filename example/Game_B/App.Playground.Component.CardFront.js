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
  const backgroundGlobalAlpha = props.backgroundGlobalAlpha !== undefined ? props.backgroundGlobalAlpha : 0
  const backgroundShadowBlur = props.backgroundShadowBlur !== undefined ? props.backgroundShadowBlur : 0
  const backgroundShadowOffsetX = props.backgroundShadowOffsetX !== undefined ? props.backgroundShadowOffsetX : 0
  const backgroundShadowOffsetY = props.backgroundShadowOffsetY !== undefined ? props.backgroundShadowOffsetY : 0
  const globalAlphaLayout = props.globalAlphaLayout !== undefined ? props.globalAlphaLayout : 1
  const globalAlphaSimpleDescription = props.globalAlphaSimpleDescription !== undefined ? props.globalAlphaSimpleDescription : 1

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

  return <layout x={x} y={y} w={w} h={h} transform={transform} globalAlpha={globalAlphaLayout}>
    
    <ReactCanvas2dExtensions.CanvasOffscreen dependence={[x, y, w, h, translateX, translateY, rotateAngle, backgroundGlobalAlpha, backgroundShadowBlur, backgroundShadowOffsetX, backgroundShadowOffsetY, globalAlphaLayout, globalAlphaSimpleDescription, card]}>
        {
          backgroundGlobalAlpha > 0 ?  
            <rectradiusarc x={Math.min(w, h) * 0.04} y={Math.min(w, h) * 0.04} radius={Math.min(w, h) * 0.064} globalAlpha={backgroundGlobalAlpha} fill shadowBlur={backgroundShadowBlur} shadowOffsetX={backgroundShadowOffsetX} shadowOffsetY={backgroundShadowOffsetY} fillStyle='rgb(255, 255, 255)'  shadowColor='rgb(125, 125, 125)' />
            :null
        }

        <rectradiusarc cx='50%' cy='50%' w={w} h={h} clip radius={Math.min(w, h) * 0.064}>
          <image cx='50%' cy='50%' src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
        </rectradiusarc>

        {
          globalAlphaSimpleDescription > 0 ?
            <Block
              x={0 - Math.min(w, h) * 0.12}
              y={Math.min(w, h) * 0.08 + Math.min(w, h) * 0.28 * 0}
              w={Math.min(w, h) * 0.24}
              h={Math.min(w, h) * 0.24}
              globalAlpha={globalAlphaLayout * globalAlphaSimpleDescription}
              image={contextApp.imagePngBeanstalkWhite}
              color='rgb(15, 125, 25)'
            />
            : null
        }

        {
          globalAlphaSimpleDescription > 0 ?
            <Block
              x={0 - Math.min(w, h) * 0.12}
              y={Math.min(w, h) * 0.08 + Math.min(w, h) * 0.28 * 1}
              w={Math.min(w, h) * 0.24}
              h={Math.min(w, h) * 0.24}
              globalAlpha={globalAlphaLayout * globalAlphaSimpleDescription}
              image={contextApp.imagePngWizardStaff4A90E2}
              text={'+8'}
              color='rgb(145, 25, 45)'
            />
            : null
        }

        {
          globalAlphaSimpleDescription > 0 ?
            <Block
              x={0 - Math.min(w, h) * 0.12}
              y={Math.min(w, h) * 0.08 + Math.min(w, h) * 0.28 * 2}
              w={Math.min(w, h) * 0.24}
              h={Math.min(w, h) * 0.24}
              globalAlpha={globalAlphaLayout * globalAlphaSimpleDescription}
              image={contextApp.imagePngLayeredArmor8B572A}
              text={'+12'}
              color='rgb(25, 65, 125)'
            />
            : null
        }
    </ReactCanvas2dExtensions.CanvasOffscreen>

    <rectradiusarc radius={Math.min(w, h) * 0.064} onPointerDown={onPointerDown} onPointerDownAway={onPointerDownAway} onPointerMove={onPointerMove} onPointerMoveAway={onPointerMoveAway} onPointerUp={onPointerUp} onPointerUpAway={onPointerUpAway} />

  </layout>
}

export default App