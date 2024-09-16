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

  return <layout x={x} y={y} w={w} h={h}>
    <rectradiusarc fill fillStyle={color} radius={Math.min(w, h) * 0.24} globalAlpha={globalAlpha * 0.8} />
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
          <ReactCanvas2dExtensions.Text text={text} font={`bolder ${Math.min(w, h) * 0.42}px sans-serif`} w={Infinity}>
            {
              (line, location) => {
                return line.map(i => {
                  return <text cx='50%' cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} globalAlpha={globalAlpha * 1} />
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
  const animationCountAppear = props.animationCountAppear

  return <ReactCanvas2dExtensions.CanvasOffscreen dependence={[x, y, w, h, animationCountAppear, card]}>
    <layout x={x} y={y} w={w} h={h} globalAlpha={animationCountAppear}>
      <rectradiusarc cx='50%' cy='50%' w={`calc(100% - ${Math.min(w, h) * 0.006})`} h={`calc(100% - ${Math.min(w, h) * 0.006})`} stroke radius={Math.min(w, h) * 0.064} shadowBlur={Math.min(w, h) * 0.08} strokeStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' lineWidth={Math.min(w, h) * 0.012} />

      <rectradiusarc cx='50%' cy='50%' w={`calc(100% - ${Math.min(w, h) * 0.012})`} h={`calc(100% - ${Math.min(w, h) * 0.012})`} clip radius={Math.min(w, h) * 0.064}>
        <image cx='50%' cy='50%' src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
      </rectradiusarc>

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
            image={contextApp.imagePngWizardStaff4A90E2}
            text={'+8'}
            color='rgb(145, 25, 45)'
          />

          <Block
            x={Math.min(w, h) * 0.16 * 1.25 * 2}
            w={Math.min(w, h) * 0.16}
            h={Math.min(w, h) * 0.16}
            image={contextApp.imagePngLayeredArmor8B572A}
            text={'+12'}
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

      {/* <Block
        x={w / 2 - Math.min(w, h) * 0.72 / 2}
        y={h - Math.min(w, h) * 0.24 - Math.min(w, h) * 0.12}
        w={Math.min(w, h) * 0.72}
        h={Math.min(w, h) * 0.24}
        image={contextApp.imagePngBeanstalkWhite}
        text={card.descriptionName}
        color='rgb(125, 125, 125)'
      /> */}

      {/* <Block
        x={0 - Math.min(w, h) * 0.12}
        y={Math.min(w, h) * 0.08 + Math.min(w, h) * 0.28 * 0}
        w={Math.min(w, h) * 0.24}
        h={Math.min(w, h) * 0.24}
        image={contextApp.imagePngBeanstalkWhite}
        color='rgb(15, 125, 25)'
      />

      <Block
        x={0 - Math.min(w, h) * 0.12}
        y={Math.min(w, h) * 0.08 + Math.min(w, h) * 0.28 * 1}
        w={Math.min(w, h) * 0.24}
        h={Math.min(w, h) * 0.24}
        image={contextApp.imagePngWizardStaff4A90E2}
        text={'+8'}
        color='rgb(145, 25, 45)'
      />

      <Block
        x={0 - Math.min(w, h) * 0.12}
        y={Math.min(w, h) * 0.08 + Math.min(w, h) * 0.28 * 2}
        w={Math.min(w, h) * 0.24}
        h={Math.min(w, h) * 0.24}
        image={contextApp.imagePngLayeredArmor8B572A}
        text={'+12'}
        color='rgb(25, 65, 125)'
      /> */}
    </layout>
  </ReactCanvas2dExtensions.CanvasOffscreen >
}

export default App