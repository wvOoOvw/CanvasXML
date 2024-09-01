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
      dimension: [8, 4],

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

  const { animationCount: animationCountInfinity } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay, defaultCount: 0, destination: Infinity, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  return <layout cx='50%' cy='50%' w={contextPlayground.unitpx} h={contextPlayground.unitpx} onLocationMounted={dom => option.privateDomCollisions.push({ ...dom, type: 'entry' })}>
    <arc stroke cx='50%' cy='50%' strokeStyle='rgb(255, 255, 255)' radius={contextPlayground.unitpx / 2 - contextPlayground.unitpx / 2 * 0.25 * 0} sAngle={Math.PI * 0 + Math.PI * 0.25 * 0 + Math.PI * animationCountInfinity * 0.1} eAngle={Math.PI * 0.75 + Math.PI * 0.25 * 0 + Math.PI * animationCountInfinity * 0.1} lineWidth={contextApp.unitpx * 0.012} />
    <arc stroke cx='50%' cy='50%' strokeStyle='rgb(255, 255, 255)' radius={contextPlayground.unitpx / 2 - contextPlayground.unitpx / 2 * 0.25 * 0} sAngle={Math.PI * 1 + Math.PI * 0.25 * 0 + Math.PI * animationCountInfinity * 0.1} eAngle={Math.PI * 1.75 + Math.PI * 0.25 * 0 + Math.PI * animationCountInfinity * 0.1} lineWidth={contextApp.unitpx * 0.012} />
    {/* <circle stroke cx='50%' cy='50%' strokeStyle='rgb(255, 255, 255)' radius={size / 2 - size / 2 * 0.25 * 1} sAngle={Math.PI * 0 + Math.PI * 0.25 * 1 + Math.PI * animationCountInfinity * 0.1 * -1} eAngle={Math.PI * 0.75 + Math.PI * 0.25 * 1 + Math.PI * animationCountInfinity * 0.1 * -1} lineWidth={contextApp.unitpx * 0.012} />
    <circle stroke cx='50%' cy='50%' strokeStyle='rgb(255, 255, 255)' radius={size / 2 - size / 2 * 0.25 * 1} sAngle={Math.PI * 1 + Math.PI * 0.25 * 1 + Math.PI * animationCountInfinity * 0.1 * -1} eAngle={Math.PI * 1.75 + Math.PI * 0.25 * 1 + Math.PI * animationCountInfinity * 0.1 * -1} lineWidth={contextApp.unitpx * 0.012} />
    <circle stroke cx='50%' cy='50%' strokeStyle='rgb(255, 255, 255)' radius={size / 2 - size / 2 * 0.25 * 2} sAngle={Math.PI * 0 + Math.PI * 0.25 * 2 + Math.PI * animationCountInfinity * 0.1} eAngle={Math.PI * 0.75 + Math.PI * 0.25 * 2 + Math.PI * animationCountInfinity * 0.1} lineWidth={contextApp.unitpx * 0.012} />
    <circle stroke cx='50%' cy='50%' strokeStyle='rgb(255, 255, 255)' radius={size / 2 - size / 2 * 0.25 * 2} sAngle={Math.PI * 1 + Math.PI * 0.25 * 2 + Math.PI * animationCountInfinity * 0.1} eAngle={Math.PI * 1.75 + Math.PI * 0.25 * 2 + Math.PI * animationCountInfinity * 0.1} lineWidth={contextApp.unitpx * 0.012} /> */}
  </layout>
}

