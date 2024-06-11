import { React, ReactDomComponent, ReactDom } from '../../package/index'

function App() {
  return <>
    <ReactDomComponent.CoordinateHelper position={ReactDom.canvas().coordinate} gap={100} color={'rgba(255, 255, 255, 1)'} />

    <layout x={ReactDom.canvas().coordinate.x} y={ReactDom.canvas().coordinate.y} w={ReactDom.canvas().coordinate.w} h={ReactDom.canvas().coordinate.h} flow={['horizontal', 'verticalAlign']} horizontal='center' verticalAlign='center'>

      <layout w={100} h={100} flow={['verticalAlign', 'horizontalAlign']} verticalAlign='center' horizontalAlign='center'>
        <layout w={92} h={92}  flow={['verticalAlign', 'horizontalAlign']} verticalAlign='center' horizontalAlign='center'>
          <layout w={0} h={0}>
            {
              (props) => <arc save fill fillStyle='rgba(255, 0, 0, 1)' {...props} radius={40} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false}/>
            }
          </layout>
        </layout>
      </layout>

      <layout w={100} h={100} flow={['verticalAlign', 'horizontalAlign']} verticalAlign='center' horizontalAlign='center'>
        <layout w={92} h={92}  flow={['verticalAlign', 'horizontalAlign']} verticalAlign='center' horizontalAlign='center'>
          <layout w={0} h={0}>
            {
              (props) => <arc save fill fillStyle='rgba(255, 0, 0, 1)' {...props} radius={16} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false}/>
            }
          </layout>
        </layout>
      </layout>

      <layout w={100} h={100} flow={['verticalAlign', 'horizontalAlign']} verticalAlign='center' horizontalAlign='center'>
        <layout w={92} h={92}  flow={['verticalAlign', 'horizontalAlign']} verticalAlign='center' horizontalAlign='center'>
          <layout w={0} h={0}>
            {
              (props) => <arc save fill fillStyle='rgba(255, 0, 0, 1)' {...props} radius={25} sAngle={Math.PI * 0.4} eAngle={Math.PI * 1.5} counterclockwise={false}/>
            }
          </layout>
        </layout>
      </layout>

      <layout w={100} h={100} flow={['verticalAlign', 'horizontalAlign']} verticalAlign='center' horizontalAlign='center'>
        <layout w={92} h={92}  flow={['verticalAlign', 'horizontalAlign']} verticalAlign='center' horizontalAlign='center'>
          <layout w={0} h={0}>
            {
              (props) => <arc save fill fillStyle='rgba(255, 0, 0, 1)' {...props} radius={32} sAngle={Math.PI * 1} eAngle={Math.PI * 1.75} counterclockwise={true}/>
            }
          </layout>
        </layout>
      </layout>

    </layout>
  </>
}

export default App