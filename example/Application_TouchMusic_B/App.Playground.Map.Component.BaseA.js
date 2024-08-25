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
      privateDomCollisions: []
    }, optionOverlay
  )

  const onDomCollisions = () => option.privateDomCollisions

  return { type: 'MapBaseA', option: option, onDomCollisions }
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
    <ReactCanvas2dExtensions.Rotate rotateAngle={Math.PI * animationCountInfinity * 0.1 * 2 + Math.PI * 0.25 * 0} onLocationMounted={(dom) => { dom.props.translateX = dom.props.cx; dom.props.translateY = dom.props.cy; }}>
      <arc stroke cx='50%' cy='50%' strokeStyle='rgb(255, 255, 255)' radius={size / 2 - size / 2 * 0.25 * 0} sAngle={Math.PI * 0} eAngle={Math.PI * 0.75} counterclockwise={false} lineWidth={contextApp.unitpx * 0.012} />
      <arc stroke cx='50%' cy='50%' strokeStyle='rgb(255, 255, 255)' radius={size / 2 - size / 2 * 0.25 * 0} sAngle={Math.PI * 1} eAngle={Math.PI * 1.75} counterclockwise={false} lineWidth={contextApp.unitpx * 0.012} />
    </ReactCanvas2dExtensions.Rotate>

    <ReactCanvas2dExtensions.Rotate rotateAngle={Math.PI * animationCountInfinity * 0.1 * -1 + Math.PI * 0.25 * 1} onLocationMounted={(dom) => { dom.props.translateX = dom.props.cx; dom.props.translateY = dom.props.cy; }}>
      <circle stroke cx='50%' cy='50%' strokeStyle='rgb(255, 255, 255)' radius={size / 2 - size / 2 * 0.25 * 1} sAngle={Math.PI * 0} eAngle={Math.PI * 0.75} counterclockwise={false} lineWidth={contextApp.unitpx * 0.012} />
      <circle stroke cx='50%' cy='50%' strokeStyle='rgb(255, 255, 255)' radius={size / 2 - size / 2 * 0.25 * 1} sAngle={Math.PI * 1} eAngle={Math.PI * 1.75} counterclockwise={false} lineWidth={contextApp.unitpx * 0.012} />
    </ReactCanvas2dExtensions.Rotate>

    <ReactCanvas2dExtensions.Rotate rotateAngle={Math.PI * animationCountInfinity * 0.1 + Math.PI * 0.25 * 2} onLocationMounted={(dom) => { dom.props.translateX = dom.props.cx; dom.props.translateY = dom.props.cy; }}>
      <circle stroke cx='50%' cy='50%' strokeStyle='rgb(255, 255, 255)' radius={size / 2 - size / 2 * 0.25 * 2} sAngle={Math.PI * 0} eAngle={Math.PI * 0.75} counterclockwise={false} lineWidth={contextApp.unitpx * 0.012} />
      <circle stroke cx='50%' cy='50%' strokeStyle='rgb(255, 255, 255)' radius={size / 2 - size / 2 * 0.25 * 2} sAngle={Math.PI * 1} eAngle={Math.PI * 1.75} counterclockwise={false} lineWidth={contextApp.unitpx * 0.012} />
    </ReactCanvas2dExtensions.Rotate>
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
    <ReactCanvas2dExtensions.Rotate rotateAngle={Math.PI * animationCountInfinity * 0.1 * 2 + Math.PI * 0.25 * 0} onLocationMounted={(dom) => { dom.props.translateX = dom.props.cx; dom.props.translateY = dom.props.cy; }}>
      <arc stroke cx='50%' cy='50%' strokeStyle='rgb(125, 75, 75)' radius={size / 2 - size / 2 * 0.25 * 0} sAngle={Math.PI * 0} eAngle={Math.PI * 0.75} counterclockwise={false} lineWidth={contextApp.unitpx * 0.012} />
      <arc stroke cx='50%' cy='50%' strokeStyle='rgb(125, 75, 75)' radius={size / 2 - size / 2 * 0.25 * 0} sAngle={Math.PI * 1} eAngle={Math.PI * 1.75} counterclockwise={false} lineWidth={contextApp.unitpx * 0.012} />
    </ReactCanvas2dExtensions.Rotate>

    <ReactCanvas2dExtensions.Rotate rotateAngle={Math.PI * animationCountInfinity * 0.1 * -1 + Math.PI * 0.25 * 1} onLocationMounted={(dom) => { dom.props.translateX = dom.props.cx; dom.props.translateY = dom.props.cy; }}>
      <circle stroke cx='50%' cy='50%' strokeStyle='rgb(125, 75, 75)' radius={size / 2 - size / 2 * 0.25 * 1} sAngle={Math.PI * 0} eAngle={Math.PI * 0.75} counterclockwise={false} lineWidth={contextApp.unitpx * 0.012} />
      <circle stroke cx='50%' cy='50%' strokeStyle='rgb(125, 75, 75)' radius={size / 2 - size / 2 * 0.25 * 1} sAngle={Math.PI * 1} eAngle={Math.PI * 1.75} counterclockwise={false} lineWidth={contextApp.unitpx * 0.012} />
    </ReactCanvas2dExtensions.Rotate>

    <ReactCanvas2dExtensions.Rotate rotateAngle={Math.PI * animationCountInfinity * 0.1 + Math.PI * 0.25 * 2} onLocationMounted={(dom) => { dom.props.translateX = dom.props.cx; dom.props.translateY = dom.props.cy; }}>
      <circle stroke cx='50%' cy='50%' strokeStyle='rgb(125, 75, 75)' radius={size / 2 - size / 2 * 0.25 * 2} sAngle={Math.PI * 0} eAngle={Math.PI * 0.75} counterclockwise={false} lineWidth={contextApp.unitpx * 0.012} />
      <circle stroke cx='50%' cy='50%' strokeStyle='rgb(125, 75, 75)' radius={size / 2 - size / 2 * 0.25 * 2} sAngle={Math.PI * 1} eAngle={Math.PI * 1.75} counterclockwise={false} lineWidth={contextApp.unitpx * 0.012} />
    </ReactCanvas2dExtensions.Rotate>
  </layout>
}


function App(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const option = props.option

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay, defaultCount: 0, destination: 1, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  return <layout globalAlpha={animationCountAppear} zIndex={contextPlayground.zIndex.MapMeth} onLocationMounted={() => option.privateDomCollisions = []}>
    <Entry x={contextApp.locationLayout.x + contextApp.unitpx * 0.64} y={contextApp.locationLayout.y + contextApp.locationLayout.h / 2} option={option} />
    <Exit x={contextApp.locationLayout.x + contextApp.locationLayout.w - contextApp.unitpx * 0.64} y={contextApp.locationLayout.y + contextApp.locationLayout.h / 2} option={option} />
  </layout>
}

export { init, App }