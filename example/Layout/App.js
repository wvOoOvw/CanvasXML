import { React, ReactDomComponent, ReactDom } from '../../package/index'

function App() {
  return <>
    <ReactDomComponent.CoordinateHelper x={ReactDom.canvas().coordinate.x} y={ReactDom.canvas().coordinate.y} w={ReactDom.canvas().coordinate.w} h={ReactDom.canvas().coordinate.h} gap={100} color={'rgba(255, 255, 255, 1)'} />

    <layout x={ReactDom.canvas().coordinate.x} y={ReactDom.canvas().coordinate.y} w={ReactDom.canvas().coordinate.w} h={ReactDom.canvas().coordinate.h} horizontalCenter verticalAlignCenter>

      <layout w={400} h={400} horizontalCenter verticalAlignCenter>
        <layout w={100} h={100} horizontalAlignCenter verticalAlignCenter>
          <layout w={80} h={80}>
            {
              (props) => <rect isolated fill beginPath fillStyle='rgba(10, 10, 145, 1)' {...props} />
            }
          </layout>
        </layout>

        <layout w={100} h={100}>
          {
            (props) => <rect isolated fill beginPath fillStyle='rgba(145, 145, 25, 1)' {...props} />
          }
        </layout>
        
        <layout w={100} h={100} horizontalAlignCenter verticalAlignCenter>
          <layout w={80} h={80}>
            {
              (props) => <rect isolated fill beginPath fillStyle='rgba(10, 10, 145, 1)' {...props} />
            }
          </layout>
        </layout>
      </layout>

      <layout w={300} h={600} verticalAround horizontalAlignCenter>
        <layout w={120} h={120} horizontalAlignCenter verticalAlignCenter>
          <layout w={100} h={100}>
            {
              (props) => <rect isolated fill beginPath fillStyle='rgba(10, 230, 145, 1)' {...props} />
            }
          </layout>
        </layout>

        <layout w={120} h={120} horizontalAlignCenter verticalAlignCenter>
          <layout w={100} h={100}>
            {
              (props) => <rect isolated fill beginPath fillStyle='rgba(10, 230, 145, 1)' {...props} />
            }
          </layout>
        </layout>

        <layout w={120} h={120} horizontalAlignCenter verticalAlignCenter>
          <layout w={100} h={100}>
            {
              (props) => <rect isolated fill beginPath fillStyle='rgba(10, 230, 145, 1)' {...props} />
            }
          </layout>
        </layout>
      </layout>

      <layout w={400} h={400} verticalCenter horizontalAlignCenter>
        <layout w={100} h={100}>
          {
            (props) => <rect isolated fill beginPath fillStyle='rgba(200, 145, 25, 1)' {...props} />
          }
        </layout>

        <layout w={100} h={100}>
          {
            (props) => <rect isolated fill beginPath fillStyle='rgba(255, 255, 0, 1)' {...props} />
          }
        </layout>

        <layout w={100} h={100}>
          {
            (props) => <rect isolated fill beginPath fillStyle='rgba(0, 255, 0, 1)' {...props} />
          }
        </layout>

        <layout w={100} h={100}>
          {
            (props) => <rect isolated fill beginPath fillStyle='rgba(35, 255, 145, 1)' {...props} />
          }
        </layout>
      </layout>

    </layout>
  </>
}

export default App