import React from '../React'
import Canvas2d from '../Canvas2d'
import * as ReactExtensions from '../ReactExtensions'

import Text from './Component.Text'

function App(props) {
  const w = Canvas2d.rect().width * Canvas2d.dpr()
  const h = Canvas2d.rect().height * Canvas2d.dpr()

  const min = Math.min(w, h)

  const { animationCount: animationCountIntersection } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })
  const { animationCount: animationCountDestoryWait } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 60, postprocess: n => Number(n.toFixed(3)) })
  const { animationCount: animationCountDestory } = ReactExtensions.useAnimationDestination({ play: animationCountDestoryWait === 1, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(3)) })

  if (animationCountDestory === 1) {
    return props.children
  }

  if (animationCountDestory !== 1) {
    return <layout container verticalCenter horizontalAlignCenter globalAlpha={animationCountIntersection - animationCountDestory}>
        <Text text={`CanvasXML`} font={`bolder ${min * 0.06}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return line.map(i => {
                return <layout w={i.w} h={i.h} item>
                  <text fillText fillStyle='rgb(255, 255, 255)' w={i.w} h={i.h} text={i.text} font={i.font} />
                </layout>
              })
            }
          }
        </Text>

        <layout h={min * 0.02} item></layout>

        <Text text={'Powered by CanvasXML JS'} font={`bolder ${min * 0.025}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return line.map(i => {
                return <layout w={i.w} h={i.h} item>
                  <text fillText fillStyle={`rgb(130, 130, 130)`} w={i.w} h={i.h} text={i.text} font={i.font} />
                </layout>
              })
            }
          }
        </Text>
      </layout>
  }
}

export default App