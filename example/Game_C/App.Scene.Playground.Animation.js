import React from '../../package/React'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <>
      <layout zIndex={contextPlayground.zIndex.WeaponAnimationLow}>
        {
          contextPlayground.animation.filter(i => i.zIndex === contextPlayground.zIndex.WeaponAnimationLow).map((i) => <i.ComponentAnimation key={i.key} animation={i} onDestory={() => contextPlayground.setAnimation(n => n.filter(v => v !== i))} />)
        }
      </layout>
      <layout zIndex={contextPlayground.zIndex.WeaponAnimationHigh}>
        {
          contextPlayground.animation.filter(i => i.zIndex === contextPlayground.zIndex.WeaponAnimationHigh).map((i) => <i.ComponentAnimation key={i.key} animation={i} onDestory={() => contextPlayground.setAnimation(n => n.filter(v => v !== i))} />)
        }
      </layout>
    </>

  return Component
}

export default App