import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function ComponentCardEmpty(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = props.w
  const h = props.h
  const x = props.x
  const y = props.y

  const Component =
    <ReactCanvas2dExtensions.CanvasOffscreen dependence={[x, y, w, h]}>
      <layout x={x} y={y} w={w} h={h}>
        <rectradiusarc stroke radius={w * 0.064} strokeStyle='rgb(255, 255, 255)' lineWidth={w * 0.012} />
        <image cx='50%' cy='35%' w={w * 0.4} h={w * 0.4} src={contextApp.imagePngSwordmanWhite} />
        <ReactCanvas2dExtensions.Text text='待部署区' font={`bolder ${w * 0.12}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return <text cx='50%' cy='60%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
            }
          }
        </ReactCanvas2dExtensions.Text>
        <ReactCanvas2dExtensions.Text text='战斗' font={`bolder ${w * 0.08}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return <text cx='50%' cy='70%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
            }
          }
        </ReactCanvas2dExtensions.Text>
      </layout>
    </ReactCanvas2dExtensions.CanvasOffscreen>

  return Component
}

function ComponentCard(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = props.w
  const h = props.h
  const x = props.x
  const y = props.y

  const Component =
    <ReactCanvas2dExtensions.CanvasOffscreen dependence={[x, y, w, h]}>
      <layout x={x} y={y} w={w} h={h}>
        <rectradiusarc stroke radius={w * 0.064} strokeStyle='rgb(255, 255, 255)' lineWidth={w * 0.012} />
        <image cx='50%' cy='35%' w={w * 0.4} h={w * 0.4} src={contextApp.imagePngSwordmanWhite} />
        <ReactCanvas2dExtensions.Text text='待部署区' font={`bolder ${w * 0.12}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return <text cx='50%' cy='60%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
            }
          }
        </ReactCanvas2dExtensions.Text>
        <ReactCanvas2dExtensions.Text text='战斗' font={`bolder ${w * 0.08}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return <text cx='50%' cy='70%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
            }
          }
        </ReactCanvas2dExtensions.Text>
      </layout>
    </ReactCanvas2dExtensions.CanvasOffscreen>

  return Component
}

function CardSelf() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = contextPlayground.gameSelfCardBattle

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42

  var x = contextApp.locationLayout.w / 2 - w / 2 - w * 1.75
  var y = contextApp.locationLayout.h / 2 - h / 2

  const Component =
    <layout zIndex={contextPlayground.zIndex.CardBattle}>
      {
        card !== undefined ? <ComponentCard x={x} y={y} w={w} h={h} card={card} /> : null
      }
      {
        card === undefined ? <ComponentCardEmpty x={x} y={y} w={w} h={h} /> : null
      }
    </layout>

  return Component
}

function CardOpponent() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = contextPlayground.gameSelfCardBattle

  const w = contextApp.unitpx * 0.28
  const h = contextApp.unitpx * 0.42

  var x = contextApp.locationLayout.w / 2 - w / 2 + w * 1.75
  var y = contextApp.locationLayout.h / 2 - h / 2

  const Component =
    <layout zIndex={contextPlayground.zIndex.CardBattle}>
      {
        card !== undefined ? <ComponentCard x={x} y={y} w={w} h={h} card={card} /> : null
      }
      {
        card === undefined ? <ComponentCardEmpty x={x} y={y} w={w} h={h} /> : null
      }
    </layout>

  return Component
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <>
      <CardSelf />
      <CardOpponent />
    </>

  return Component
}

export default App