import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'

function App() {
  const contextApp = React.useContext(ContextApp)

  return <ReactCanvas2d.TextCaculateLine text={`PHIGROS`} font={`bolder ${contextApp.unitpx * 0.12}px sans-serif`} lineHeight={1} gap={0} w={contextApp.locationLayout.w - contextApp.unitpx * 0.08} split=' ' wrap>
    {
      (line, location) => {
        return <layout w={location.w} h={location.h} item>
          <text fillText fillStyle='white' align='center' font={`bolder ${contextApp.unitpx * 0.12}px sans-serif`} lineHeight={1} gap={0} line={line} />
        </layout>
      }
    }
  </ReactCanvas2d.TextCaculateLine>
}

export default App