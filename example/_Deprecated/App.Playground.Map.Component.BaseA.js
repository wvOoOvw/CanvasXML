import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      dimension: [12, 4],

      privateDomCollisions: []
    }, optionOverlay
  )

  const onDimension = () => option.dimension

  const onDomCollisions = () => option.privateDomCollisions

  return { type: 'MapBaseA', option: option, onDimension, onDomCollisions }
}


function Entry(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const option = props.option

  const x = props.x
  const y = props.y

  const size = contextApp.unitpx * 0.48

  const { animationCount: animationCountInfinity } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay, defaultCount: 0, destination: Infinity, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  return <layout cx={x} cy={y} w={size} h={size} onLocationMounted={dom => option.privateDomCollisions.push({ ...dom, type: 'entry' })}>
    <arc stroke cx='50%' cy='50%' strokeStyle='rgb(255, 255, 255)' radius={size / 2 - size / 2 * 0.25 * 0} sAngle={Math.PI * 0 + Math.PI * 0.25 * 0 + Math.PI * animationCountInfinity * 0.1} eAngle={Math.PI * 0.75 + Math.PI * 0.25 * 0 + Math.PI * animationCountInfinity * 0.1} lineWidth={contextApp.unitpx * 0.012} />
    <arc stroke cx='50%' cy='50%' strokeStyle='rgb(255, 255, 255)' radius={size / 2 - size / 2 * 0.25 * 0} sAngle={Math.PI * 1 + Math.PI * 0.25 * 0 + Math.PI * animationCountInfinity * 0.1} eAngle={Math.PI * 1.75 + Math.PI * 0.25 * 0 + Math.PI * animationCountInfinity * 0.1} lineWidth={contextApp.unitpx * 0.012} />
    <circle stroke cx='50%' cy='50%' strokeStyle='rgb(255, 255, 255)' radius={size / 2 - size / 2 * 0.25 * 1} sAngle={Math.PI * 0 + Math.PI * 0.25 * 1 + Math.PI * animationCountInfinity * 0.1 * -1} eAngle={Math.PI * 0.75 + Math.PI * 0.25 * 1 + Math.PI * animationCountInfinity * 0.1 * -1} lineWidth={contextApp.unitpx * 0.012} />
    <circle stroke cx='50%' cy='50%' strokeStyle='rgb(255, 255, 255)' radius={size / 2 - size / 2 * 0.25 * 1} sAngle={Math.PI * 1 + Math.PI * 0.25 * 1 + Math.PI * animationCountInfinity * 0.1 * -1} eAngle={Math.PI * 1.75 + Math.PI * 0.25 * 1 + Math.PI * animationCountInfinity * 0.1 * -1} lineWidth={contextApp.unitpx * 0.012} />
    <circle stroke cx='50%' cy='50%' strokeStyle='rgb(255, 255, 255)' radius={size / 2 - size / 2 * 0.25 * 2} sAngle={Math.PI * 0 + Math.PI * 0.25 * 2 + Math.PI * animationCountInfinity * 0.1} eAngle={Math.PI * 0.75 + Math.PI * 0.25 * 2 + Math.PI * animationCountInfinity * 0.1} lineWidth={contextApp.unitpx * 0.012} />
    <circle stroke cx='50%' cy='50%' strokeStyle='rgb(255, 255, 255)' radius={size / 2 - size / 2 * 0.25 * 2} sAngle={Math.PI * 1 + Math.PI * 0.25 * 2 + Math.PI * animationCountInfinity * 0.1} eAngle={Math.PI * 1.75 + Math.PI * 0.25 * 2 + Math.PI * animationCountInfinity * 0.1} lineWidth={contextApp.unitpx * 0.012} />
  </layout>
}

