import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

function App(props) {
  const contextApp = props.contextApp

  const title = props.title
  const content = props.content
  const color = props.color

  const Component =
    <layout w={contextApp.unitpx * 0.2} h={contextApp.unitpx * 0.08} item container horizontalCenter gap={contextApp.unitpx * 0.02}>
      <layout w={contextApp.unitpx * 0.2} h={contextApp.unitpx * 0.08} item>
        <rectradiusarc cx='50%' cy='50%' fill fillStyle={color} radius={contextApp.unitpx * 0.016} />
        <rectradiusarc cx='50%' cy='50%' stroke strokeStyle='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.016} lineWidth={contextApp.unitpx * 0.0072} />
        <rectradiusarc x={contextApp.unitpx * 0.048 + contextApp.unitpx * 0.024 * 2 - contextApp.unitpx * 0.0072} cy='50%' w={contextApp.unitpx * 0.0072} h={contextApp.unitpx * 0.048} fill fillStyle='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.0072 / 2} />
        {
          title.text ?
            <ReactCanvas2dExtensions.Text text={title.text} font={`bolder ${contextApp.unitpx * 0.032}px sans-serif`} w={Infinity}>
              {
                (line, location) => {
                  return <text x={contextApp.unitpx * 0.024} cy='50%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
                }
              }
            </ReactCanvas2dExtensions.Text>
            : null
        }
        {
          title.image ?
            <image x={contextApp.unitpx * 0.024} cy='50%' w={contextApp.unitpx * 0.048} h={contextApp.unitpx * 0.048} src={title.image} />
            : null
        }
        {
          content.text ?
            <ReactCanvas2dExtensions.Text text={content.text} font={`bolder ${contextApp.unitpx * 0.032}px sans-serif`} w={Infinity}>
              {
                (line, location) => {
                  return <text x={contextApp.unitpx * 0.2 - contextApp.unitpx * 0.024 - line[0].w} cy='50%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
                }
              }
            </ReactCanvas2dExtensions.Text>
            : null
        }
        {
          content.image ?
            <image x={contextApp.unitpx * 0.2 - contextApp.unitpx * 0.024 - contextApp.unitpx * 0.048} cy='50%' w={contextApp.unitpx * 0.048} h={contextApp.unitpx * 0.048} src={content.image} />
            : null
        }
      </layout>
    </layout>

  return Component
}

export default App