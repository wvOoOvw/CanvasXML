import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import CardControl from './App.Playground.CardControl'
import CardLibrary from './App.Playground.CardLibrary'
import CardPanel from './App.Playground.CardPanel'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = contextApp.unitpx * 1.2
  const h = contextApp.unitpx * 1.2

  if (contextPlayground.load === false) return null

  return <layout cx='50%' cy='50%' w={w} h={h} zIndex={contextPlayground.zIndex.EnemyPanel}>
    <rectradius fill fillStyle='gray' radius={contextApp.unitpx * 0.02} />

    <layout container verticalForward gap={contextApp.unitpx * 0.04}>

      <layout item cx='50%' w={contextApp.unitpx * 0.64} h={contextApp.unitpx * 0.64}>
        <image cx='50%' cy='50%' src={contextApp[contextPlayground.gameBattleEnemy.imageIndex]} />
      </layout>

      <layout x={contextApp.unitpx * 0.08} h={contextApp.unitpx * 0.06} item>
        <image cy='50%' w={contextApp.unitpx * 0.06} h={contextApp.unitpx * 0.06} src={contextApp.imagePngDigitalTraceWhite} />
        <ReactCanvas2dExtensions.Text text={`200`} font={`bolder ${contextApp.unitpx * 0.04}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return line.map(i => {
                return <text x={contextApp.unitpx * 0.12} cy='50%' w={i.w} h={i.h} fillText fillStyle='white' text={i.text} font={i.font} />
              })
            }
          }
        </ReactCanvas2dExtensions.Text>
      </layout>

      <layout x={contextApp.unitpx * 0.08} h={contextApp.unitpx * 0.06} item>
        <image cy='50%' w={contextApp.unitpx * 0.06} h={contextApp.unitpx * 0.06} src={contextApp.imagePngLayeredArmorWhite} />
        <ReactCanvas2dExtensions.Text text={`200`} font={`bolder ${contextApp.unitpx * 0.04}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return line.map(i => {
                return <text x={contextApp.unitpx * 0.12} cy='50%' w={i.w} h={i.h} fillText fillStyle='white' text={i.text} font={i.font} />
              })
            }
          }
        </ReactCanvas2dExtensions.Text>
      </layout>


    </layout>


  </layout>
}


export default App