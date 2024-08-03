import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return <layout zIndex={contextPlayground.zIndex.InfomationCumulation}>

    <rectradius
      fill
      cx='50%'
      cy={contextApp.locationLayout.h - contextApp.unitpx * 0.12}
      w={contextApp.unitpx}
      h={contextApp.unitpx * 0.08}
      fillStyle={'rgba(125, 125, 125, 1)'}
      shadowBlur={contextApp.unitpx * 0.08}
      shadowColor={'rgba(125, 125, 125, 1)'}
      shadowOffsetX={0}
      shadowOffsetY={0}
      radius={contextApp.unitpx * 0.04}
    >

      <rect />
    </rectradius>

  </layout>
}

export default App