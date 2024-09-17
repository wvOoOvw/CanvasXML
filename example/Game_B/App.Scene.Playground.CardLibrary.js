import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import CardBack from './App.Scene.Playground.Component.CardBack'

function CardSelf(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const index = props.index

  const w = contextApp.unitpx * 0.16
  const h = contextApp.unitpx * 0.24
  const x = contextApp.locationLayout.w - w + contextApp.unitpx * 0.028 * (2 - index)
  const y = contextApp.locationLayout.h / 2 - h / 2 + contextApp.unitpx * 0.2 + contextApp.unitpx * 0.028 * (2 - index)

  const rotateTranslateX = contextApp.locationLayout.x + x + w / 2
  const rotateTranslateY = contextApp.locationLayout.y + y + h / 2
  const rotateAngle = 0 - Math.PI * 0.65 - Math.PI * 0.04 * (2 - index)

  return <layout zIndex={contextPlayground.zIndex.CardLibrary}>
    <CardBack
      x={x}
      y={y}
      w={w}
      h={h}
      translateX={rotateTranslateX}
      translateY={rotateTranslateY}
      rotateAngle={rotateAngle}
      imageIndex={contextPlayground.informationJson.gameSelf.cardBackImageIndex}
    />
  </layout>
}

function CardOpponent(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const index = props.index

  const w = contextApp.unitpx * 0.16
  const h = contextApp.unitpx * 0.24
  const x = contextApp.locationLayout.w - w + contextApp.unitpx * 0.028 * (2 - index)
  const y = contextApp.locationLayout.h / 2 - h / 2 - contextApp.unitpx * 0.2 - contextApp.unitpx * 0.028 * (2 - index)

  const rotateTranslateX = contextApp.locationLayout.x + x + w / 2
  const rotateTranslateY = contextApp.locationLayout.y + y + h / 2
  const rotateAngle = 0 - Math.PI * 0.35 + Math.PI * 0.04 * (2 - index)

  return <layout zIndex={contextPlayground.zIndex.CardLibrary}>
    <CardBack
      x={x}
      y={y}
      w={w}
      h={h}
      translateX={rotateTranslateX}
      translateY={rotateTranslateY}
      rotateAngle={rotateAngle}
      imageIndex={contextPlayground.informationJson.gameOpponent.cardBackImageIndex}
    />
  </layout>
}

function App() {
  return <>
    {
      new Array(3).fill().map((i, index) => <CardSelf index={index} />)
    }

    {
      new Array(3).fill().map((i, index) => <CardOpponent index={index} />)
    }
  </>
}

export default App