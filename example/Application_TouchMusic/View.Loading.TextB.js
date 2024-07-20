import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'

function App() {
  const contextApp = React.useContext(ContextApp)

  return <ReactCanvas2d.TextCaculateLine text={'加载中'} font={`${contextApp.unitpx * 0.04}px monospace`} lineHeight={1} gap={0} w={contextApp.locationLayout.w - contextApp.unitpx * 0.08} split=' ' wrap>
    {
      (line, location) => {
        return <layout w={location.w} h={location.h} item>
          <text fillText fillStyle={`rgb(130, 130, 130)`} align='center' font={`${contextApp.unitpx * 0.04}px monospace`} lineHeight={1} gap={0} line={line} />
        </layout>
      }
    }
  </ReactCanvas2d.TextCaculateLine>
}

export default App