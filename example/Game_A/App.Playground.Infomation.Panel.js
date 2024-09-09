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

  const gameEnemyAllLength = contextPlayground.informationJson.gameEnemy.length
  const gameEnemyUseLength = contextPlayground.informationJson.gameEnemy.length - contextPlayground.gameEnemyReady.length

  const w = contextApp.unitpx * 0.48
  const h = contextApp.unitpx * 0.12
  const y = contextApp.unitpx * 0.08
  const radius = contextApp.unitpx * 0.02

  return <layout cx='50%' y={y} w={w} h={h} zIndex={contextPlayground.zIndex.GameInfomation}>

    <rectradiusarc fill fillStyle='rgb(255, 255, 255)' radius={radius} />

    <ReactCanvas2dExtensions.Text text={String(gameEnemyUseLength) + ' / ' + String(gameEnemyAllLength)} font={`bold ${contextApp.unitpx * 0.04}px sans-serif`} w={Infinity}>
      {
        (line, location) => {
          return line.map(i => {
            return <text cx='50%' cy='50%' fillText fillStyle='rgb(0, 0, 0)' w={i.w} h={i.h} text={i.text} font={i.font} />
          })
        }
      }
    </ReactCanvas2dExtensions.Text>
  </layout>
}

export default App