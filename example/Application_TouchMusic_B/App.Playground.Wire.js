import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import {App as AppWireBaseA, init as initWireBaseA} from './App.Playground.Wire.Component.BaseA'
import {App as AppWireBaseB, init as initWireBaseB} from './App.Playground.Wire.Component.BaseB'
import {App as AppWireBaseC, init as initWireBaseC} from './App.Playground.Wire.Component.BaseC'
import {App as AppWireBaseD, init as initWireBaseD} from './App.Playground.Wire.Component.BaseD'

const initComponent = (option) => {
  if (props.type === 'WireBaseA') return initWireBaseA(option)
  if (props.type === 'WireBaseB') return initWireBaseA(option)
  if (props.type === 'WireBaseC') return initWireBaseA(option)
  if (props.type === 'WireBaseD') return initWireBaseA(option)
}

function RenderComponent(props) {
  if (props.type === 'WireBaseA') return <AppWireBaseA {...props} />
  if (props.type === 'WireBaseB') return <AppWireBaseB {...props} />
  if (props.type === 'WireBaseC') return <AppWireBaseC {...props} />
  if (props.type === 'WireBaseD') return <AppWireBaseD {...props} />
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.informationJson) {
      contextPlayground.informationJson.gameWire.forEach((i, index) => {
        const iWire = {
          key: Math.random(),
          onUpdate: () => contextPlayground.setGameWire(i => [...i]),
          ...initComponent(i),
        }

        contextPlayground.setGameWire(i => [...i, iWire])
        if (index === 0) contextPlayground.setGameWireActive(iWire)
      })
    }
  }, [contextPlayground.informationJson])

  return contextPlayground.gameWire.map((i) => <RenderComponent self={i} {...i} />)
}

export default App