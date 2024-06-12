import { React, ReactDomComponent, ReactDom, Position } from '../../package/index'

function App() {
  const coordinate = Position.coordinate(ReactDom.canvas().coordinate)
  return <>
    <ReactDomComponent.CoordinateHelper x={ReactDom.canvas().coordinate.x} y={ReactDom.canvas().coordinate.y} w={ReactDom.canvas().coordinate.w} h={ReactDom.canvas().coordinate.h} gap={100} color={'rgba(255, 255, 255, 1)'} />

    <layout x={ReactDom.canvas().coordinate.x} y={ReactDom.canvas().coordinate.y} w={ReactDom.canvas().coordinate.w} h={ReactDom.canvas().coordinate.h} horizontalCenter verticalAlignCenter>

      <layout w={coordinate.vw * 40} h={coordinate.vh * 40} wrap verticalCenter horizontalCenter>
        {
          (props) => <rect isolated fill beginPath fillStyle='rgba(255, 255, 255, 1)' {...props} />
        }

        {
          new Array(24).fill().map(i => {
            return <layout w={100} h={100} horizontalAlignCenter verticalAlignCenter>
              <layout w={92} h={92}>
                {
                  (props) => <rect isolated fill beginPath fillStyle='rgba(145, 145, 145, 1)' {...props} />
                }
              </layout>
            </layout>
          })
        }
      </layout>

      <layout w={coordinate.vw * 40} h={coordinate.vh * 40} verticalCenter horizontalAlignCenter>
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