function Exit(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const option = props.option

  const { animationCount: animationCountInfinity } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay, defaultCount: 0, destination: Infinity, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  return <layout cx='50%' cy='50%' w={contextPlayground.unitpx} h={contextPlayground.unitpx} onLocationMounted={dom => option.privateDomCollisions.push({ ...dom, type: 'exit' })}>
    <arc stroke cx='50%' cy='50%' strokeStyle='rgb(125, 75, 75)' radius={contextPlayground.unitpx / 2 - contextPlayground.unitpx / 2 * 0.25 * 0} sAngle={Math.PI * 0 + Math.PI * 0.25 * 0 + Math.PI * animationCountInfinity * 0.1} eAngle={Math.PI * 0.75 + Math.PI * 0.25 * 0 + Math.PI * animationCountInfinity * 0.1} lineWidth={contextApp.unitpx * 0.012} />
    <arc stroke cx='50%' cy='50%' strokeStyle='rgb(125, 75, 75)' radius={contextPlayground.unitpx / 2 - contextPlayground.unitpx / 2 * 0.25 * 0} sAngle={Math.PI * 1 + Math.PI * 0.25 * 0 + Math.PI * animationCountInfinity * 0.1} eAngle={Math.PI * 1.75 + Math.PI * 0.25 * 0 + Math.PI * animationCountInfinity * 0.1} lineWidth={contextApp.unitpx * 0.012} />
    {/* <circle stroke cx='50%' cy='50%' strokeStyle='rgb(125, 75, 75)' radius={size / 2 - size / 2 * 0.25 * 1} sAngle={Math.PI * 0 + Math.PI * 0.25 * 1 + Math.PI * animationCountInfinity * 0.1 * -1} eAngle={Math.PI * 0.75 + Math.PI * 0.25 * 1 + Math.PI * animationCountInfinity * 0.1 * -1} lineWidth={contextApp.unitpx * 0.012} />
    <circle stroke cx='50%' cy='50%' strokeStyle='rgb(125, 75, 75)' radius={size / 2 - size / 2 * 0.25 * 1} sAngle={Math.PI * 1 + Math.PI * 0.25 * 1 + Math.PI * animationCountInfinity * 0.1 * -1} eAngle={Math.PI * 1.75 + Math.PI * 0.25 * 1 + Math.PI * animationCountInfinity * 0.1 * -1} lineWidth={contextApp.unitpx * 0.012} />
    <circle stroke cx='50%' cy='50%' strokeStyle='rgb(125, 75, 75)' radius={size / 2 - size / 2 * 0.25 * 2} sAngle={Math.PI * 0 + Math.PI * 0.25 * 2 + Math.PI * animationCountInfinity * 0.1} eAngle={Math.PI * 0.75 + Math.PI * 0.25 * 2 + Math.PI * animationCountInfinity * 0.1} lineWidth={contextApp.unitpx * 0.012} />
    <circle stroke cx='50%' cy='50%' strokeStyle='rgb(125, 75, 75)' radius={size / 2 - size / 2 * 0.25 * 2} sAngle={Math.PI * 1 + Math.PI * 0.25 * 2 + Math.PI * animationCountInfinity * 0.1} eAngle={Math.PI * 1.75 + Math.PI * 0.25 * 2 + Math.PI * animationCountInfinity * 0.1} lineWidth={contextApp.unitpx * 0.012} /> */}
  </layout>
}


function App(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const option = props.option

  const realContainerW = option.dimension[0] * contextPlayground.unitpx
  const realContainerH = option.dimension[1] * contextPlayground.unitpx

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay, defaultCount: 0, destination: 1, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  return <layout globalAlpha={animationCountAppear} zIndex={contextPlayground.zIndex.MapMeth} onLocationMounted={() => option.privateDomCollisions = []}>
    <layout cx='50%' cy='40%' w={realContainerW} h={realContainerH} container horizontalForward>
      <rect stroke strokeStyle='white' />
      {
        new Array(option.dimension[0]).fill().map((x, xIndex) => {
          return <layout w={0} grow={1} container item verticalForward>
            {
              new Array(option.dimension[1]).fill().map((y, yIndex) => {
                if (xIndex === 0 && yIndex === 0) return <layout h={0} grow={1} item><Entry option={option} /></layout>
                if (xIndex === 7 && yIndex === 3) return <layout h={0} grow={1} item><Exit option={option} /></layout>

                return <layout h={0} grow={1} item>
                  <image src={contextApp.imagePngGreen_crystal1}/>
                </layout>
              })
            }
          </layout>
        })
      }
    </layout>
  </layout>
}

export { init, App }