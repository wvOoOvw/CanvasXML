import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'

function App() {
  const contextApp = React.useContext(ContextApp)

  return <ReactCanvas2dExtensions.Text text={`WIRELOST`} font={`bolder ${contextApp.unitpx * 0.12}px sans-serif`} w={contextApp.locationLayout.w - contextApp.unitpx * 0.08} split=' ' wrap>
    {
      (line, location) => {
        return <layout w={location.w} h={location.h} item>
          <text fillText fillStyle='white' align='center' font={`bolder ${contextApp.unitpx * 0.12}px sans-serif`} line={line} />
        </layout>
      }
    }
  </ReactCanvas2dExtensions.Text>
}

export default App