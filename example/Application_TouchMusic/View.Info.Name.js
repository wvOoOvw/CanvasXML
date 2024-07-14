import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

function App() {
  const context = React.useContext(Context)

  return <layout y='72px' item>
    <layout container verticalForward horizontalAlignCenter>
      <ReactCanvas2d.Component.TextCaculateLine text={`PHIGROS`} font='72px monospace' lineHeight={1} gap={0} w={context.locationLayout.w - 48} split=' ' wrap>
        {
          (line, location) => {
            return <layout w={location.w} h={location.h} item>
              <text fillText fillStyle='white' align='center' font='72px monospace' lineHeight={1} gap={0} globalAlpha={0.25} line={line} />
            </layout>
          }
        }
      </ReactCanvas2d.Component.TextCaculateLine>
    </layout>
  </layout>
}

export default App