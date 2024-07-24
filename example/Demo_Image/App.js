import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Template from '../_Template/App'

import imagejpg from './image.jpg'

function GraphComponent() {
  const shouldRender = React.useShouldRender()

  const { image } = ReactCanvas2d.useImage({ src: imagejpg, onload: shouldRender })

  return <rectradius  fill clip fillStyle='rgba(255, 255, 255, 1)' radius={16}>
    <layout container horizontalAlignCenter verticalAlignCenter>
      <layout w='calc(100% - 48px)' h='calc(100% - 48px)' gap={24} item container wrap horizontalCenter verticalCenter>
        {
          new Array(12).fill().map(i => {
            return <layout w='120px' h='120px' item container horizontalAlignCenter verticalAlignCenter>
              <image 
                 
                image={image}
                size='auto-min'
                position='center'
              />
            </layout>
          })
        }
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
        text: 'Component <Image/> API',
        font: '28px courier',
        fillStyle: 'rgba(255, 255, 255, 1)',
        lineHeight: 1,
        gap: 14,
        align: 'left',
      },
      {
        text: 'This Is A Basic Image Component Display By Setting Different Orientations, Sizes, Rounded Corners, And Rendering Modes',
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