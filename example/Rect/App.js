import { React, ReactPlugin, ReactDomComponent, ReactDom, ReactDomTag, Location } from '../../package/index'

function RectComponent(props) {
  const coordinate = Location.coordinate(props)

  const [active, setActive] = React.useState(false)

  const { transitionCount: radius } = ReactPlugin.useTransitionCount({ defaultCount: coordinate.vmin * 4, destination: active ? coordinate.vmin * 16 : coordinate.vmin * 4, rate: coordinate.vmin * 12 / 15, postprocess: n => Number(n.toFixed(2)) })
  const { transitionCount: fillStyleRed } = ReactPlugin.useTransitionCount({ defaultCount: 145, destination: active ? 115 : 145, rate: 50 / 15, postprocess: n => n.toFixed(0) })
  const { transitionCount: fillStyleGreen } = ReactPlugin.useTransitionCount({ defaultCount: 145, destination: active ? 125 : 145, rate: 25 / 15, postprocess: n => n.toFixed(0) })
  const { transitionCount: fillStyleBlue } = ReactPlugin.useTransitionCount({ defaultCount: 145, destination: active ? 195 : 145, rate: 50 / 15, postprocess: n => n.toFixed(0) })

  const fillStyle = `rgba(${fillStyleRed}, ${fillStyleGreen}, ${fillStyleBlue}, 1)`

  const onClick = e => {
    if (e.device === 'mouse' && Location.pointcover({ x: e.props.x, y: e.props.y, w: e.props.w, h: e.props.h }, { x: e.x, y: e.y })) {
      setActive(!active)
    }
    if (e.device === 'touch' && Location.pointcover({ x: e.props.x, y: e.props.y, w: e.props.w, h: e.props.h }, { x: e.x[0], y: e.y[0] })) {
      setActive(!active)
    }
  }

  return <layout w={coordinate.w} h={coordinate.h}>
    <rect x='extend' y='extend' w='extend' h='extend' isolated fill beginPath fillStyle={fillStyle} radius={radius} onClick={onClick}></rect>
  </layout>
}

function BlockGraph() {
  const coordinate = ReactDom.canvas().coordinate

  return <layout w={coordinate.vw * 64} h={coordinate.vh * 40} horizontalAlignCenter verticalAlignCenter>
    <layout w={coordinate.vw * 60} h={coordinate.vh * 36} gap={coordinate.vmin * 1} wrap verticalCenter horizontalCenter>
      <rect x='extend' y='extend' w='extend' h='extend' beginPath fillStyle='rgba(255, 255, 255, 1)' radius={coordinate.vmin * 1}>
        <fill />
      </rect>
    </layout>

    <layout w={coordinate.vw * 60} h={coordinate.vh * 36} gap={coordinate.vmin * 1} wrap verticalCenter horizontalCenter>
      {
        new Array(12).fill().map(i => <RectComponent w={coordinate.vmin * 8} h={coordinate.vmin * 8} />)
      }
    </layout>
  </layout>
}

