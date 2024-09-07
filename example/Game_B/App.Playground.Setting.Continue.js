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

  const w = contextApp.unitpx * 0.32
  const h = contextApp.unitpx * 0.12
  const x = contextApp.locationLayout.w - w - contextApp.unitpx * 0.04
  const y = contextApp.locationLayout.h / 2 - h / 2

  const onPointerDown = (e) => {

  }

  return <layout x={x} y={y} w={w} h={h} zIndex={contextPlayground.zIndex.GameSettingContinue}>
    <arc cx='50%' cy='50%' fill fillStyle='rgb(255, 255, 255)' radius={w / 4 + h / 4} onPointerDown={onPointerDown} />
    {/* <rectradius cx='50%' cy='50%' fill fillStyle='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.02} onPointerDown={onPointerDown} /> */}

    <ReactCanvas2dExtensions.Text text='结束回合' font={`bolder ${contextApp.unitpx * 0.036}px sans-serif`} w={Infinity}>
      {
        (line, location) => {
          return line.map(i => {
            return <text cx='50%' cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(0, 0, 0)' text={i.text} font={i.font} />
          })
        }
      }
    </ReactCanvas2dExtensions.Text>
  </layout>
}

export default App