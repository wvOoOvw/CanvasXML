import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'

function Content(props) {
  const contextApp = React.useContext(ContextApp)

  const onDestory = props.onDestory

  const [destory, setDestory] = React.useState(false)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDisappear } = ReactExtensions.useAnimationDestination({ play: destory === true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountWaveInfinity } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: Infinity, rate: 1 / 120, postprocess: n => Number((Math.abs(0.5 - (n + 0.5) % 1) * 2).toFixed(4)) })
  const { animationCount: animationCountTextInfinity } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: Infinity, rate: 1 / 60, postprocess: n => Number((Math.abs(0.5 - (n + 0.5) % 1) * 2).toFixed(4)) })

  React.useEffect(() => {
    if (animationCountDisappear === 1) onDestory()
  }, [animationCountDisappear])

  const Component =
    <layout globalAlpha={animationCountAppear - animationCountDisappear}>

      <layout container verticalCenter horizontalAlignCenter gap={contextApp.unitpx * 0.08}>
        <ReactCanvas2dExtensions.Text text={`·音·`} font={`bolder ${contextApp.unitpx * 0.08}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return <layout w={line[0].w} h={line[0].h} item>
                <text fillText fillStyle='white' text={line[0].text} font={line[0].font} shadowBlur={animationCountWaveInfinity * contextApp.unitpx * 0.016} shadowColor='rgb(255, 255, 255)' />
              </layout>
            }
          }
        </ReactCanvas2dExtensions.Text>

        <ReactCanvas2dExtensions.Text text={`—— 净化世界`} font={`bolder ${contextApp.unitpx * 0.04}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return <layout w={line[0].w} h={line[0].h} item>
                <text x={contextApp.unitpx * 0.24} fillText fillStyle='white' text={line[0].text} font={line[0].font} shadowBlur={animationCountWaveInfinity * contextApp.unitpx * 0.008} shadowColor='rgb(255, 255, 255)' />
              </layout>
            }
          }
        </ReactCanvas2dExtensions.Text>

        <ReactCanvas2dExtensions.Text text={'点击任意处开始'} font={`bolder ${contextApp.unitpx * 0.04}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return <layout w={line[0].w} h={line[0].h} item>
                <text fillText fillStyle={`rgb(125, 125, 125)`} text={line[0].text} font={line[0].font} globalAlpha={(animationCountAppear - animationCountDisappear) * animationCountTextInfinity} />
              </layout>
            }
          }
        </ReactCanvas2dExtensions.Text>
      </layout>

      <ReactCanvas2dExtensions.Text text={`Version ${contextApp.version}`} font={`bolder ${contextApp.unitpx * 0.025}px sans-serif`} w={Infinity}>
        {
          (line, location) => {
            return <text b={contextApp.unitpx * 0.04} l={contextApp.unitpx * 0.04} fillText fillStyle='white' w={line[0].w} h={line[0].h} text={line[0].text} font={line[0].font} />
          }
        }
      </ReactCanvas2dExtensions.Text>

      <rect onPointerDown={animationCountAppear === 1 ? () => setDestory(true) : undefined} />
    </layout>

  return Component
}

function Loading(props) {
  const contextApp = React.useContext(ContextApp)

  const onDestory = props.onDestory

  const [destory, setDestory] = React.useState(false)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDisappear } = ReactExtensions.useAnimationDestination({ play: destory, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountInfinityGlobalAlpha } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: Infinity, rate: 1 / 15, postprocess: n => 0.5 - Math.cos(Number(n.toFixed(4))) / 2 })
  const { animationCount: animationCountInfinity } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: Infinity, rate: 1 / 30, postprocess: n => 0.5 - Math.cos(Number(n.toFixed(4))) / 2 })

  React.useEffect(() => {
    if (animationCountDisappear === 1) onDestory()
  }, [animationCountDisappear])

  React.useEffect(() => {
    if (contextApp.load === true) setDestory(true)
  }, [contextApp.load])

  const Component =
    <layout globalAlpha={animationCountAppear - animationCountDisappear}>
      <layout container verticalCenter horizontalAlignCenter gap={contextApp.unitpx * 0.08}>
        <layout w={contextApp.unitpx * 0.5} h={contextApp.unitpx * 0.16} item>
          <arctocenter fill cx={`${animationCountInfinity * 100}%`} cy={'50%'} sAngle={0} radius={contextApp.unitpx * 0.08} fillStyle={'rgb(255, 255, 255)'} />
        </layout>
        <ReactCanvas2dExtensions.Text text={'加载中'} font={`bolder ${contextApp.unitpx * 0.04}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return <layout w={line[0].w} h={line[0].h} item>
                <text fillText fillStyle={`rgb(125, 125, 125)`} text={line[0].text} font={line[0].font} globalAlpha={animationCountInfinityGlobalAlpha} />
              </layout>
            }
          }
        </ReactCanvas2dExtensions.Text>
      </layout>
    </layout>

  return Component
}

function App() {
  const contextApp = React.useContext(ContextApp)

  const [view, setView] = React.useState('Loading')

  React.useEffect(() => { if (view === undefined) contextApp.setScene(['Playground']) }, [view])

  if (view === 'Loading') return <Loading onDestory={() => setView('Content')} />
  if (view === 'Content') return <Content onDestory={() => setView()} />
}

export default App