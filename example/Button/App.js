import { React, ReactDomComponent, ReactDom, Location } from '../../package/index'

function App() {
  const coordinate = ReactDom.canvas().coordinate

  return <>
    <ReactDomComponent.CoordinateHelper x={coordinate.x} y={coordinate.y} w={coordinate.w} h={coordinate.h} gap={100} color={'rgba(255, 255, 255, 1)'} />

    <layout x={coordinate.x} y={coordinate.y} w={coordinate.w} h={coordinate.h} verticalCenter horizontalAlignCenter>
      <layout w={120} h={60} verticalAlignCenter horizontalAlignCenter>
          {
            (props) => <ReactDomComponent.Button {...props} fontSize={16} text={'START'} />
          }
      </layout>
    </layout>
  </>
}

export default App