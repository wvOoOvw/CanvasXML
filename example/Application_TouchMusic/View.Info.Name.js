import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

function App() {
  const context = React.useContext(Context)

  const fontSize = Math.min(context.locationLayout.w, context.locationLayout.h) * 0.2

  return <layout h={`${fontSize}px`} item>
    <layout container verticalForward horizontalAlignCenter>
      <ReactCanvas2d.Component.TextCaculateLine text={`PHIGROS`} font={`${fontSize}px courier`} lineHeight={1} gap={0} w={context.locationLayout.w - 48} split=' '>
        {
          (line, location) => {
            return <layout w={location.w} h={location.h} item>
              <text fillText fillStyle='white' align='center' font={`${fontSize}px courier`} lineHeight={1} gap={0} globalAlpha={0.25} line={line} />
            </layout>
          }
        }
      </ReactCanvas2d.Component.TextCaculateLine>
    </layout>
  </layout>
}

export default App