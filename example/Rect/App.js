import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Template from '../_Template/App'

function Rect() {
  const [active, setActive] = React.useState(false)
  const [hover, setHover] = React.useState(false)

  const destinationRadius = hover ? 24 : 8
  const destinationFillStyleRed = active ? 115 : 145
  const destinationFillStyleGreen = active ? 125 : 145
  const destinationFillStyleBlue = active ? 170 : 145

  const { transitionCount: radius } = React.Plugin.useTransitionCount({ play: true, defaultCount: 8, destination: destinationRadius, rate: 16 / 15, postprocess: n => Number(n.toFixed(2)) })
  const { transitionCount: fillStyleRed } = React.Plugin.useTransitionCount({ play: true, defaultCount: 145, destination: destinationFillStyleRed, rate: 30 / 15, postprocess: n => n.toFixed(0) })
  const { transitionCount: fillStyleGreen } = React.Plugin.useTransitionCount({ play: true, defaultCount: 145, destination: destinationFillStyleGreen, rate: 20 / 15, postprocess: n => n.toFixed(0) })
  const { transitionCount: fillStyleBlue } = React.Plugin.useTransitionCount({ play: true, defaultCount: 145, destination: destinationFillStyleBlue, rate: 25 / 15, postprocess: n => n.toFixed(0) })

  const fillStyle = `rgba(${fillStyleRed}, ${fillStyleGreen}, ${fillStyleBlue}, 1)`

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

  return <rect beginPath fillStyle={fillStyle} radius={radius} onClick={onClick} onMouseMove={onMouseMove} onTouchMove={onTouchMove}>
    <fill />
  </rect>
}

function GraphComponent() {
  return <rect beginPath fillStyle='rgba(255, 255, 255, 1)' radius={16}>

    <fill />

    <clip>
      <layout container horizontalAlignCenter verticalAlignCenter>
        <layout w='calc(100% - 48px)' h='calc(100% - 48px)' gap={24} item container wrap horizontalCenter verticalCenter>
          {
            new Array(12).fill().map(i => {
              return <layout w='120px' h='120px' item>
                <Rect />
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
        text: 'Component <Rect/> API',
        font: '28px monospace',
        fillStyle: 'rgba(255, 255, 255, 1)',
        lineHeight: 1,
        gap: 14,
        align: 'left',
      },
      {
        text: 'This Is A Basic Rect Component Display By Setting Different Orientations, Sizes, Rounded Corners, And Rendering Modes, Try To Click The Rect Above To Change The Color',
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