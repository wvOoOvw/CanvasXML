import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [pointerDown, setPointerDown] = React.useState(false)

  const { animationCount: animationCountPointerDown } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: pointerDown ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })

  const w = contextApp.unitpx * 0.24
  const h = contextApp.unitpx * 0.24
  const x = contextApp.unitpx * 0.08
  const y = contextApp.locationLayout.y + contextApp.locationLayout.h - h - contextApp.unitpx * 0.08

  return <layout zIndex={contextPlayground.zIndex.SelfStatus}>

    <layout x={x} y={y} w={w} h={h}>
      <arc cx='50%' cy='50%' radius={contextApp.unitpx * 0.12 + contextApp.unitpx * 0.01} fill fillStyle='rgb(75, 75, 75)' />
      <arc clip cx='50%' cy='50%' radius={contextApp.unitpx * 0.12}>
        <image cx='50%' cy='50%' src={contextApp.imageJpgRoleD} clipHorizontalCenter clipVerticalCenter />
      </arc>
    </layout>

    <layout x={x + w + contextApp.unitpx * 0.02} cy={y + h * 0.25} w={w} h={contextApp.unitpx * 0.08}>
      {
        new Array(contextPlayground.gameSelfActionPoint).fill().map((i, index) => {
          return <image x={index * contextApp.unitpx * 0.08} w={contextApp.unitpx * 0.08} h={contextApp.unitpx * 0.08} cy='50%' src={contextApp.imagePngRobeWhite} />
        })
      }
      {
        contextPlayground.gameSelfActionPoint === 0 ?
          <image w={contextApp.unitpx * 0.08} h={contextApp.unitpx * 0.08} cy='50%' src={contextApp.imagePngCrossedChainsWhite} />
          : null
      }
    </layout>

    <layout x={x + w + contextApp.unitpx * 0.02} cy={y + h * 0.75} w={w} h={contextApp.unitpx * 0.08}>
      <image w={contextApp.unitpx * 0.08} h={contextApp.unitpx * 0.08} cy='50%' src={contextApp.imagePngHeartBeatsD0021B} />
      <ReactCanvas2dExtensions.Text text={String(contextPlayground.gameSelfHitPoint)} font={`bolder ${contextApp.unitpx * 0.05}px sans-serif`} w={Infinity}>
        {
          (line, location) => {
            return line.map(i => {
              return <text x={contextApp.unitpx * 0.1} cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} />
            })
          }
        }
      </ReactCanvas2dExtensions.Text>
    </layout>

  </layout>
}

export default App