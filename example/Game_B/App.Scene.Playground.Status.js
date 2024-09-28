import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function ComponentProperty(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const color = props.color
  const title = props.title
  const content = props.content

  const Component =
    <layout w={contextApp.unitpx * 0.24} h={contextApp.unitpx * 0.08} item>
      <rectradiusarc cx='50%' cy='50%' fill fillStyle={color} radius={contextApp.unitpx * 0.016} />
      <rectradiusarc cx='50%' cy='50%' stroke strokeStyle='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.016} lineWidth={contextApp.unitpx * 0.0072} />
      <rectradiusarc x={contextApp.unitpx * 0.048 + contextApp.unitpx * 0.024 * 2 - contextApp.unitpx * 0.0072} cy='50%' w={contextApp.unitpx * 0.0072} h={contextApp.unitpx * 0.064} fill fillStyle='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.0072 / 2} />
      <image x={contextApp.unitpx * 0.024} cy='50%' w={contextApp.unitpx * 0.048} h={contextApp.unitpx * 0.048} src={title} />
      <ReactCanvas2dExtensions.Text text={content} font={`bolder ${contextApp.unitpx * 0.032}px sans-serif`} w={Infinity}>
        {
          (line, location) => {
            return <text x={contextApp.unitpx * 0.24 - contextApp.unitpx * 0.024 - line[0].w} cy='50%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
          }
        }
      </ReactCanvas2dExtensions.Text>
    </layout>

  return Component
}

function ComponentAvatar(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const image = props.image

  const Component =
    <layout w={contextApp.unitpx * 0.24} h={contextApp.unitpx * 0.08} item>
      <rectradiusarc fill fillStyle='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.016} />
      <rectradiusarc clip radius={contextApp.unitpx * 0.016} lineWidth={contextApp.unitpx * 0.008}>
        <image cx='50%' cy='50%' src={image} clipHorizontalCenter clipVerticalCenter />
      </rectradiusarc>
      <rectradiusarc stroke strokeStyle='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.016} lineWidth={contextApp.unitpx * 0.008} />
    </layout>

  return Component
}

function InSelf() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <layout zIndex={contextPlayground.zIndex.Status}>
      <ReactCanvas2dExtensions.CanvasOffscreen dependence={[contextApp.locationLayout.w, contextApp.locationLayout.h, contextApp.locationLayout.x, contextApp.locationLayout.y, contextPlayground.gameSelfActionPoint, contextPlayground.gameSelfGoldPoint, contextPlayground.gameSelfHitPoint]}>
        <layout x={contextApp.unitpx * 0.08} y={contextApp.locationLayout.h - contextApp.unitpx * 0.08} w={contextApp.unitpx * 0.24} h={0} item container verticalReverse gap={contextApp.unitpx * 0.02}>
          <ComponentAvatar image={contextApp[contextPlayground.informationJson.gameSelf.profileImageIndex]} />
          <ComponentProperty title={contextApp.imagePngHeartBeatsWhite} content={String(contextPlayground.gameSelfHitPoint)} color='rgb(125, 25, 25)' />
          <ComponentProperty title={contextApp.imagePngSwapBagWhite} content={String(contextPlayground.gameSelfGoldPoint)} color='rgb(115, 115, 0)' />
          <ComponentProperty title={contextApp.imagePngCampfireWhite} content={String(contextPlayground.gameSelfActionPoint)} color='rgb(45, 45, 125)' />
        </layout>
      </ReactCanvas2dExtensions.CanvasOffscreen>
    </layout>

  return Component
}

function InOpponent() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <layout zIndex={contextPlayground.zIndex.Status}>
      <ReactCanvas2dExtensions.CanvasOffscreen dependence={[contextApp.locationLayout.w, contextApp.locationLayout.h, contextApp.locationLayout.x, contextApp.locationLayout.y, contextPlayground.gameSelfActionPoint, contextPlayground.gameSelfGoldPoint, contextPlayground.gameSelfHitPoint]}>
        <layout x={contextApp.unitpx * 0.08} y={contextApp.unitpx * 0.08} w={contextApp.unitpx * 0.24} item container verticalForward gap={contextApp.unitpx * 0.02}>
          <ComponentAvatar image={contextApp[contextPlayground.informationJson.gameOpponent.profileImageIndex]} />
          <ComponentProperty title={contextApp.imagePngHeartBeatsWhite} content={String(contextPlayground.gameOpponentHitPoint)} color='rgb(125, 25, 25)' />
          <ComponentProperty title={contextApp.imagePngSwapBagWhite} content={String(contextPlayground.gameOpponentGoldPoint)} color='rgb(115, 115, 0)' />
          <ComponentProperty title={contextApp.imagePngCampfireWhite} content={String(contextPlayground.gameOpponentActionPoint)} color='rgb(45, 45, 125)' />
        </layout>
      </ReactCanvas2dExtensions.CanvasOffscreen>
    </layout>

  return Component
}

function App() {
  const Component =
    <>
      <InSelf />
      <InOpponent />
    </>

  return Component
}

export default App