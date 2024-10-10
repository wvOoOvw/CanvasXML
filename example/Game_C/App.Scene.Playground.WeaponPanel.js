import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function ComponentWeaponPanel(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const weapon = props.weapon

  const active = contextPlayground.weaponActive.includes(i)

  const onPointerDown = e => {
    e.stopPropagation()
    contextPlayground.setWeaponActive([weapon])
  }

  return <layout w={contextApp.unitpx * 0.16} h={contextApp.unitpx * 0.16} item>
    <circle cx='50%' cy='50%' radius={contextApp.unitpx * 0.08} onPointerDown={onPointerDown}>
      <image cx='50%' cy='50%' w='65%' h='65%' src={contextApp[weapon.descriptionImageIndex]}/>
      {
        active ? <arc cx='50%' cy='50%' stroke strokeStyle='rgb(45, 45, 125)' radius={contextApp.unitpx * 0.08} /> : null
      }
      {
        !active ? <arc cx='50%' cy='50%' stroke strokeStyle='rgb(75, 75, 75)' radius={contextApp.unitpx * 0.08} /> : null
      }
    </circle>
  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return <layout x={contextApp.locationLayout.x - contextApp.unitpx * 0.08} y={contextApp.locationLayout.y - contextApp.unitpx * 0.08} container verticalReverse horizontalAlignReverse gap={contextApp.unitpx * 0.08} zIndex={contextPlayground.zIndex.WeaponPanel}>
    {
      contextPlayground.weaponPanel.map((i) => <ComponentWeaponPanel key={i.key} weapon={i} />)
    }
  </layout>
}

export default App