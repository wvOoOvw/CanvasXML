import { React, ReactDomComponent, ReactDom, Position } from '../../package/index'

function App() {
  const coordinate = Position.coordinate(ReactDom.canvas().coordinate)

  return <>
    <ReactDomComponent.CoordinateHelper x={ReactDom.canvas().coordinate.x} y={ReactDom.canvas().coordinate.y} w={ReactDom.canvas().coordinate.w} h={ReactDom.canvas().coordinate.h} gap={100} color={'rgba(255, 255, 255, 1)'} />

    <layout x={ReactDom.canvas().coordinate.x} y={ReactDom.canvas().coordinate.y} w={ReactDom.canvas().coordinate.w} h={ReactDom.canvas().coordinate.h} verticalCenter horizontalAlignCenter>

      <layout w={coordinate.vw * 45} h={coordinate.vh * 25} verticalAlignCenter horizontalAlignCenter>
        <layout w={coordinate.vw * 45} h={coordinate.vh * 25}>
          {
            (props) => <text isolated fillText font='20px monospace' fillStyle='white' text={'第五人格职业联赛，简称IVL（Identity V League）。是中国大陆地区最高级别的第五人格职业比赛，是每年中国大陆赛区通往第五人格深渊的呼唤COA（Call of the Abyss）全球赛的重要通道之一。同时，IVL还是国内首个非对称对抗竞技职业联赛。'} gap={12} {...props} />
          }
        </layout>
      </layout>

      <layout w={coordinate.vw * 30} h={coordinate.vh * 20}  verticalAlignCenter horizontalAlignCenter>
        <layout w={coordinate.vw * 30} h={coordinate.vh * 20} >
          {
            (props) => <text isolated fillText font='20px monospace' fillStyle='white' text={'第五人格职业联赛，简称IVL（Identity V League）。是中国大陆地区最高级别的第五人格职业比赛，是每年中国大陆赛区通往第五人格深渊的呼唤COA（Call of the Abyss）全球赛的重要通道之一。同时，IVL还是国内首个非对称对抗竞技职业联赛。'} gap={12} {...props} />
          }
        </layout>
      </layout>

    </layout>
  </>
}

export default App