import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import initCardBaseA from './App.Model.Card.BaseA'

const initComponent = (props) => {
  if (props.type === 'CardBaseA') return initCardBaseA(props.option)
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.informationJson) {
      contextPlayground.setGameCardLibrary(contextPlayground.informationJson.gameCard.map(i => Object({ key: Math.random(), ...initComponent(i) })))
      contextPlayground.setGameLoadCard(true)
    }
  }, [contextPlayground.informationJson])
}

export default App