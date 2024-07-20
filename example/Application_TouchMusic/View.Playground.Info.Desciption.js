import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const fontSize_0 = contextApp.unitpx * 0.06

  return <layout w={contextApp.locationLayout.w - contextApp.unitpx * 0.08} h={`${fontSize_0}px`} item>
    <layout container horizontalBetween verticalAlignCenter>
      <ReactCanvas2d.TextCaculateLine text={'PHIGROS'} font={`${fontSize_0}px sans-serif`} lineHeight={1} gap={0} w={contextApp.locationLayout.w - contextApp.unitpx * 0.08} split=' ' wrap>
        {
          (line, location) => {
            return <layout w={location.w} h={location.h} item>
              <text fillText fillStyle='rgb(255, 255, 255)' align='center' font={`${fontSize_0}px sans-serif`} lineHeight={1} gap={0} line={line} globalAlpha={0.5} />
            </layout>
          }
        }
      </ReactCanvas2d.TextCaculateLine>

      <ReactCanvas2d.TextCaculateLine text={`IN Lv.15`} font={`${fontSize_0}px sans-serif`} lineHeight={1} gap={0} w={contextApp.locationLayout.w - contextApp.unitpx * 0.08} split=' ' wrap>
        {
          (line, location) => {
            return <layout w={location.w} h={location.h} item>
              <text fillText fillStyle='rgb(255, 255, 255)' align='center' font={`${fontSize_0}px sans-serif`} lineHeight={1} gap={0} line={line} globalAlpha={0.5} />
            </layout>
          }
        }
      </ReactCanvas2d.TextCaculateLine>
    </layout>
  </layout>
}

export default App