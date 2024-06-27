import { React, ReactCanvas2dComponent, ReactCanvas2d, ReactCanvas2dPlugin, ReactCanvas2dTag, ReactCanvas2dUtils, Location } from '../../package/index'

import Template from '../_Template/App'

function GraphComponent() {
  return <rect x='extend' y='extend' w='extend' h='extend' beginPath fillStyle='rgba(255, 255, 255, 1)' radius={16}>

    <fill />

    <clip x='extend' y='extend' w='extend' h='extend'>
      <layout x='extend' y='extend' w='extend' h='extend' container horizontalAlignCenter verticalAlignCenter>
        <layout w='calc(100% - 48px)' h='calc(100% - 48px)' item>
          <rect x='extend' y='extend' w='extend' h='extend' fillStyle='rgba(135, 135, 135, 1)' beginPath>
            <fill />
            <clip x='extend' y='extend' w='extend' h='extend' key={1}>
              <arc fillStyle='rgba(255, 0, 255, 1)' x='calc(extend + 85px)' y='calc(extend - 25px)' radius={200} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} beginPath>
                <fill />
              </arc>
              <arc fillStyle='rgba(0, 0, 255, 1)' x='calc(extend + 145px)' y='calc(extend + 100vh - 75px)' radius={200} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} beginPath>
                <fill />
              </arc>
              <arc fillStyle='rgba(255, 255, 0, 1)' x='calc(extend + 100vw)' y='calc(extend + 25vh)' radius={200} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} beginPath>
                <fill />
              </arc>
            </clip>
          </rect>
        </layout>
      </layout>
    </clip>

  </rect>
}

function App() {
  const title =
    [
      {
        text: 'CanvasXML',
      },
      {
        text: 'Document',
        onClick: () => window.open('https://github.com/wvOoOvw/20240601x001/tree/master/example/Rect')
      },
      {
        text: 'Github',
        onClick: () => window.open('https://github.com/wvOoOvw/20240601x001')
      },
      {
        text: 'Npm',
        onClick: () => window.open('https://www.npmjs.com/package/canvasxml')
      },
    ]

  const description =
    [
      {
        text: 'Component <Clip/> API',
        font: '28px monospace',
        fillStyle: 'rgba(255, 255, 255, 1)',
        lineHeight: 1,
        gap: 14,
        align: 'left',
      },
      {
        text: 'This Is A Basic Clip Component Display By Setting Different Orientations, Sizes, Rounded Corners, And Rendering Modes, Try To Click The Rect Above To Change The Color',
        font: '24px monospace',
        fillStyle: 'rgba(185, 185, 185, 1)',
        lineHeight: 1,
        gap: 12,
        align: 'left',
      },
    ]

  return <Template GraphComponent={<GraphComponent />} title={title} description={description} />
}

export default App