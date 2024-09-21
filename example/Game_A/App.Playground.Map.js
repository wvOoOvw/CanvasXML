import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import { App as AppMapBaseA, init as initMapBaseA } from './App.Playground.Map.Component.BaseA'

const initComponent = (props) => {
  if (props.type === 'MapBaseA') return initMapBaseA(props.option)
}

function RenderComponent(props) {
  if (props.type === 'MapBaseA') return <AppMapBaseA {...props} />
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.informationJson) {
      contextPlayground.informationJson.gameMap.forEach((i, index) => {
        const n = initComponent(i)
        const v = {
          key: Math.random(),
          type: i.type,
          option: n.option,
          onDimension: n.onDimension,
          onDomCollisions: n.onDomCollisions,
          onUpdate: () => contextPlayground.setGameMap(i => [...i]),
        }
        v.self = v
        contextPlayground.setGameMap(i => [...i, v])
      })
      contextPlayground.setGameLoadMap(true)
    }
  }, [contextPlayground.informationJson])

  if (contextPlayground.load) return contextPlayground.gameMap.map((i) => <RenderComponent {...i} />)
}

export default App