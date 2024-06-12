import { React, ReactDomComponent, ReactDom } from '../../package/index'

function App() {
  return <>
    <ReactDomComponent.CoordinateHelper x={ReactDom.canvas().coordinate.x} y={ReactDom.canvas().coordinate.y} w={ReactDom.canvas().coordinate.w} h={ReactDom.canvas().coordinate.h} gap={100} color={'rgba(255, 255, 255, 1)'} />

    <layout x={ReactDom.canvas().coordinate.x} y={ReactDom.canvas().coordinate.y} w={ReactDom.canvas().coordinate.w} h={ReactDom.canvas().coordinate.h} verticalCenter horizontalAlignCenter>

      <layout w={400} h={300} verticalAlignCenter horizontalAlignCenter>
        <layout w={400} h={200}>
          {
            (props) => <text isolated fillText font='20px monospace' fillStyle='white' text={'第五人格职业联赛，简称IVL（Identity V League）。是中国大陆地区最高级别的第五人格职业比赛，是每年中国大陆赛区通往第五人格深渊的呼唤COA（Call of the Abyss）全球赛的重要通道之一。同时，IVL还是国内首个非对称对抗竞技职业联赛。'} gap={12} {...props} />
          }
        </layout>
      </layout>

      <layout w={600} h={300} verticalAlignCenter horizontalAlignCenter>
        <layout w={600} h={200}>
          {
            (props) => <text isolated fillText font='20px monospace' fillStyle='white' text={'第五人格职业联赛，简称IVL（Identity V League）。是中国大陆地区最高级别的第五人格职业比赛，是每年中国大陆赛区通往第五人格深渊的呼唤COA（Call of the Abyss）全球赛的重要通道之一。同时，IVL还是国内首个非对称对抗竞技职业联赛。'} gap={12} {...props} />
          }
        </layout>
      </layout>

    </layout>
  </>
}

export default App