function Exit(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const option = props.option

  const x = props.x
  const y = props.y

  const size = contextApp.unitpx * 0.48

  const { animationCount: animationCountInfinity } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay, defaultCount: 0, destination: Infinity, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  return <layout cx={x} cy={y} w={size} h={size} onLocationMounted={dom => option.privateDomCollisions.push({ ...dom, type: 'exit' })}>
    <arc stroke cx='50%' cy='50%' strokeStyle='rgb(125, 75, 75)' radius={size / 2 - size / 2 * 0.25 * 0} sAngle={Math.PI * 0 + Math.PI * 0.25 * 0 + Math.PI * animationCountInfinity * 0.1} eAngle={Math.PI * 0.75 + Math.PI * 0.25 * 0 + Math.PI * animationCountInfinity * 0.1} lineWidth={contextApp.unitpx * 0.012} />
    <arc stroke cx='50%' cy='50%' strokeStyle='rgb(125, 75, 75)' radius={size / 2 - size / 2 * 0.25 * 0} sAngle={Math.PI * 1 + Math.PI * 0.25 * 0 + Math.PI * animationCountInfinity * 0.1} eAngle={Math.PI * 1.75 + Math.PI * 0.25 * 0 + Math.PI * animationCountInfinity * 0.1} lineWidth={contextApp.unitpx * 0.012} />
    <circle stroke cx='50%' cy='50%' strokeStyle='rgb(125, 75, 75)' radius={size / 2 - size / 2 * 0.25 * 1} sAngle={Math.PI * 0 + Math.PI * 0.25 * 1 + Math.PI * animationCountInfinity * 0.1 * -1} eAngle={Math.PI * 0.75 + Math.PI * 0.25 * 1 + Math.PI * animationCountInfinity * 0.1 * -1} lineWidth={contextApp.unitpx * 0.012} />
    <circle stroke cx='50%' cy='50%' strokeStyle='rgb(125, 75, 75)' radius={size / 2 - size / 2 * 0.25 * 1} sAngle={Math.PI * 1 + Math.PI * 0.25 * 1 + Math.PI * animationCountInfinity * 0.1 * -1} eAngle={Math.PI * 1.75 + Math.PI * 0.25 * 1 + Math.PI * animationCountInfinity * 0.1 * -1} lineWidth={contextApp.unitpx * 0.012} />
    <circle stroke cx='50%' cy='50%' strokeStyle='rgb(125, 75, 75)' radius={size / 2 - size / 2 * 0.25 * 2} sAngle={Math.PI * 0 + Math.PI * 0.25 * 2 + Math.PI * animationCountInfinity * 0.1} eAngle={Math.PI * 0.75 + Math.PI * 0.25 * 2 + Math.PI * animationCountInfinity * 0.1} lineWidth={contextApp.unitpx * 0.012} />
    <circle stroke cx='50%' cy='50%' strokeStyle='rgb(125, 75, 75)' radius={size / 2 - size / 2 * 0.25 * 2} sAngle={Math.PI * 1 + Math.PI * 0.25 * 2 + Math.PI * animationCountInfinity * 0.1} eAngle={Math.PI * 1.75 + Math.PI * 0.25 * 2 + Math.PI * animationCountInfinity * 0.1} lineWidth={contextApp.unitpx * 0.012} />
  </layout>
}


function App(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const option = props.option

  const containerW = contextApp.locationLayout.w * 0.8
  const containerH = contextApp.locationLayout.h * 0.8

  const dimensionW = containerW / option.dimension[0]
  const dimensionH = containerH / option.dimension[1]

  const dimensionMin = Math.min(dimensionW, dimensionH)

  const realContainerW = option.dimension[0] * dimensionMin
  const realContainerH = option.dimension[1] * dimensionMin

  // const centerX = contextApp.locationLayout.x + contextApp.locationLayout.w / 2
  // const centerY = contextApp.locationLayout.y + contextApp.locationLayout.h / 2

  // const entry = [
  //   {
  //     x: centerX - contextApp.unitpx * 0.64,
  //     y: centerY - contextApp.unitpx * 0.32,
  //   },
  //   {
  //     x: centerX - contextApp.unitpx * 0.64,
  //     y: centerY + contextApp.unitpx * 0.32,
  //   },
  // ]

  // const exit = [
  //   {
  //     x: centerX + contextApp.unitpx * 0.64,
  //     y: centerY - contextApp.unitpx * 0.32,
  //   },
  //   {
  //     x: centerX + contextApp.unitpx * 0.64,
  //     y: centerY + contextApp.unitpx * 0.32,
  //   },
  // ]

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay, defaultCount: 0, destination: 1, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  return <layout globalAlpha={animationCountAppear} zIndex={contextPlayground.zIndex.MapMeth} onLocationMounted={() => option.privateDomCollisions = []}>

    <layout cx='50%' cy='50%' w={realContainerW} h={realContainerH} container horizontalForward>
      {
        new Array(option.dimension[0]).fill().map((x, xIndex) => {
          return <layout w={0} grow={1} container item verticalForward>

            {
              new Array(option.dimension[1]).fill().map((y, yIndex) => {
                return <layout h={0} grow={1} item>
                  <image src={contextApp.imagePngBlack_crystal1} />
                </layout>
              })
            }

          </layout>
        })
      }
    </layout>

  </layout>

  return <layout globalAlpha={animationCountAppear} zIndex={contextPlayground.zIndex.MapMeth} onLocationMounted={() => option.privateDomCollisions = []}>
    {
      entry.map(i => <Entry {...i} option={option} />)
    }
    {
      exit.map(i => <Exit {...i} option={option} />)
    }
  </layout>
}

export { init, App }