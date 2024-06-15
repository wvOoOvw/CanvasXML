import { React, ReactPlugin, ReactDomComponent, ReactDom, Position } from '../../package/index'

function LayoutItem(props) {
  const coordinate = Position.coordinate(props)

  const { animationCount, animationFlow, setAnimationFlow } = ReactPlugin.useAnimationCount({ count: 0, flow: 1, delay: 0, min: 0, max: 1, rate: 1 / 15, play: true, reverse: false })

  const radius = coordinate.vmin * 4 + coordinate.vmin * 12 * animationCount
  const fillStyle = `rgba(${145 + (95 - 145) * animationCount}, ${145 + (120 - 145) * animationCount}, ${145 + (195 - 145) * animationCount}, 1)`

  const onClick = e => {
    if (e.device === 'mouse' && Position.pointcover({ x: e.props.x, y: e.props.y, w: e.props.w, h: e.props.h }, { x: e.x, y: e.y })) {
      setAnimationFlow(animationFlow ? 0 : 1)
    }
    if (e.device === 'touch' && Position.pointcover({ x: e.props.x, y: e.props.y, w: e.props.w, h: e.props.h }, { x: e.x[0], y: e.y[0] })) {
      setAnimationFlow(animationFlow ? 0 : 1)
    }
  }

  return <layout w={coordinate.w} h={coordinate.h} horizontalAlignCenter verticalAlignCenter>
    <rect w={coordinate.w - 8} h={coordinate.h - 8} isolated fill beginPath fillStyle={fillStyle} radius={radius} onClick={onClick}></rect>
  </layout>
}

function App() {
  const coordinate = ReactDom.canvas().coordinate

  return <>

    <layout x={coordinate.x} y={coordinate.y} w={coordinate.w} h={coordinate.h} verticalCenter horizontalAlignCenter>

      <layout id-x={'clip-rect'} id-y={'clip-rect'} w={coordinate.vw * 40} h={coordinate.vh * 40} horizontalAlignCenter verticalAlignCenter>
        <rect w={coordinate.vw * 40} h={coordinate.vh * 40} isolated fill beginPath fillStyle='rgba(255, 255, 255, 1)' id='clip-rect'></rect>
        <layout w={coordinate.vw * 36} h={coordinate.vh * 36} wrap verticalCenter horizontalCenter>
          {
            new Array(12).fill().map(i => <LayoutItem w={coordinate.vmin * 8} h={coordinate.vmin * 8} />)
          }
        </layout>
      </layout>

      <layout w={coordinate.vw * 100} h={coordinate.vh * 16} verticalReverse horizontalAlignCenter>
        <layout w={coordinate.vw * 100} h={coordinate.vh * 4} verticalCenter horizontalCenter>
          <text w={coordinate.vw * 100} h={coordinate.vh * 2} isolated fillText fillStyle={'rgba(255, 255, 255, 1)'} font={`${Math.floor(coordinate.vh * 2)}px monospace`} text='Check GITHUB' align='center' />
        </layout>
        <layout w={coordinate.vw * 100} h={coordinate.vh * 4} verticalCenter horizontalCenter>
          <text w={coordinate.vw * 100} h={coordinate.vh * 2} isolated fillText fillStyle={'rgba(255, 255, 255, 1)'} font={`${Math.floor(coordinate.vh * 2)}px monospace`} text='Component <Rect/> DEMO' align='center' />
        </layout>
        <layout w={coordinate.vw * 100} h={coordinate.vh * 4} verticalCenter horizontalCenter>
          <text w={coordinate.vw * 100} h={coordinate.vh * 2} isolated fillText fillStyle={'rgba(175, 175, 175, 1)'} font={`${Math.floor(coordinate.vh * 2)}px monospace`} text='Click The Rect Above To Change The Color' align='center' />
        </layout>
      </layout>

    </layout>

  </>
}

export default App