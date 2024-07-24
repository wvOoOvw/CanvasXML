import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Template from '../_Template/App'

function GraphComponent() {
  const [linePath, setLinePath] = React.useState([])

  const onPointerMove = e => {
    if (linePath.length === 20) {
      setLinePath([...linePath, { x: e.x - e.dom.x, y: e.y - e.dom.y }].filter((i, index) => index !== 0))
    }
    if (linePath.length !== 20) {
      setLinePath([...linePath, { x: e.x- e.dom.x, y: e.y - e.dom.y }])
    }
  }

  const onPointerMoveAway = e => {
    if (linePath.length > 0) {
      setLinePath(linePath.filter((i, index) => index !== 0))
    }
  }

  return <rectradius  fill clip fillStyle='rgba(255, 255, 255, 1)' radius={16}>
    <layout container horizontalAlignCenter verticalAlignCenter>
      <layout w='calc(100% - 48px)' h='calc(100% - 48px)' gap={24} item container wrap horizontalCenter verticalCenter>
        <rectradius   onPointerMove={onPointerMove} onPointerMoveAway={onPointerMoveAway}>
          <line   stroke strokeFill='rgba(135, 135, 135, 1)' lineWidth={2}>
            {
              linePath.map(i => <path x={i.x} y={i.y}/>)
            }
          </line>
        </rectradius>
      </layout>
    </layout>
  </rectradius>
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
        text: 'Component <Line/> API',
        font: '28px courier',
        fillStyle: 'rgba(255, 255, 255, 1)',
        lineHeight: 1,
        gap: 14,
        align: 'left',
      },
      {
        text: 'This Is A Basic Line Component Display By Setting Different Orientations, Sizes, Rounded Corners, And Rendering Modes',
        font: '24px courier',
        fillStyle: 'rgba(185, 185, 185, 1)',
        lineHeight: 1,
        gap: 12,
        align: 'left',
      },
    ]

  return <Template GraphComponent={<GraphComponent />} title={title} description={description} />
}

export default App