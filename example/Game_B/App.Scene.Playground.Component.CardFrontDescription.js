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
      <rectradiusarc fill radius={w * 0.24} fillStyle={color} shadowBlur={w * 0.48} shadowColor={color} />
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

function CardDesciption(props) {
  const w = props.w
  
  const text = props.text

  const Component =
    <ReactCanvas2dExtensions.Text text={text} font={`bolder ${w * 0.072}px sans-serif`} w={w - w * 0.08} wrap gap={w * 0.04}>
      {
        (line, location) => {
          return <layout w={w} h={location.h + w * 0.12} item>
            <rectradiusarc fill radius={w * 0.024} shadowBlur={w * 0.08} fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' />
            {
              line.map(i => {
                return <text cx='50%' y={i.y + w * 0.06} w={i.w} h={i.h} fillText fillStyle='rgb(0, 0, 0)' text={i.text} font={i.font} />
              })
            }
          </layout>
        }
      }
    </ReactCanvas2dExtensions.Text>

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
  const animationCountAppear = props.animationCountAppear

  const Component =
    <layout x={x} y={y} w={w} h={h} globalAlpha={animationCountAppear}>
      <ReactCanvas2dExtensions.CanvasOffscreen dependence={[x, y, w, h, card]}>
        <rectradiusarc fill radius={w * 0.064} shadowBlur={w * 0.08} fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' />
        <rectradiusarc cx='50%' cy='50%' clip radius={w * 0.064}>
          <image cx='50%' cy='50%' src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
        </rectradiusarc>

        <layout y={h + w * 0.04} w={w} h={w * 0.24} item container horizontalCenter verticalAlignCenter gap={w * 0.04}>
          <rectradiusarc fill radius={w * 0.048} shadowBlur={w * 0.08} fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' />
          <CardProperty w={w * 0.16} h={w * 0.16} color='rgb(15, 125, 25)' image={contextApp.imagePngBeanstalkWhite} />
          <CardProperty w={w * 0.16} h={w * 0.16} color='rgb(145, 25, 45)' text={'8'} />
          <CardProperty w={w * 0.16} h={w * 0.16} color='rgb(25, 65, 125)' text={'12'} />
        </layout>

        <layout x={w + w * 0.12} w={w} h={h} container verticalForward gap={w * 0.04}>
          <CardDesciption w={w} text={'** ' + card.descriptionName + ' **'} />
          <CardDesciption w={w} text={card.descriptionDetail} />
        </layout>
      </ReactCanvas2dExtensions.CanvasOffscreen>
    </layout>

  return Component
}

export default App