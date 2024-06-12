import { React, ReactDomComponent, ReactDom } from '../../package/index'

function App() {
  return <>
    <ReactDomComponent.CoordinateHelper x={ReactDom.canvas().coordinate.x} y={ReactDom.canvas().coordinate.y} w={ReactDom.canvas().coordinate.w} h={ReactDom.canvas().coordinate.h} gap={100} color={'rgba(255, 255, 255, 1)'} />

    <layout x={ReactDom.canvas().coordinate.x} y={ReactDom.canvas().coordinate.y} w={ReactDom.canvas().coordinate.w} h={ReactDom.canvas().coordinate.h} flow={['horizontal', 'verticalAlign']} horizontal='center' verticalAlign='center'>

      <layout w={300} h={300} flow={['verticalAlign', 'horizontalAlign']} verticalAlign='center' horizontalAlign='center'>
        <layout w={280} h={280}>
          {
            (props) => <rect isolated fillStyle='rgba(255, 0, 0, 1)' {...props}>
              <clip {...props}>
                <arc isolated fill fillStyle='rgba(255, 255, 255, 1)' x={props.x} y={props.y} radius={120} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false}/>
                <arc isolated fill fillStyle='rgba(255, 255, 255, 1)' x={props.x + props.w} y={props.y + props.h} radius={120} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false}/>
              </clip>
            </rect>
          }
        </layout>
      </layout>

    </layout>
  </>
}

export default App