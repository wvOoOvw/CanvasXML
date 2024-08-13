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
  const { animationCount: animationCountDisappear } = ReactExtensions.useAnimationDestination({ play: destory === true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })

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
                <text fillText fillStyle='white' w={i.w} h={i.h} text={i.text} font={i.font} />
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
                <text fillText fillStyle={`rgb(130, 130, 130)`} w={i.w} h={i.h} text={i.text} font={i.font} />
              </layout>
            })
          }
        }
      </ReactCanvas2dExtensions.TextCaculateLine>
    </layout>

    <ReactCanvas2dExtensions.TextCaculateLine text={`Version ${contextApp.version}`} font={`bolder ${contextApp.unitpx * 0.025}px sans-serif`} lineHeight={1} gap={0} w={Infinity}>
      {
        (line, location) => {
          return line.map(i => {
            return <text b={contextApp.unitpx * 0.04} l={contextApp.unitpx * 0.04} fillText fillStyle='white' w={i.w} h={i.h} text={i.text} font={i.font} />
          })
        }
      }
    </ReactCanvas2dExtensions.TextCaculateLine>

    <rect onPointerDown={animationCountAppear === 1 ? () => setDestory(true) : undefined} />

  </layout>
}

export default App