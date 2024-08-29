import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import { App as AppRoleBaseA, init as initRoleBaseA } from './App.Playground.Role.Component.BaseA'
// import { App as AppRoleBaseB, init as initRoleBaseB } from './App.Playground.Role.Component.BaseB'
// import { App as AppRoleBaseC, init as initRoleBaseC } from './App.Playground.Role.Component.BaseC'
// import { App as AppRoleBaseD, init as initRoleBaseD } from './App.Playground.Role.Component.BaseD'

const initComponent = (props) => {
  if (props.type === 'RoleBaseA') return initRoleBaseA(props.option)
  // if (props.type === 'RoleBaseB') return initRoleBaseB(props.option)
  // if (props.type === 'RoleBaseC') return initRoleBaseC(props.option)
  // if (props.type === 'RoleBaseD') return initRoleBaseD(props.option)
}

function RenderComponent(props) {
  if (props.type === 'RoleBaseA') return <AppRoleBaseA {...props} />
  // if (props.type === 'RoleBaseB') return <AppRoleBaseB {...props} />
  // if (props.type === 'RoleBaseC') return <AppRoleBaseC {...props} />
  // if (props.type === 'RoleBaseD') return <AppRoleBaseD {...props} />
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  React.useEffect(() => {
    if (contextPlayground.informationJson) {
      contextPlayground.informationJson.gameRole.forEach((i, index) => {
        const n = initComponent(i)
        const v = {
          key: index,
          type: i.type,
          option: n.option,
          onDomCollisions: n.onDomCollisions,
          onUpdate: () => contextPlayground.setGameRole(i => [...i]),
        }
        v.self = v
        contextPlayground.setGameRole(i => [...i, v])
        if (index === 0) contextPlayground.setGameRoleActive(v)
      })
      contextPlayground.setGameLoadRole(true)
    }
  }, [contextPlayground.informationJson])

  return contextPlayground.gameRole.map((i) => <RenderComponent {...i} />)
}

export default App