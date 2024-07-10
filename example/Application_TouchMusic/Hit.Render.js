import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import { HitxCircleDropVertical } from './Hit.Component.HitxCircleDropVertical'
import { HitxCircleVertical } from './Hit.Component.HitxCircleVertical'

function App(props) {
  if (props.hit.type === 'HitxCircleDropVertical') return <HitxCircleDropVertical {...props} />
  if (props.hit.type === 'HitxCircleVertical') return <HitxCircleVertical {...props} />
}

export default App