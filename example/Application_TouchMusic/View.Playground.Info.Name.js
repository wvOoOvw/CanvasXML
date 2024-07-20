import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return <layout h={`${contextApp.unitpx * 0.08}px`} item>
    <layout container verticalForward horizontalAlignCenter>
      <ReactCanvas2d.TextCaculateLine text={`PHIGROS`} font={`${contextApp.unitpx * 0.08}px monospace`} lineHeight={1} gap={0} w={contextApp.locationLayout.w - contextApp.unitpx * 0.08} split=' '>
        {
          (line, location) => {
            return <layout w={location.w} h={location.h} item>
              <text fillText fillStyle='white' align='center' font={`${contextApp.unitpx * 0.08}px monospace`} lineHeight={1} gap={0} globalAlpha={0.25} line={line} />
            </layout>
          }
        }
      </ReactCanvas2d.TextCaculateLine>
    </layout>
  </layout>
}

export default App