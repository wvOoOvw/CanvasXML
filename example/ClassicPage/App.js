import { React, ReactDomComponent, ReactDom } from '../../package/index'

function App() {
  return <>
    {/* <ReactDomComponent.CoordinateHelper position={ReactDom.coordinate()} gap={100} color={'rgba(255, 255, 255, 1)'} /> */}

    <layout position={ReactDom.coordinate()} positions={[]} horizontal='center' vertical='center'>

      <layout w={100} h={100}>
        <layout w={20} h={20}></layout>
        <layout w={20} h={20}></layout>
      </layout>
      <layout w={100} h={100}>
        <layout w={66} h={66}></layout>
        <layout w={66} h={66}></layout>
      </layout>
      <layout w={100} h={100}></layout>
      <layout w={100} h={100}></layout>

    </layout>
  </>
}

export default App