import { React, ReactDomComponent, ReactDom } from '../../package/index'

function App() {
  return <>
    <ReactDomComponent.CoordinateHelper position={ReactDom.coordinate()} gap={100} color={'rgba(255, 255, 255, 1)'} />
  </>
}

ReactDom.mount(<App />, { frameTimeDiffMax: 12 }).render()