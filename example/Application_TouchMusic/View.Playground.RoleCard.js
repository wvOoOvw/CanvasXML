import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [role, setRole] = React.useState()

  const { animationCount: animationCountActiveCurrent } = React.useAnimationDestination({ play: true, defaultCount: contextPlayground.gameRoleActive ? 1 : 0, destination: contextPlayground.gameRoleActive ? 1 : 0, rate: 1 / 15, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (contextPlayground.gameRoleActive) setRole(contextPlayground.gameRoleActive)
  }, [contextPlayground.gameRoleActive])

  const w = contextApp.unitpx * 0.75
  const h = contextApp.unitpx * 1.25
  const x = w * -1 + (animationCountActiveCurrent * 1) * w
  const y = (contextApp.locationLayout.h - h) / 2

  const transform = [
    {
      translate: { x: x + w / 2, y: y + h / 2 },
    },
    {
      rotate: { angle: Math.PI * 0.2 },
    },
    {
      translate: { x: (x + w / 2) * -1, y: (y + h / 2) * -1 },
    },
  ]

  if (role === undefined) {
    return null
  }

  if (role !== undefined) {
    return <rectradius
      x={x}
      y={y}
      w={w}
      h={h}
      beginPath
      clip
      transform={transform}
      radius={w * 0.02}
      globalAlpha={animationCountActiveCurrent}
    >
      <image
        cx={'50%'}
        cy={'50%'}
        image={role.image}
        size='auto-max'
        position='center'
      />
    </rectradius>
  }
}

export default App