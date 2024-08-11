import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'

function App(props) {
  const contextApp = React.useContext(ContextApp)

  const onDestory = props.onDestory

  const [destory, setDestory] = React.useState(false)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDisappear } = ReactExtensions.useAnimationDestination({ play: destory, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (animationCountDisappear === 1) onDestory()
  }, [animationCountDisappear])

  return <layout globalAlpha={animationCountAppear - animationCountDisappear}>

    <layout container verticalCenter horizontalAlignCenter>
      <ReactCanvas2dExtensions.TextCaculateLine text={`WIRELOST`} font={`bolder ${contextApp.unitpx * 0.12}px sans-serif`} lineHeight={1} gap={0} w={Infinity}>
        {
          (line, location) => {
            return line.map(i => {
              return <layout w={i.w} h={i.h} item>
                <text fillText fillStyle='white' text={i.text} font={`bolder ${contextApp.unitpx * 0.12}px sans-serif`} />
              </layout>
            })
          }
        }
      </ReactCanvas2dExtensions.TextCaculateLine>
      <layout h={contextApp.unitpx * 0.06} item></layout>
      <ReactCanvas2dExtensions.TextCaculateLine text={'点击任意处开始'} font={`bolder ${contextApp.unitpx * 0.04}px sans-serif`} lineHeight={1} gap={0} w={Infinity}>
        {
          (line, location) => {
            return line.map(i => {
              return <layout w={i.w} h={i.h} item>
                <text fillText fillStyle={`rgb(130, 130, 130)`} text={i.text} font={`bolder ${contextApp.unitpx * 0.04}px sans-serif`} />
              </layout>
            })
          }
        }
      </ReactCanvas2dExtensions.TextCaculateLine>
    </layout>

    <ReactCanvas2dExtensions.TextCaculateLine text={`Version 1.0.1`} font={`bolder ${contextApp.unitpx * 0.025}px sans-serif`} lineHeight={1} gap={0} w={Infinity}>
      {
        (line, location) => {
          return line.map(i => {
            return <text w={i.w} h={i.h} b={contextApp.unitpx * 0.04} l={contextApp.unitpx * 0.04} fillText fillStyle='white' text={i.text} font={`bolder ${contextApp.unitpx * 0.025}px sans-serif`} />
          })
        }
      }
    </ReactCanvas2dExtensions.TextCaculateLine>

    <rectradius onPointerDown={() => setDestory(true)} />

  </layout>
}

export default App