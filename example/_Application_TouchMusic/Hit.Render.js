import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import { Hitx001xCircleVertical } from './Hit.Component.Hitx001xCircleVertical'

function App(props) {
  if (props.hit.type === 'Hitx001xCircleVertical') return <Hitx001xCircleVertical {...props} />
}

export default App