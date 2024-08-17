import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import Template from '../_Template/App'

import imagejpg from './image.jpg'

function GraphComponent() {
  const shouldRender = React.useShouldRender()

  const { image } = ReactCanvas2dExtensions.useImage({ src: imagejpg, onload: shouldRender })

  return <rectradius fill clip fillStyle='rgba(255, 255, 255, 1)' radius={16}>
    <rect cx='50%' cy='50%' w={200} h={200} fill fillStyle='rgba(0, 0, 0, 1)' />
    <image cx='50%' cy='50%' w={200} h={200} src={image} size='auto-min' position='center' clipHorizontalCenter clipVerticalCenter />
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
        text: 'Component <Image/> API',
        font: '28px courier',
        fillStyle: 'rgba(255, 255, 255, 1)',
        lineHeight: 1,
        gap: 14,
      },
      {
        text: 'This Is A Basic Image Component Display By Setting Different Orientations, Sizes, Rounded Corners, And Rendering Modes',
        font: '24px courier',
        fillStyle: 'rgba(185, 185, 185, 1)',
        lineHeight: 1,
        gap: 12,
      },
    ]

  return <Template GraphComponent={<GraphComponent />} title={title} description={description} />
}

export default App