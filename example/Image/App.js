import { React, ReactPlugin, ReactDomComponent, ReactDom } from '../../package/index'

import imagejpg from './image.jpg'

function App() {
  const { image } = ReactPlugin.useImage({ src: imagejpg, onload: React.shouldRender })

  return <>
    <ReactDomComponent.CoordinateHelper x={ReactDom.canvas().coordinate.x} y={ReactDom.canvas().coordinate.y} w={ReactDom.canvas().coordinate.w} h={ReactDom.canvas().coordinate.h} gap={100} color={'rgba(255, 255, 255, 1)'} />

    <layout x={ReactDom.canvas().coordinate.x} y={ReactDom.canvas().coordinate.y} w={ReactDom.canvas().coordinate.w} h={ReactDom.canvas().coordinate.h} flow={['horizontal', 'verticalAlign']} horizontal='center' verticalAlign='center'>

      <layout w={300} h={300} flow={['verticalAlign', 'horizontalAlign']} verticalAlign='center' horizontalAlign='center'>
        <layout w={280} h={280}>
          {
            (props) => <image {...props} clipmin center image={image} />
          }
        </layout>
      </layout>

      <layout w={300} h={300} flow={['verticalAlign', 'horizontalAlign']} verticalAlign='center' horizontalAlign='center'>
        <layout w={280} h={280}>
          {
            (props) => <image {...props} clipmax center image={image} />
          }
        </layout>
      </layout>

    </layout>
  </>
}

export default App