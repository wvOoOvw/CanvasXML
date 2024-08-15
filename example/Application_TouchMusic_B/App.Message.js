import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'

function MessageComponent(props) {
  const contextApp = React.useContext(ContextApp)

  const message = props.message
  const onDestory = props.onDestory

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountWait } = ReactExtensions.useAnimationDestination({ play: animationCountAppear === 1, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDisappear } = ReactExtensions.useAnimationDestination({ play: animationCountWait === 1, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })

  return <layout>

      <ReactCanvas2dExtensions.TextCaculateLine text={message} font={`bolder ${contextApp.unitpx * 0.12}px sans-serif`} lineHeight={1} gap={0} w={Infinity}>
        {
          (line, location) => {
            return line.map(i => {
              return <layout w={i.w} h={i.h} item>
                <text fillText fillStyle='white' w={i.w} h={i.h} text={i.text} font={i.font} />
              </layout>
            })
          }
        }
      </ReactCanvas2dExtensions.TextCaculateLine>

  </layout>
}

function App(props) {
  const contextApp = React.useContext(ContextApp)

  return null
}

export default App