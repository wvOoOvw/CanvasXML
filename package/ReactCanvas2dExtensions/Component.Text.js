import React from '../React'
import * as Canvas2dExtensions from '../Canvas2dExtensions'

import useText from './Hook.UseText'

const App = (props) => {
  const { line, location } = useText(props)
  
  return props.children.map(i => i(line, location))
}

export default App