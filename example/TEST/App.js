import { React, ReactDomComponent, ReactDom, Position } from '../../package/index'

function App() {
  const coordinate = Position.coordinate(ReactDom.canvas().coordinate)

  return <layout>
        {console.log(3)}

    <rect>
        {console.log(2)}
        <rect>
        {console.log(1)}
      </rect>
    </rect>
    
  </layout>
}

export default App