import { React, ReactDomComponent, ReactDom, Position } from '../../package/index'

function App() {
  return <>
    <ReactDomComponent.CoordinateHelper position={ReactDom.canvas().coordinate} gap={100} color={'rgba(255, 255, 255, 1)'} />

    <layout x={ReactDom.canvas().coordinate.x} y={ReactDom.canvas().coordinate.y} w={ReactDom.canvas().coordinate.w} h={ReactDom.canvas().coordinate.h} flow={['horizontal', 'verticalAlign']} horizontal='center' verticalAlign='center'>

      <layout w={100} h={100}>
        {
          (props) => <rect save fill fillStyle='rgba(200, 145, 25, 1)' {...props} />
        }
      </layout>

      <layout w={100} h={100}>
        {
          (props) => <rect save fill fillStyle='rgba(255, 255, 0, 1)' {...props} />
        }
      </layout>

      <layout w={100} h={100}>
        {
          (props) => <rect save fill fillStyle='rgba(0, 255, 0, 1)' {...props} />
        }
      </layout>

      <layout w={100} h={100}>
        {
          (props) => <rect save fill fillStyle='rgba(35, 255, 145, 1)' {...props} />
        }
      </layout>

    </layout>
  </>
}

export default App