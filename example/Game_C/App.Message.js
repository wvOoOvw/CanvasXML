import React from '../../package/React'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'

function MessageComponent(props) {
  const contextApp = React.useContext(ContextApp)

  const message = props.message
  const index = props.index
  const onDestory = props.onDestory

  const { animationCountProcessed: animationCountAppear } = ReactExtensions.useAnimationCount({ play: true, defaultCount: 0, destination: 1, rate: 1 / 15, postprocess: n => Number(n.toFixed(4)) })
  const { animationCountProcessed: animationCountWait } = ReactExtensions.useAnimationCount({ play: animationCountAppear === 1 && index === 0, defaultCount: 0, destination: 1, rate: 1 / 60, postprocess: n => Number(n.toFixed(4)) })
  const { animationCountProcessed: animationCountDisappear } = ReactExtensions.useAnimationCount({ play: animationCountWait === 1, defaultCount: 0, destination: 1, rate: 1 / 15, postprocess: n => Number(n.toFixed(4)) })

  const x = contextApp.locationLayout.w - contextApp.unitpx * 0.24 - contextApp.unitpx * 0.08 * (animationCountAppear - animationCountDisappear)
  const y = contextApp.unitpx * 0.14 + contextApp.unitpx * 0.12 * 1.25 * index

  const { animationCountProcessed: animationCountY } = ReactExtensions.useAnimationCount({ play: true, defaultCount: y, destination: y, rate: contextApp.unitpx * 0.01, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (animationCountDisappear === 1) {
      onDestory()
    }
  }, [animationCountDisappear])

  const Component =
    <layout x={x} y={animationCountY} w={contextApp.unitpx * 0.48} h={contextApp.unitpx * 0.12} globalAlpha={animationCountAppear - animationCountDisappear}>
      <rectradiusarc fill fillStyle='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.02} />
      <image x={contextApp.unitpx * 0.072} w={contextApp.unitpx * 0.064} h={contextApp.unitpx * 0.064} src={contextApp.imagePngInfoBlack} clipHorizontalCenter clipVerticalCenter />
      <ReactCanvas2dExtensions.Text text={message} font={`bolder ${contextApp.unitpx * 0.04}px sans-serif`} w={contextApp.unitpx * 0.48 - contextApp.unitpx * 0.024} ellipsis='...'>
        {
          (line, location) => {
            return <text fillText fillStyle='rgb(0, 0, 0)' x={contextApp.unitpx * 0.12 + line[0].w / 2} w={line[0].w} h={line[0].h} text={line[0].text} font={line[0].font} />
          }
        }
      </ReactCanvas2dExtensions.Text>
    </layout>

  return Component
}

function App() {
  const contextApp = React.useContext(ContextApp)

  return contextApp.message.map((i, index) => <MessageComponent key={i.key} message={i.message} index={index} onDestory={() => contextApp.removeMessage(i.key)} />)
}

export default App