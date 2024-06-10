import { React, ReactDomComponent, ReactDom } from '../../package/index'

function App() {
  return <>
    <ReactDomComponent.CoordinateHelper position={ReactDom.canvas().coordinate} gap={100} color={'rgba(255, 255, 255, 1)'} />

    <rect save fill fillStyle='rgba(200, 145, 25, 1)' x={125} y={125} w={100} h={100} />
    <rect save fill fillStyle='rgba(0, 145, 25, 1)' x={300} y={340} w={100} h={100} />
    <rect save fill fillStyle='rgba(100, 25, 200, 1)' x={240} y={400} w={100} h={100} />
  </>
}

ReactDom.mount(<App />, { frameTimeDiffMax: 12 }).render()