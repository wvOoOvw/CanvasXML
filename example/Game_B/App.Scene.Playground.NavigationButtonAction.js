import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function ModulePause() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const h = contextApp.unitpx * 0.12

  const [open, setOpen] = React.useState(false)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: open ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const onPointerDown = (e) => {
    e.stopPropagation()
    setOpen(i => !i)
  }

  const Component =
    <>
      <layout x={contextApp.locationLayout.w - contextApp.unitpx * 0.2} y={contextApp.locationLayout.h - contextApp.unitpx * 0.4} w={contextApp.unitpx * 0.12} h={contextApp.unitpx * 0.12} zIndex={contextPlayground.zIndex.NavigationButtonAction}>
        <ReactCanvas2dExtensions.CanvasOffscreen dependence={[]}>
          <image cx='50%' cy='25%' w='65%' h='65%' src={contextApp.imagePngPauseButtonWhite} />
          <ReactCanvas2dExtensions.Text text={'暂停'} font={`bolder ${contextApp.unitpx * 0.028}px sans-serif`} w={Infinity}>
            {
              (line, location) => {
                return <text cx='50%' cy='85%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
              }
            }
          </ReactCanvas2dExtensions.Text>
        </ReactCanvas2dExtensions.CanvasOffscreen>
        <rect onPointerDown={onPointerDown} />
      </layout>
      {
        animationCountAppear > 0 ?
          <layout zIndex={contextPlayground.zIndex.NavigationButtonActionPauseModal}>
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

function ModuleRound() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [touch, setTouch] = React.useState(false)

  const { animationCount: animationCountTouch } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: touch ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountRoundOver } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameSelfRoundOver ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const onPointerDown = () => {
    if (contextPlayground.gameSelfRoundOver !== true) setTouch(true)
  }

  const onPointerUp = () => {
    setTouch(false)
    if (touch) contextPlayground.setGemeSelfRoundOver(true)
  }

  const onPointerUpAway = () => {
    setTouch(false)
  }

  const Component =
    <layout x={contextApp.locationLayout.w - contextApp.unitpx * 0.2} y={contextApp.locationLayout.h - contextApp.unitpx * 0.2} w={contextApp.unitpx * 0.12} h={contextApp.unitpx * 0.12} globalAlpha={(1 - animationCountTouch * 0.5) * (1 - animationCountRoundOver * 0.5)} zIndex={contextPlayground.zIndex.NavigationButtonAction}>
      <ReactCanvas2dExtensions.CanvasOffscreen dependence={[]}>
        <image cx='50%' cy='25%' w='65%' h='65%' src={contextApp.imagePngCardExchangeWhite} />
        <ReactCanvas2dExtensions.Text text={'结束回合'} font={`bolder ${contextApp.unitpx * 0.028}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return <text cx='50%' cy='85%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
            }
          }
        </ReactCanvas2dExtensions.Text>
      </ReactCanvas2dExtensions.CanvasOffscreen>
      <rect onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerUpAway={onPointerUpAway} />
    </layout>

  return Component
}

function Background() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <layout x={contextApp.locationLayout.w - contextApp.unitpx * 0.4} w={contextApp.unitpx * 0.4} zIndex={contextPlayground.zIndex.NavigationButtonAction}>
      <rectradiusarc fill fillStyle='rgb(75, 75, 75)' radius={[0, contextApp.unitpx * 0.04, contextApp.unitpx * 0.04, 0]} globalAlpha={1} />
    </layout>

  return Component
}

function App() {
  const Component =
    <>
      {/* <Background /> */}
      <ModulePause />
      <ModuleRound />
    </>

  return Component
}

export default App