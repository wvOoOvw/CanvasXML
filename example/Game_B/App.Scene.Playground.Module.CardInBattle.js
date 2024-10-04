import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function ComponentEmpty(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = props.card
  const side = props.side

  const [animationCountInfinityPlay, setAnimationCountInfinityPlay] = React.useState(false)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: card === undefined ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountInfinity } = ReactExtensions.useAnimationDestination({ play: animationCountInfinityPlay, defaultCount: 0, destination: Infinity, rate: 1 / 60, postprocess: n => Number((Math.abs(0.5 - (n + 0.5) % 1) * 2).toFixed(4)) })

  const onLocationMounted = dom => {
    if (side === 0) {
      dom.props.x = contextApp.locationLayout.w / 2 - dom.props.w / 2 - contextApp.unitpx * 0.48
      dom.props.y = contextApp.locationLayout.h / 2 - dom.props.h / 2
    }
    if (side === 1) {
      dom.props.x = contextApp.locationLayout.w / 2 - dom.props.w / 2 + contextApp.unitpx * 0.48
      dom.props.y = contextApp.locationLayout.h / 2 - dom.props.h / 2
    }

    dom.recoordinate()
  }

  React.useEffect(() => {
    if (side === 0) {
      if (card === undefined && contextPlayground.gameCardReadyControlUseable === true) {
        setAnimationCountInfinityPlay(true)
      }
      if (card !== undefined || contextPlayground.gameCardReadyControlUseable !== true) {
        if (animationCountInfinity <= (0.5 - Math.cos(Number((1 / 12).toFixed(4))) / 2)) setAnimationCountInfinityPlay(false)
      }
    }
  }, [card, side, animationCountInfinity, contextPlayground.gameCardReadyControlUseable])

  const Component =
    <layout globalAlpha={animationCountAppear * (1 - animationCountInfinity)}>
      <ReactCanvas2dExtensions.CanvasOffscreen dependence={[]}>
        <layout w={contextApp.unitpx * 0.32} h={contextApp.unitpx * 0.48} onLocationMounted={onLocationMounted}>
          <rectradiusrect stroke radius={contextApp.unitpx * 0.024} strokeStyle='rgb(255, 255, 255)' lineWidth={contextApp.unitpx * 0.008} />
          <image cx='50%' cy='35%' w={contextApp.unitpx * 0.12} h={contextApp.unitpx * 0.12} src={contextApp.imagePngSwordmanWhite} />
          <ReactCanvas2dExtensions.Text text='待部署区' font={`bolder ${contextApp.unitpx * 0.032}px sans-serif`} w={Infinity}>
            {
              (line, location) => {
                return <text cx='50%' cy='60%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
              }
            }
          </ReactCanvas2dExtensions.Text>
          <ReactCanvas2dExtensions.Text text='战斗' font={`bolder ${contextApp.unitpx * 0.024}px sans-serif`} w={Infinity}>
            {
              (line, location) => {
                return <text cx='50%' cy='70%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
              }
            }
          </ReactCanvas2dExtensions.Text>
        </layout>
      </ReactCanvas2dExtensions.CanvasOffscreen>
    </layout>

  if (animationCountAppear > 0) return Component
}

function ModuleInSelf() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const ComponentCharacter = contextPlayground.gameSelfCardBattle ? contextPlayground.gameSelfCardBattle.ComponentCharacter : undefined

  const Component =
    <layout zIndex={contextPlayground.zIndex.CardInBattle}>
      {
        contextPlayground.gameSelfCardBattle !== undefined ? <ComponentCharacter side={0} card={contextPlayground.gameSelfCardBattle} contextApp={contextApp} contextPlayground={contextPlayground} /> : null
      }
      <ComponentEmpty side={0} card={contextPlayground.gameSelfCardBattle} />
    </layout>

  return Component
}

function ModuleInOpponent() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <layout zIndex={contextPlayground.zIndex.CardInBattle}>
      <ComponentEmpty side={1} card={contextPlayground.gameOpponentCardBattle} />
    </layout>

  return Component
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <>
      <ModuleInSelf />
      <ModuleInOpponent />
    </>

  return Component
}

export default App