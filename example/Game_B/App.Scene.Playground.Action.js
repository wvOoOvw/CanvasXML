import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function Pause() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = contextApp.unitpx * 0.12
  const h = contextApp.unitpx * 0.12
  const x = contextApp.locationLayout.w - w - contextApp.unitpx * 0.08
  const y = contextApp.locationLayout.h - h - contextApp.unitpx * 0.28

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameContinue ? 0 : 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const onPointerDown = (e) => {
    e.stopPropagation()
    contextPlayground.setGameContinue(i => !i)
  }

  const Component =
    <>
      <layout x={x} y={y} w={w} h={h} zIndex={contextPlayground.zIndex.Action}>
        <image cx='50%' cy='25%' w='65%' h='65%' src={contextApp.imagePngPauseButtonWhite} />
        <ReactCanvas2dExtensions.Text text={'暂停'} font={`bolder ${h * 0.24}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return <text cx='50%' cy='85%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
            }
          }
        </ReactCanvas2dExtensions.Text>
        <rect onPointerDown={onPointerDown} />
      </layout>
      {
        animationCountAppear > 0 ?
          <layout zIndex={contextPlayground.zIndex.ActionMask}>
            <rect fill fillStyle='rgb(0, 0, 0)' globalAlpha={animationCountAppear * 0.8} onPointerDown={e => e.stopPropagation()} />
            <rect cx={contextApp.locationLayout.w / 2 - contextApp.unitpx * 0.12} cy='50%' w={contextApp.unitpx * 0.12} h={contextApp.unitpx * 0.12} globalAlpha={animationCountAppear} onPointerDown={onPointerDown}>
              <image src={contextApp.imagePngPlayButtonWhite} />
            </rect>
            <rect cx={contextApp.locationLayout.w / 2 + contextApp.unitpx * 0.12} cy='50%' w={contextApp.unitpx * 0.12} h={contextApp.unitpx * 0.12} globalAlpha={animationCountAppear} onPointerDown={onPointerDown}>
              <image src={contextApp.imagePngClockwiseRotationWhite} />
            </rect>
          </layout >
          : null
      }
    </>

  return Component
}

function Round() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = contextApp.unitpx * 0.12
  const h = contextApp.unitpx * 0.12
  const x = contextApp.locationLayout.w - w - contextApp.unitpx * 0.08
  const y = contextApp.locationLayout.h - h - contextApp.unitpx * 0.08

  const onPointerDown = (e) => {

  }

  const Component =
    <layout x={x} y={y} w={w} h={h} zIndex={contextPlayground.zIndex.Action}>
      <image cx='50%' cy='25%' w='65%' h='65%' src={contextApp.imagePngCardExchangeWhite} />
      <ReactCanvas2dExtensions.Text text={'结束回合'} font={`bolder ${h * 0.24}px sans-serif`} w={Infinity}>
        {
          (line, location) => {
            return <text cx='50%' cy='85%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
          }
        }
      </ReactCanvas2dExtensions.Text>
      <rect onPointerDown={onPointerDown} />
    </layout>

  return Component
}

function App() {
  const Component =
    <>
      <Pause />
      <Round />
    </>

  return Component
}

export default App