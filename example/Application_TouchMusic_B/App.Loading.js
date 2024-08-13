import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'

function App(props) {
  const contextApp = React.useContext(ContextApp)

  const load = props.load
  const onDestory = props.onDestory

  const [destory, setDestory] = React.useState(false)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDisappear } = ReactExtensions.useAnimationDestination({ play: destory, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountAnimationInfinity } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: Infinity, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (animationCountDisappear === 1) onDestory()
  }, [animationCountDisappear])

  React.useEffect(() => {
    if (load === true) setDestory(true)
  }, [load])

  return <layout globalAlpha={animationCountAppear - animationCountDisappear}>

    <layout container verticalCenter horizontalAlignCenter>
      <ReactCanvas2dExtensions.TextCaculateLine text={`WIRELOST`} font={`bolder ${contextApp.unitpx * 0.12}px sans-serif`} lineHeight={1} gap={0} w={contextApp.locationLayout.w - contextApp.unitpx * 0.08} split=' ' wrap>
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
      <ReactCanvas2dExtensions.TextCaculateLine text={'加载中'} font={`bolder ${contextApp.unitpx * 0.04}px sans-serif`} lineHeight={1} gap={0} w={contextApp.locationLayout.w - contextApp.unitpx * 0.08} split=' ' wrap>
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

    <layout cx='50%' y={contextApp.locationLayout.h - contextApp.unitpx * 0.3} w={contextApp.unitpx * 0.5} h={contextApp.unitpx * 0.2}>
      <circle
        fill
        cx={`${Math.sin(animationCountAnimationInfinity + Math.PI * 1.5) * 50 + 50}%`}
        cy={'50%'}
        sAngle={0}
        eAngle={Math.PI * 2}
        counterclockwise={false}
        radius={contextApp.unitpx * 0.08}
        fillStyle={'rgb(255, 255, 255)'}
      />
    </layout>

  </layout>
}

export default App