import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function Line(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = props.w
  const h = props.h
  const x = props.x
  const y = props.y
  const image = props.image
  const text = props.text
  const color = props.color

  return <layout x={x} y={y} w={w} h={h}>
    <rectradiusarc cx='50%' cy='50%' stroke strokeStyle={color} radius={h * 0.16} lineWidth={h * 0.048} />
    <image x={w * 0.08} cy='50%' w={h * 0.64} h={h * 0.64} src={image} />
    <rectradiusarc x={w * 0.08 + h * 0.64 + w * 0.064} cy='50%' w={h * 0.064} h={h * 0.64} fill fillStyle='rgb(255, 255, 255)' radius={h * 0.032} />
    <ReactCanvas2dExtensions.Text text={text} font={`bolder ${h * 0.48}px sans-serif`} w={Infinity}>
      {
        (line, location) => {
          return line.map(i => {
            return <text x={w - w * 0.12 - i.w} cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={text} font={i.font} />
          })
        }
      }
    </ReactCanvas2dExtensions.Text>
  </layout>
}

function Avatar(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = props.w
  const h = props.h
  const x = props.x
  const y = props.y
  const image = props.image
  const color = props.color

  return <layout x={x} y={y} w={w} h={h}>
    <rectradiusarc clip radius={h * 0.16} lineWidth={w * 0.016}>
      <image cx='50%' cy='50%' src={image} clipHorizontalCenter clipVerticalCenter />
    </rectradiusarc>
    <rectradiusarc stroke strokeStyle={color} radius={h * 0.16} lineWidth={w * 0.016} />
  </layout>
}

function Self() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return <layout zIndex={contextPlayground.zIndex.Status}>

    <ReactCanvas2dExtensions.CanvasOffscreen dependence={[contextApp.locationLayout.w, contextApp.locationLayout.h, contextApp.locationLayout.x, contextApp.locationLayout.y, contextPlayground.gameSelfActionPoint, contextPlayground.gameSelfGoldPoint, contextPlayground.gameSelfHitPoint]}>
      <Line
        x={contextApp.unitpx * 0.08}
        y={contextApp.locationLayout.h - contextApp.unitpx * 0.12 - contextApp.unitpx * 0.096 * 3}
        w={contextApp.unitpx * 0.24}
        h={contextApp.unitpx * 0.08}
        image={contextApp.imagePngCampfireWhite}
        text={String(contextPlayground.gameSelfActionPoint)}
        color='rgb(255, 255, 255)'
      />
      <Line
        x={contextApp.unitpx * 0.08}
        y={contextApp.locationLayout.h - contextApp.unitpx * 0.12 - contextApp.unitpx * 0.096 * 2}
        w={contextApp.unitpx * 0.24}
        h={contextApp.unitpx * 0.08}
        image={contextApp.imagePngSwapBagWhite}
        text={String(contextPlayground.gameSelfGoldPoint)}
        color='rgb(255, 255, 255)'
      />
      <Line
        x={contextApp.unitpx * 0.08}
        y={contextApp.locationLayout.h - contextApp.unitpx * 0.12 - contextApp.unitpx * 0.096 * 1}
        w={contextApp.unitpx * 0.24}
        h={contextApp.unitpx * 0.08}
        image={contextApp.imagePngHeartBeatsWhite}
        text={String(contextPlayground.gameSelfHitPoint)}
        color='rgb(255, 255, 255)'
      />
      <Avatar
        x={contextApp.unitpx * 0.08}
        y={contextApp.locationLayout.h - contextApp.unitpx * 0.12 - contextApp.unitpx * 0.096 * 0}
        w={contextApp.unitpx * 0.24}
        h={contextApp.unitpx * 0.08}
        image={contextApp[contextPlayground.informationJson.gameSelf.profileImageIndex]}
        color='rgb(255, 255, 255)'
      />
    </ReactCanvas2dExtensions.CanvasOffscreen>

  </layout>
}

function Opponent() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return <layout zIndex={contextPlayground.zIndex.Status}>

    <ReactCanvas2dExtensions.CanvasOffscreen dependence={[contextApp.locationLayout.w, contextApp.locationLayout.h, contextApp.locationLayout.x, contextApp.locationLayout.y, contextPlayground.gameSelfActionPoint, contextPlayground.gameSelfGoldPoint, contextPlayground.gameSelfHitPoint]}>
      <Avatar
        x={contextApp.unitpx * 0.08}
        y={contextApp.unitpx * 0.04 + contextApp.unitpx * 0.096 * 0}
        w={contextApp.unitpx * 0.24}
        h={contextApp.unitpx * 0.08}
        image={contextApp[contextPlayground.informationJson.gameOpponent.profileImageIndex]}
        color='rgb(255, 255, 255)'
      />
      <Line
        x={contextApp.unitpx * 0.08}
        y={contextApp.unitpx * 0.04 + contextApp.unitpx * 0.096 * 1}
        w={contextApp.unitpx * 0.24}
        h={contextApp.unitpx * 0.08}
        image={contextApp.imagePngHeartBeatsWhite}
        text={String(contextPlayground.gameOpponentHitPoint)}
        color='rgb(255, 255, 255)'
      />
      <Line
        x={contextApp.unitpx * 0.08}
        y={contextApp.unitpx * 0.04 + contextApp.unitpx * 0.096 * 2}
        w={contextApp.unitpx * 0.24}
        h={contextApp.unitpx * 0.08}
        image={contextApp.imagePngSwapBagWhite}
        text={String(contextPlayground.gameOpponentGoldPoint)}
        color='rgb(255, 255, 255)'
      />
      <Line
        x={contextApp.unitpx * 0.08}
        y={contextApp.unitpx * 0.04 + contextApp.unitpx * 0.096 * 3}
        w={contextApp.unitpx * 0.24}
        h={contextApp.unitpx * 0.08}
        image={contextApp.imagePngCampfireWhite}
        text={String(contextPlayground.gameOpponentActionPoint)}
        color='rgb(255, 255, 255)'
      />
    </ReactCanvas2dExtensions.CanvasOffscreen>

  </layout>
}

function App() {
  return [<Self />, <Opponent />]
}

export default App