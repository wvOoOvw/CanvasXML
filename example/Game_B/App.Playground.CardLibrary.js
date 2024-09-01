import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [pointerDown, setPointerDown] = React.useState(false)

  const { animationCount: animationCountPointerDown } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: pointerDown ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })

  const x = contextApp.locationLayout.x + contextApp.locationLayout.w - contextApp.unitpx * 0.32 - contextApp.unitpx * 0.08
  const y = contextApp.locationLayout.y + contextApp.locationLayout.h - contextApp.unitpx * 0.48 - contextApp.unitpx * 0.08
  const w = contextApp.unitpx * 0.32
  const h = contextApp.unitpx * 0.48

  const onPointerDown = e => {
    setPointerDown(true)

    if (contextPlayground.gameCard.length === 12) {
      contextApp.addMessage('手牌到达上限')
    }

    if (contextPlayground.gameCard.length < 12) {
      contextPlayground.setGameCard(i => [...i, contextPlayground.gameCardLibrary[0]])
      contextPlayground.setGameCardLibrary(i => i.filter(n => n !== contextPlayground.gameCardLibrary[0]))
    }

    e.stopPropagation()
  }

  const onPointerUpAway = e => {
    setPointerDown(false)
  }

  const onPointerUp = e => {
    setPointerDown(false)
  }

  return <layout x={x} y={y} w={w} h={h} zIndex={contextPlayground.zIndex.CardLibrary}>
    <rectradius fill fillStyle='white' radius={contextApp.unitpx * 0.02} shadowBlur={contextApp.unitpx * 0.02} shadowColor='white' onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerUpAway={onPointerUpAway} />
    <rectradius cx='50%' cy='50%' w={w - contextApp.unitpx * 0.02} h={h - contextApp.unitpx * 0.02} fill fillStyle='rgb(75, 75, 75)' radius={contextApp.unitpx * 0.02}>
      <image cx='50%' cy='50%' w={w - contextApp.unitpx * 0.08} h={h - contextApp.unitpx * 0.08} src={contextApp.imagePngVileFluidWhite} globalAlpha={1 - animationCountPointerDown * 0.2} />
    </rectradius>
    {
      contextPlayground.gameCardLibrary.length ?
        <layout cx={`calc(100% - ${contextApp.unitpx * 0.06}px)`} cy={`calc(100% - ${contextApp.unitpx * 0.06}px)`} w={contextApp.unitpx * 0.08} h={contextApp.unitpx * 0.08}>
          <rectradius fill fillStyle='white' radius={contextApp.unitpx * 0.02} />
          <ReactCanvas2dExtensions.Text text={String(contextPlayground.gameCardLibrary.length)} font={`bolder ${contextApp.unitpx * 0.035}px sans-serif`} w={Infinity}>
            {
              (line, location) => {
                return line.map(i => {
                  return <text cx='50%' cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(75, 75, 75)' text={i.text} font={i.font} />
                })
              }
            }
          </ReactCanvas2dExtensions.Text>
        </layout>
        : null
    }
  </layout>
}

export default App