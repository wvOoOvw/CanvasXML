import { React, ReactDomComponent, ReactDom } from '../../package/index'

function App() {
  return <layout x='extend' y='extend' w='extend' h='extend'>
    <ReactDomComponent.CoordinateHelper gap={100} color={'rgba(255, 255, 255, 1)'} />
  </layout>
}

export default App