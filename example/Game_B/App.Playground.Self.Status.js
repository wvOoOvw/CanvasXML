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

  const w = contextApp.unitpx * 0.24
  const h = contextApp.unitpx * 0.24
  const x = contextApp.unitpx * 0.08
  const y = contextApp.locationLayout.y + contextApp.locationLayout.h - h - contextApp.unitpx * 0.08

  return <layout zIndex={contextPlayground.zIndex.SelfStatus}>

    <layout x={x} y={y} w={w} h={h}>
      <arc cx='50%' cy='50%' radius={(w + h) / 4} fill fillStyle='rgb(255, 255, 255)' shadowBlur={contextApp.unitpx * 0.024} shadowColor='rgb(255, 255, 255)' />
      <arc clip cx='50%' cy='50%' radius={(w + h) / 4}>
        <image cx='50%' cy='50%' src={contextApp.imageJpgRoleB} clipHorizontalCenter clipVerticalCenter key={1}/>
      </arc>
    </layout>

    <layout x={x + w * 1.08} cy={y + h - h / 8 * 4} w={w} h={h / 4}>
      {
        new Array(contextPlayground.gameSelfActionPoint).fill().map((i, index) => <image x={index * w / 4} w={w / 4} src={contextApp.imagePngRobeWhite} />)
      }
      {
        contextPlayground.gameSelfActionPoint === 0 ? <image w={w / 4} src={contextApp.imagePngCrossedChainsWhite} /> : null
      }
    </layout>

    <layout x={x + w * 1.08} cy={y + h - h / 8} w={w} h={h / 4}>
      <image w={w / 4} src={contextApp.imagePngHeartBeatsD0021B} />
      <ReactCanvas2dExtensions.Text text={String(contextPlayground.gameSelfHitPoint)} font={`bolder ${w / 6}px sans-serif`} w={Infinity}>
        {
          (line, location) => {
            return line.map(i => {
              return <text x={w / 4 * 1.24} cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} />
            })
          }
        }
      </ReactCanvas2dExtensions.Text>
    </layout>

  </layout>
}

export default App