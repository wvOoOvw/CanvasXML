import { React, ReactDomComponent, ReactDom } from '../../package/index'

function App() {
  return <>
    <ReactDomComponent.CoordinateHelper x={ReactDom.canvas().coordinate.x} y={ReactDom.canvas().coordinate.y} w={ReactDom.canvas().coordinate.w} h={ReactDom.canvas().coordinate.h} gap={100} color={'rgba(255, 255, 255, 1)'} />

    <layout x={ReactDom.canvas().coordinate.x} y={ReactDom.canvas().coordinate.y} w={ReactDom.canvas().coordinate.w} h={ReactDom.canvas().coordinate.h} flow={['horizontal', 'verticalAlign']} horizontal='center' verticalAlign='center'>

      <layout w={100} h={100} flow={['verticalAlign', 'horizontalAlign']} verticalAlign='center' horizontalAlign='center'>
        <layout w={92} h={92}>
          {
            (props) => <rect save fill fillStyle='rgba(255, 0, 0, 1)' {...props} />
          }
        </layout>
      </layout>

      <layout w={100} h={100} flow={['verticalAlign', 'horizontalAlign']} verticalAlign='center' horizontalAlign='center'>
        <layout w={92} h={92}>
          {
            (props) => <rect save fill fillStyle='rgba(255, 0, 0, 1)' {...props} />
          }
        </layout>
      </layout>

      <layout w={100} h={100} flow={['verticalAlign', 'horizontalAlign']} verticalAlign='center' horizontalAlign='center'>
        <layout w={92} h={92}>
          {
            (props) => <rect save fill fillStyle='rgba(255, 0, 0, 1)' {...props} />
          }
        </layout>
      </layout>

      <layout w={100} h={100} flow={['verticalAlign', 'horizontalAlign']} verticalAlign='center' horizontalAlign='center'>
        <layout w={92} h={92}>
          {
            (props) => <rect save fill fillStyle='rgba(255, 0, 0, 1)' {...props} radius={20}/>
          }
        </layout>
      </layout>

      <layout w={100} h={100} flow={['verticalAlign', 'horizontalAlign']} verticalAlign='center' horizontalAlign='center'>
        <layout w={92} h={92}>
          {
            (props) => <rect save fill fillStyle='rgba(255, 0, 0, 1)' {...props} radius={[20, 0, 20, 0]}/>
          }
        </layout>
      </layout>

    </layout>
  </>
}

export default App