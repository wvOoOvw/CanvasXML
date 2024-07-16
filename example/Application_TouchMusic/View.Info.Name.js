import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

function App() {
  const context = React.useContext(Context)

  return <layout h={`${context.unitpx * 0.08}px`} item>
    <layout container verticalForward horizontalAlignCenter>
      <ReactCanvas2d.Component.TextCaculateLine text={`PHIGROS`} font={`${context.unitpx * 0.08}px courier`} lineHeight={1} gap={0} w={context.locationLayout.w - context.unitpx * 0.08} split=' '>
        {
          (line, location) => {
            return <layout w={location.w} h={location.h} item>
              <text fillText fillStyle='white' align='center' font={`${context.unitpx * 0.08}px courier`} lineHeight={1} gap={0} globalAlpha={0.25} line={line} />
            </layout>
          }
        }
      </ReactCanvas2d.Component.TextCaculateLine>
    </layout>
  </layout>
}

export default App