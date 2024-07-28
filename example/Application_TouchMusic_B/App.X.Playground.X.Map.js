import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return <layout cx='50%' cy='50%' w={contextPlayground.information.location.w} h={contextPlayground.information.location.h}>

    {/* <rectradius
      fill
      radius={contextApp.unitpx * 0.02}
      fillStyle='gray'
      shadowBlur={contextApp.unitpx * 0.04}
      shadowColor='gray'
    /> */}

    <layout container horizontalCenter>

      {
        new Array(contextPlayground.information.dimensions[1]).fill().map((i, index) => {
          return <layout w={0} container verticalCenter horizontalAlignCenter item grow={1}>

            {
              new Array(contextPlayground.information.dimensions[0]).fill().map((n, nindex) => {
                return <layout h={0} item grow={1}>

                  <rectradius
                    fill
                    fillStyle={(index + nindex) % 2 === 0 ? 'rgb(0, 215, 085)' : 'rgb(0, 25, 175)'}
                  />

                </layout>
              })
            }

          </layout>
        })
      }

    </layout>
  </layout>


}

export default App