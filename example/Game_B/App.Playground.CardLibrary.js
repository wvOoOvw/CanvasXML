import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import CardBack from './App.Playground.Component.CardBack'

function Action() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = contextApp.unitpx * 0.12
  const h = contextApp.unitpx * 0.12
  const x = contextApp.locationLayout.x + contextApp.locationLayout.w - w - contextApp.unitpx * 0.08
  const y = contextApp.locationLayout.y + contextApp.locationLayout.h / 2 - h / 2

  const onPointerDown = (e) => {

  }

  return <layout x={x} y={y} w={w} h={h} zIndex={contextPlayground.zIndex.CardLibraryAction}>
    <rect onPointerDown={onPointerDown} />
    <image cx='50%' cy='50%' w={w} h={h} src={contextApp.imagePngCycleWhite} />
  </layout>
}

function Self(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const index = props.index

  const w = contextApp.unitpx * 0.16
  const h = contextApp.unitpx * 0.16 * 1.5
  const x = contextApp.locationLayout.x + contextApp.locationLayout.w - w + contextApp.unitpx * 0.028 * (2 - index)
  const y = contextApp.locationLayout.y + contextApp.locationLayout.h / 2 - h / 2 + contextApp.unitpx * 0.2 + contextApp.unitpx * 0.028 * (2 - index)

  const rotateAngle = 0 - Math.PI * 0.65 - Math.PI * 0.04 * (2 - index)
  const rotateTranslateX = x + w / 2
  const rotateTranslateY = y + h / 2

  return <layout zIndex={contextPlayground.zIndex.CardLibrary}>
    <ReactCanvas2dExtensions.CanvasOffscreen dependent={[x, y, w, h, rotateTranslateX, rotateTranslateY, rotateAngle]}>
      <CardBack
        x={x}
        y={y}
        w={w}
        h={h}
        translateX={rotateTranslateX}
        translateY={rotateTranslateY}
        rotateAngle={rotateAngle}
        imageIndex='imagePngVileFluidWhite'
      />
    </ReactCanvas2dExtensions.CanvasOffscreen>
  </layout>
}

function Opponent(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const index = props.index

  const w = contextApp.unitpx * 0.16
  const h = contextApp.unitpx * 0.16 * 1.5
  const x = contextApp.locationLayout.x + contextApp.locationLayout.w - w + contextApp.unitpx * 0.028 * (2 - index)
  const y = contextApp.locationLayout.y + contextApp.locationLayout.h / 2 - h / 2 - contextApp.unitpx * 0.2 - contextApp.unitpx * 0.028 * (2 - index)

  const rotateAngle = 0 - Math.PI * 0.35 + Math.PI * 0.04 * (2 - index)
  const rotateTranslateX = x + w / 2
  const rotateTranslateY = y + h / 2

  return <layout zIndex={contextPlayground.zIndex.CardLibrary}>
    <ReactCanvas2dExtensions.CanvasOffscreen dependent={[x, y, w, h, rotateTranslateX, rotateTranslateY, rotateAngle]}>
      <CardBack
        x={x}
        y={y}
        w={w}
        h={h}
        translateX={rotateTranslateX}
        translateY={rotateTranslateY}
        rotateAngle={rotateAngle}
        imageIndex='imagePngCampfireWhite'
      />
    </ReactCanvas2dExtensions.CanvasOffscreen>
  </layout>
}

function App() {
  return <>
    {
      new Array(3).fill().map((i, index) => <Self index={index} />)
    }

    {
      new Array(3).fill().map((i, index) => <Opponent index={index} />)
    }

    <Action />
  </>
}

export default App