import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import { randomArray } from './utils'

function ModuleText(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const Component =
    <ReactCanvas2dExtensions.Text text='从以下卡牌中锁定起始卡牌！' font={`bolder ${contextApp.unitpx * 0.048}px sans-serif`} w={Infinity}>
      {
        (line, location) => {
          return <layout w={location.w} h={location.h} item>
            <text fillText fillStyle={`rgb(255, 255, 255)`} text={line[0].text} font={line[0].font} />
          </layout>
        }
      }
    </ReactCanvas2dExtensions.Text>

  return Component
}

function ModuleButton(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const onEnd = props.onEnd
  const globalAlpha = props.globalAlpha

  const [touch, setTouch] = React.useState(false)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: touch ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const onPointerDown = () => {
    setTouch(true)
  }

  const onPointerUp = () => {
    setTouch(false)
    onEnd()
  }

  const onPointerUpAway = () => {
    setTouch(false)
  }

  const Component =
    <layout w={contextApp.unitpx * 0.32} h={contextApp.unitpx * 0.12} item globalAlpha={globalAlpha * (1 - animationCountAppear * 0.5)}>
      <rectradiusarc stroke strokeStyle='rgb(255, 255, 255)' lineWidth={contextApp.unitpx * 0.0064} radius={contextApp.unitpx * 0.02} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerUpAway={onPointerUpAway} />
      <ReactCanvas2dExtensions.Text text='开始战斗' font={`bolder ${contextApp.unitpx * 0.042}px sans-serif`} w={Infinity}>
        {
          (line, location) => {
            return <text cx='50%' cy='50%' w={line[0].w} h={line[0].h} fillText fillStyle={`rgb(255, 255, 255)`} text={line[0].text} font={line[0].font} />
          }
        }
      </ReactCanvas2dExtensions.Text>
    </layout>

  return Component
}

function ComponentCard(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = props.card
  const save = props.save
  const onsave = props.onsave
  const globalAlpha = props.globalAlpha

  const timeout = React.useRef()

  const { animationCount: animationCountAppear, setAnimationCount: setAnimationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountsave } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: save ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const removeTimeout = () => {
    if (timeout.current !== undefined) clearTimeout(timeout.current)
    if (timeout.current !== undefined) timeout.current = undefined
  }

  const onPointerDown = e => {
    timeout.current = setTimeout(() => {
      contextPlayground.setGameCardDescription(card)
      removeTimeout()
    }, 1000)
  }

  const onPointerUp = e => {
    if (timeout.current === undefined) contextPlayground.setGameCardDescription(undefined)
    if (timeout.current !== undefined) onsave()
    removeTimeout()
  }

  const onPointerUpAway = e => {
    if (timeout.current === undefined) contextPlayground.setGameCardDescription(undefined)
    removeTimeout()
  }

  ReactExtensions.useEffectUpdate(() => {
    setAnimationCountAppear(0)
  }, [card])

  const Component =
    <layout w={contextApp.unitpx * 0.32} h={contextApp.unitpx * 0.48} globalAlpha={globalAlpha * animationCountAppear} item>
      {
        card.cardIndex.startsWith('Role') ?
          <ReactCanvas2dExtensions.CanvasOffscreen dependence={[card, animationCountsave]}>
            {
              animationCountsave ?
                <>
                  <rectradiusrect fill radius={contextApp.unitpx * 0.024} shadowBlur={animationCountsave * contextApp.unitpx * 0.08} fillStyle='rgb(0, 0, 0)' shadowColor='rgb(255, 255, 255)' />
                </>
                : null
            }
            <rectradiusrect stroke radius={contextApp.unitpx * 0.024} strokeStyle='rgb(255, 255, 255)' lineWidth={contextApp.unitpx * 0.0064} />
            <rectradiusrect clip radius={contextApp.unitpx * 0.024} globalAlpha={0.4}>
              <image cx='50%' cy='50%' w='108%' h='108%' src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
            </rectradiusrect>
            <rectradiusrect cx='50%' cy='50%' w={`calc(100% - ${contextApp.unitpx * 0.024}px)`} h={`calc(100% - ${contextApp.unitpx * 0.024}px)`} clip radius={contextApp.unitpx * 0.024}>
              <image cx='50%' cy='50%' w='108%' h='108%' src={contextApp[card.descriptionImageIndex]} clipHorizontalCenter clipVerticalCenter />
            </rectradiusrect>
          </ReactCanvas2dExtensions.CanvasOffscreen>
          : null
      }
      <rectradiusarc radius={contextApp.unitpx * 0.024} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerUpAway={onPointerUpAway} />
    </layout>

  if (contextPlayground.gameCardReadyControl !== card) return Component
}

function ModuleCards(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const card = props.card
  const save = props.save
  const setSave = props.setSave
  const globalAlpha = props.globalAlpha

  const onsave = (card) => {
    if (save.includes(card) === true) setSave(save.filter(i => i !== card))
    if (save.includes(card) !== true) setSave(save.concat(card))
  }

  const Component =
    <layout h={contextApp.unitpx * 0.48} item container horizontalCenter verticalAlignCenter gap={contextApp.unitpx * 0.08}>
      {
        card.map((i, index) => <ComponentCard key={i.key} card={i} save={save.includes(i)} onsave={() => onsave(i)} globalAlpha={globalAlpha} index={index} />)
      }
    </layout>

  return Component
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const cardRef = React.useRef(randomArray(contextPlayground.gameSelfCardLibrary, 4))

  const [card, setCard] = React.useState(cardRef.current)
  const [save, setSave] = React.useState(cardRef.current)
  const [animationCountDisappearPlay, setAnimationCountDisappear] = React.useState(false)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDisappear } = ReactExtensions.useAnimationDestination({ play: animationCountDisappearPlay, defaultCount: 0, destination: 1, rate: 1 / 24, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (animationCountDisappear === 1) contextPlayground.setGameProcess(i => i + 1)
  }, [animationCountDisappear])

  const onEnd = () => {
    const back = randomArray(contextPlayground.gameSelfCardLibrary.filter(i => card.includes(i) === false), 4)
    const next = card.map(i => save.includes(i) ? i : back.pop())
    setCard(next)
    setSave(next)
  }

  const Component =
    <layout zIndex={contextPlayground.zIndex.ProcessPick} globalAlpha={animationCountAppear - animationCountDisappear}>
      <rect fill fillStyle='rgb(0, 0, 0)' globalAlpha={(animationCountAppear - animationCountDisappear) * 0.8} onPointerDown={e => e.stopPropagation()} />
      <layout container verticalCenter horizontalAlignCenter gap={contextApp.unitpx * 0.12}>
        <ModuleText />
        <ModuleCards card={card} save={save} setSave={setSave} globalAlpha={animationCountAppear - animationCountDisappear} />
        <ModuleButton onEnd={onEnd} globalAlpha={animationCountAppear - animationCountDisappear} />
      </layout>
    </layout>

  return Component

}

export default App