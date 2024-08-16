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

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 15, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountWait, setAnimationCount: setAnimationCountWait } = ReactExtensions.useAnimationDestination({ play: animationCountAppear === 1 && index === 0, defaultCount: 0, destination: 1, rate: 1 / 60, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDisappear } = ReactExtensions.useAnimationDestination({ play: animationCountWait === 1, defaultCount: 0, destination: 1, rate: 1 / 15, postprocess: n => Number(n.toFixed(4)) })

  const w = contextApp.unitpx * 0.48
  const h = contextApp.unitpx * 0.12
  const x = contextApp.locationLayout.w - w - contextApp.unitpx * 0.08 * (animationCountAppear - animationCountDisappear)
  const y = contextApp.unitpx * 0.08 + contextApp.unitpx * 0.12 * 1.25 * index

  const globalAlpha = animationCountAppear - animationCountDisappear

  const { animationCount: animationCountY } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: y, destination: y, rate: contextApp.unitpx * 0.01, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (animationCountDisappear === 1) {
      onDestory()
    }
  }, [animationCountDisappear])

  React.useEffect(() => {
    if (index > 0) {
      setAnimationCountWait(0)
    }
  },[index])

  return <layout x={x} y={animationCountY} w={w} h={h} globalAlpha={globalAlpha}>

    <rect fill fillStyle='rgb(255, 255, 255)' radius={[contextApp.unitpx * 0.02, contextApp.unitpx * 0.02, contextApp.unitpx * 0.02, contextApp.unitpx * 0.02]} />

    <image cx={contextApp.unitpx * 0.08} cy='50%' w={contextApp.unitpx * 0.08} h={contextApp.unitpx * 0.08} src={contextApp.imagePngPngInfoCustomBlackpink} size='auto-min' position='center' />

    <ReactCanvas2dExtensions.Text text={message} font={`bolder ${contextApp.unitpx * 0.065}px sans-serif`} w={Infinity}>
      {
        (line, location) => {
          return line.map(i => {
            return <text fillText fillStyle='rgb(0, 0, 0)' cx='50%' cy='50%' w={i.w} h={i.h} text={i.text} font={i.font} />
          })
        }
      }
    </ReactCanvas2dExtensions.Text>

  </layout>
}

function App() {
  const contextApp = React.useContext(ContextApp)

  return contextApp.message.map((i, index) => <MessageComponent key={i.key} message={i.message} index={index} onDestory={() => contextApp.removeMessage(i.key)} />)
}

export default App