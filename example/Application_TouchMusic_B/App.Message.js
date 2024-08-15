import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'

function MessageComponent(props) {
  const contextApp = React.useContext(ContextApp)

  const message = props.message
  const index = props.index
  const onDestory = props.onDestory

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountWait } = ReactExtensions.useAnimationDestination({ play: animationCountAppear === 1, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDisappear } = ReactExtensions.useAnimationDestination({ play: animationCountWait === 1, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })

  const x = contextApp.locationLayout.w - contextApp.unitpx * 0.12 * (animationCountAppear - animationCountDisappear)
  const y = contextApp.unitpx * 0.12 + contextApp.unitpx * 0.12 * 1.5 * index
  const w = contextApp.unitpx * 0.42
  const h = contextApp.unitpx * 0.12
  const globalAlpha = animationCountAppear - animationCountDisappear

  React.useEffect(() => {
    if (animationCountDisappear === 1) {
      onDestory()
    }
  }, [animationCountDisappear])

  return <layout x={x} y={y} w={w} h={h} globalAlpha={globalAlpha}>

    <rect fill fillStyle='rgb(255, 255, 255)' />

      <ReactCanvas2dExtensions.TextCaculateLine text={message} font={`bolder ${contextApp.unitpx * 0.08}px sans-serif`} lineHeight={1} gap={0} w={Infinity}>
        {
          (line, location) => {
            return line.map(i => {
              return <text fillText fillStyle='rgb(0, 0, 0)' cx='50%' cy='50%' w={i.w} h={i.h} text={i.text} font={i.font} />
            })
          }
        }
      </ReactCanvas2dExtensions.TextCaculateLine>

  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)

  return contextApp.message.map((i, index) => <MessageComponent key={i.key} message={i.message} index={index} onDestory={() => contextApp.removeMessage(i.key)} />)
}

export default App