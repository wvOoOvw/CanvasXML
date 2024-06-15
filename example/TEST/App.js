import { React, ReactDomComponent, ReactDom, Position } from '../../package/index'

function LayoutItem(props) {
  const [active, setActive] = React.useState(false)

  const onClick = e => {
    if (Position.pointcover({ x: e.props.x, y: e.props.y, w: e.props.w, h: e.props.h }, { x: e.x, y: e.y })) {
      setActive(!active)
    }
  }

  React.useEffect(() => {
    console.log(2)
  },[])

  return <layout w={props.w} h={props.h} horizontalAlignCenter verticalAlignCenter>
    <layout w={props.w - 8} h={props.h - 8} pass>
      <rect isolated fill beginPath fillStyle={active ? 'rgba(95, 255, 25, 1)' : 'rgba(145, 145, 145, 1)'} onClick={onClick} />
    </layout>
  </layout>
}

function App() {
  const coordinate = ReactDom.canvas().coordinate

  return <>

    <layout x={coordinate.x} y={coordinate.y} w={coordinate.w} h={coordinate.h} horizontalAlignCenter verticalAlignCenter>

      <layout w={coordinate.vw * 40} h={coordinate.vh * 40} pass>
        <rect isolated fill beginPath fillStyle='rgba(255, 255, 255, 1)' />
      </layout>

      <layout w={coordinate.vw * 40} h={coordinate.vh * 40} wrap verticalCenter horizontalCenter>

        {
          new Array(12).fill().map(i => <LayoutItem w={coordinate.vmin * 8} h={coordinate.vmin * 8} />)
        }

      </layout>

    </layout>

  </>
}

export default App