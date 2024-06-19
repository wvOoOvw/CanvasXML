import { React, ReactDomComponent, ReactDom } from '../../package/index'

function App() {
  return <>
    <ReactDomComponent.CoordinateHelper repeat={12} gap={100} color={'rgba(255, 255, 255, 1)'} />
  </>
}

export default App