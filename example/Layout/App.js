import { React, ReactDomComponent, ReactDom } from '../../package/index'

function App() {
  return <>
    <ReactDomComponent.CoordinateHelper x={ReactDom.canvas().coordinate.x} y={ReactDom.canvas().coordinate.y} w={ReactDom.canvas().coordinate.w} h={ReactDom.canvas().coordinate.h} gap={100} color={'rgba(255, 255, 255, 1)'} />

    <layout x={ReactDom.canvas().coordinate.x} y={ReactDom.canvas().coordinate.y} w={ReactDom.canvas().coordinate.w} h={ReactDom.canvas().coordinate.h} flow={['horizontal', 'verticalAlign']} horizontal='center' verticalAlign='center'>

      <layout w={400} h={400} flow={['horizontal', 'verticalAlign']} horizontal='center' verticalAlign='center'>
        <layout w={100} h={100} flow={['horizontalAlign', 'verticalAlign']} horizontalAlign='center' verticalAlign='center'>
          <layout w={80} h={80}>
            {
              (props) => <rect isolated fill fillStyle='rgba(10, 10, 145, 1)' {...props} />
            }
          </layout>
        </layout>

        <layout w={100} h={100}>
          {
            (props) => <rect isolated fill fillStyle='rgba(145, 145, 25, 1)' {...props} />
          }
        </layout>
        
        <layout w={100} h={100} flow={['horizontalAlign', 'verticalAlign']} horizontalAlign='center' verticalAlign='center'>
          <layout w={80} h={80}>
            {
              (props) => <rect isolated fill fillStyle='rgba(10, 10, 145, 1)' {...props} />
            }
          </layout>
        </layout>
      </layout>

      <layout w={300} h={600} flow={['vertical', 'horizontalAlign']} vertical='around' horizontalAlign='center'>
        <layout w={120} h={120} flow={['horizontalAlign', 'verticalAlign']} horizontalAlign='center' verticalAlign='center'>
          <layout w={100} h={100}>
            {
              (props) => <rect isolated fill fillStyle='rgba(10, 230, 145, 1)' {...props} />
            }
          </layout>
        </layout>

        <layout w={120} h={120} flow={['horizontalAlign', 'verticalAlign']} horizontalAlign='center' verticalAlign='center'>
          <layout w={100} h={100}>
            {
              (props) => <rect isolated fill fillStyle='rgba(10, 230, 145, 1)' {...props} />
            }
          </layout>
        </layout>

        <layout w={120} h={120} flow={['horizontalAlign', 'verticalAlign']} horizontalAlign='center' verticalAlign='center'>
          <layout w={100} h={100}>
            {
              (props) => <rect isolated fill fillStyle='rgba(10, 230, 145, 1)' {...props} />
            }
          </layout>
        </layout>
      </layout>

      <layout w={400} h={400} flow={['vertical', 'horizontalAlign']} vertical='center' horizontalAlign='center'>
        <layout w={100} h={100}>
          {
            (props) => <rect isolated fill fillStyle='rgba(200, 145, 25, 1)' {...props} />
          }
        </layout>

        <layout w={100} h={100}>
          {
            (props) => <rect isolated fill fillStyle='rgba(255, 255, 0, 1)' {...props} />
          }
        </layout>

        <layout w={100} h={100}>
          {
            (props) => <rect isolated fill fillStyle='rgba(0, 255, 0, 1)' {...props} />
          }
        </layout>

        <layout w={100} h={100}>
          {
            (props) => <rect isolated fill fillStyle='rgba(35, 255, 145, 1)' {...props} />
          }
        </layout>
      </layout>

    </layout>
  </>
}

export default App