function BlockDescription() {
  const coordinate = ReactDom.canvas().coordinate

  return <layout w={coordinate.vw * 92} h={coordinate.vh * 12} verticalForward horizontalAlignCenter>

    <layout w={(n) => n.w} h={coordinate.vh * 4} horizontalAlignCenter verticalAlignCenter></layout>

    <ReactDomTag.Text.Line w={coordinate.vw * 92} font={`${Math.floor(coordinate.vh * 2)}px monospace`} text='Component <Rect/> DEMO' split=' '>
      {
        (lines) => {
          return <layout w={Math.max(...lines.map(i => i.w))} h={lines.reduce((t, i) => t + i.h * 2, 0)} verticalForward horizontalAlignCenter>
            {
              lines.map(i => {
                return <layout w={i.w} h={i.h * 2} horizontalAlignCenter verticalAlignCenter>
                  <layout w={i.w} h={i.h}>
                    <text x='extend' y='extend' w='extend' h='extend' isolated fillText fillStyle={'rgba(255, 255, 255, 1)'} font={`${Math.floor(coordinate.vh * 2)}px monospace`} text={i.text} lineHeight={1} />
                  </layout>
                </layout>
              })
            }
          </layout>
        }
      }
    </ReactDomTag.Text.Line>

    <layout w={coordinate.vw * 92} h={coordinate.vh * 1} horizontalAlignCenter verticalAlignCenter></layout>

    <ReactDomTag.Text.Line w={coordinate.vw * 92} font={`${Math.floor(coordinate.vh * 2)}px monospace`} text='Click The Rect Above To Change The Color' split=' '>
      {
        (lines) => {
          return <layout w={Math.max(...lines.map(i => i.w))} h={lines.reduce((t, i) => t + i.h * 2, 0)} verticalForward horizontalAlignCenter>
            {
              lines.map(i => {
                return <layout w={i.w} h={i.h * 2} horizontalAlignCenter verticalAlignCenter>
                  <layout w={i.w} h={i.h}>
                    <text x='extend' y='extend' w='extend' h='extend' isolated fillText fillStyle={'rgba(255, 255, 255, 1)'} font={`${Math.floor(coordinate.vh * 2)}px monospace`} text={i.text} lineHeight={1} />
                  </layout>
                </layout>
              })
            }
          </layout>
        }
      }
    </ReactDomTag.Text.Line>

    <layout w={coordinate.vw * 92} h={coordinate.vh * 1} horizontalAlignCenter verticalAlignCenter></layout>

    <ReactDomTag.Text.Line w={coordinate.vw * 92} font={`${Math.floor(coordinate.vh * 2)}px monospace`} text='Check GITHUB Document' split=' '>
      {
        (lines) => {
          return <layout w={Math.max(...lines.map(i => i.w))} h={lines.reduce((t, i) => t + i.h * 2, 0)} verticalForward horizontalAlignCenter>
            {
              lines.map(i => {
                return <layout w={i.w} h={i.h * 2} horizontalAlignCenter verticalAlignCenter>
                  <layout w={i.w} h={i.h}>
                    <text x='extend' y='extend' w='extend' h='extend' isolated fillText fillStyle={'rgba(255, 255, 255, 1)'} font={`${Math.floor(coordinate.vh * 2)}px monospace`} text={i.text} lineHeight={1} />
                  </layout>
                </layout>
              })
            }
          </layout>
        }
      }
    </ReactDomTag.Text.Line>

    <layout w={coordinate.vw * 92} h={coordinate.vh * 4} horizontalAlignCenter verticalAlignCenter></layout>

  </layout>
}

function BlockControl() {
  const coordinate = ReactDom.canvas().coordinate

  return <layout w={coordinate.vw * 64} h={coordinate.vh * 40} horizontalAlignCenter verticalAlignCenter>
    <rect w={coordinate.vw * 64} h={coordinate.vh * 40} isolated fill beginPath fillStyle='rgba(255, 255, 255, 1)' radius={coordinate.vmin * 1}></rect>
    <layout w={coordinate.vw * 60} h={coordinate.vh * 36} gap={coordinate.vmin * 1} wrap verticalCenter horizontalCenter>
      {
        new Array(12).fill().map(i => <RectComponent w={coordinate.vmin * 8} h={coordinate.vmin * 8} />)
      }
    </layout>
  </layout>
}

function App() {
  const coordinate = ReactDom.canvas().coordinate

  return <>
    <ReactDomComponent.CoordinateHelper x={ReactDom.canvas().coordinate.x} y={ReactDom.canvas().coordinate.y} w={ReactDom.canvas().coordinate.w} h={ReactDom.canvas().coordinate.h} gap={100} color={'rgba(255, 255, 255, 1)'} />

    <layout x={coordinate.x} y={coordinate.y} w={coordinate.w} h={coordinate.h} verticalCenter horizontalAlignCenter>
      <BlockGraph />
      <BlockDescription />
    </layout>
  </>
}

export default App