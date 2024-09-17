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
  const color = props.color
  const text = props.text
  const image = props.image

  const Component =
    <layout x={x} y={y} w={w} h={h}>
      <rectradiusarc fill fillStyle={color} radius={Math.min(w, h) * 0.24} />
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
            <ReactCanvas2dExtensions.Text text={text} font={`bolder ${Math.min(w, h) * 0.42}px sans-serif`} w={Infinity}>
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
  const animationCountAppear = props.animationCountAppear

  const Component =
    <layout x={x} y={y} w={w} h={h} globalAlpha={animationCountAppear}>
      <ReactCanvas2dExtensions.CanvasOffscreen dependence={[x, y, w, h, card]}>
        <rectradiusarc cx='50%' cy='50%' clip radius={Math.min(w, h) * 0.064}>
          <image cx='50%' cy='50%' src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
        </rectradiusarc>
        <rectradiusarc cx='50%' cy='50%' stroke radius={Math.min(w, h) * 0.064} strokeStyle='rgb(255, 255, 255)' lineWidth={Math.min(w, h) * 0.012} />
        <layout x={w + Math.min(w, h) * 0.12} w={w} h={h} container verticalForward gap={Math.min(w, h) * 0.04}>
          <layout w={w} h={Math.min(w, h) * 0.16} item>
            <Block
              x={Math.min(w, h) * 0.16 * 1.25 * 0}
              w={Math.min(w, h) * 0.16}
              h={Math.min(w, h) * 0.16}
              image={contextApp.imagePngBeanstalkWhite}
              color='rgb(15, 125, 25)'
            />
            <Block
              x={Math.min(w, h) * 0.16 * 1.25 * 1}
              w={Math.min(w, h) * 0.16}
              h={Math.min(w, h) * 0.16}
              text={'8'}
              color='rgb(145, 25, 45)'
            />
            <Block
              x={Math.min(w, h) * 0.16 * 1.25 * 2}
              w={Math.min(w, h) * 0.16}
              h={Math.min(w, h) * 0.16}
              text={'12'}
              color='rgb(25, 65, 125)'
            />
          </layout>
          <ReactCanvas2dExtensions.Text text={card.descriptionName} font={`bolder ${Math.min(w, h) * 0.08}px sans-serif`} w={w - Math.min(w, h) * 0.08}>
            {
              (line, location) => {
                return <layout w={w} h={location.h + Math.min(w, h) * 0.08} item>
                  <rectradiusarc stroke radius={Math.min(w, h) * 0.02} strokeStyle='rgb(255, 255, 255)' lineWidth={Math.min(w, h) * 0.008} />
                  {
                    line.map(i => {
                      return <text cx='50%' cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} />
                    })
                  }
                </layout>
              }
            }
          </ReactCanvas2dExtensions.Text>
          <ReactCanvas2dExtensions.Text text={card.descriptionDetail} font={`bolder ${Math.min(w, h) * 0.08}px sans-serif`} w={w - Math.min(w, h) * 0.08} wrap gap={Math.min(w, h) * 0.04}>
            {
              (line, location) => {
                return <layout w={w} h={location.h + Math.min(w, h) * 0.08} item>
                  <rectradiusarc stroke radius={Math.min(w, h) * 0.02} strokeStyle='rgb(255, 255, 255)' lineWidth={Math.min(w, h) * 0.008} />
                  {
                    line.map(i => {
                      return <text cx='50%' y={i.y + Math.min(w, h) * 0.04} w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} />
                    })
                  }
                </layout>
              }
            }
          </ReactCanvas2dExtensions.Text>
        </layout>
      </ReactCanvas2dExtensions.CanvasOffscreen>
    </layout>

  return Component
}

export default App