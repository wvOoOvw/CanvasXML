import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import Template from '../_Template/App'

function GraphComponent() {
  return <rectradiusarc fill clip fillStyle='rgba(255, 255, 255, 1)' radius={16}>
    <layout container horizontalAlignCenter verticalAlignCenter>
      <layout w='calc(100% - 48px)' h='calc(100% - 48px)' gap={24} item container wrap horizontalCenter verticalCenter>
        <ReactCanvas2dExtensions.CoordinateHelper gap={50} color={'rgba(135, 135, 135, 1)'} />
      </layout>
    </layout>
  </rectradiusarc>
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
        text: 'Component <CoordinateHelper/> API',
        font: '28px courier',
        fillStyle: 'rgba(255, 255, 255, 1)',
        lineHeight: 1,
        gap: 14,
      },
      {
        text: 'This Is A Basic CoordinateHelper Component Display By Setting Different Orientations, Sizes, Rounded Corners, And Rendering Modes',
        font: '24px courier',
        fillStyle: 'rgba(185, 185, 185, 1)',
        lineHeight: 1,
        gap: 12,
      },
    ]

  return <Template GraphComponent={<GraphComponent />} title={title} description={description} />
}

export default App