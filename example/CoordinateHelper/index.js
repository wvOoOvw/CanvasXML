import { React, ReactDomComponent, ReactDom, Caculate } from '../../package/index'

function App() {
  const [randoms, setRandoms] = React.useState(new Array(24).fill().map(i => Object({ x: Caculate.random(ReactDom.canvas().coordinate.w, -50, 0), y: Caculate.random(ReactDom.canvas().coordinate.h, -50, 0), fillStyle: `rgba(${Caculate.random(255, 0, 0)}, ${Caculate.random(255, 0, 0)}, ${Caculate.random(255, 0, 0), 1})` })))

  return <>
    <ReactDomComponent.CoordinateHelper position={ReactDom.canvas().coordinate} gap={100} color={'rgba(255, 255, 255, 1)'} />

    {
      randoms.map(i => {
        return <rect save fill fillStyle={i.fillStyle} x={i.x} y={i.y} w={100} h={100} />
      })
    }
  </>
}

ReactDom.mount(<App />, { frameTimeDiffMax: 12 }).render()