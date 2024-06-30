import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Template from '../_Template/App'

function Arc() {
  const [active, setActive] = React.useState(false)
  const [hover, setHover] = React.useState(false)

  const destinationRadius = hover ? 75 : 60

  const { transitionCount: radius } = ReactCanvas2d.Plugin.useTransitionCount({ play: true, defaultCount: 60, destination: destinationRadius, rate: 15 / 15, postprocess: n => Number(n.toFixed(2)) })

  const onClick = e => {
    if (e.device === 'mouse' && Canvas2d.Location.pointcover(e.dom.props, { x: e.x, y: e.y })) {
      setActive(!active)
    }
    if (e.device === 'touch' && Canvas2d.Location.pointcover(e.dom.props, { x: e.x[0], y: e.y[0] })) {
      setActive(!active)
    }
  }

  const onMouseMove = e => {
    setHover(Canvas2d.Location.pointcover(e.dom.props, { x: e.x, y: e.y }))
  }

  const onTouchMove = e => {
    setHover(Canvas2d.Location.pointcover(e.dom.props, { x: e.x[0], y: e.y[0] }))
  }

  return <layout  container horizontalAlignCenter verticalAlignCenter>
    <layout w={`${radius * 2}px`} h={`${radius * 2}px`} item>
      <arc  beginPath globalAlpha={1} fillStyle={'rgba(135, 135, 135, 1)'} radius={radius} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} onClick={onClick} onMouseMove={onMouseMove} onTouchMove={onTouchMove}>
        <fill />
      </arc>
    </layout>
  </layout>
}

function GraphComponent() {
  return <rect  beginPath fillStyle='rgba(255, 255, 255, 1)' radius={16}>

    <fill />

    <clip>
      <layout  container horizontalAlignCenter verticalAlignCenter>
        <layout w='calc(100% - 48px)' h='calc(100% - 48px)' gap={24} item container wrap horizontalForward verticalCenter>
          {
            new Array(12).fill().map(i => {
              return <layout w='120px' h='120px' item>
                <Arc />
              </layout>
            })
          }
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
        onClick: () => window.open('https://github.com/wvOoOvw/20240601x001/tree/master/example/Arc')
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
        text: 'Component <Arc/> API',
        font: '28px monospace',
        fillStyle: 'rgba(255, 255, 255, 1)',
        lineHeight: 1,
        gap: 14,
        align: 'left',
      },
      {
        text: 'This Is A Basic Arc Component Display By Setting Different Orientations, Sizes, Rounded Corners, And Rendering Modes, Try To Click The Rect Above To Change The Color',
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