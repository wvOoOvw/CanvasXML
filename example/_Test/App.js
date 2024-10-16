import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

function App(props) {
  return <>

    <layout w='75%' h='75%' gap={24} container wrap horizontalBetween verticalForward>
      <rect fill fillStyle='white'/>
        {
          new Array(24).fill().map(i => {
            return <layout w='120px' h='120px' item><rect fill fillStyle='gray'/></layout>
          })
        }
    </layout>

  </>
}

export default App