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

  const globalAlpha = props.globalAlpha

  const { animationCount: animationCountOver } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gameSelfPickOver, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountWait } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gameSelfPickOver && contextPlayground.gameOpponentPickOver !== true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const Component =
    <layout h={contextApp.unitpx * 0.12} item>
      {
        globalAlpha * (1 - animationCountOver) * (1 - animationCountWait) > 0 ?
          <ReactCanvas2dExtensions.Text text='从以下卡牌中选择起始卡牌！' font={`bolder ${contextApp.unitpx * 0.048}px sans-serif`} w={Infinity}>
            {
              (line, location) => {
                return <text cx='50%' cy='20%' w={line[0].w} h={line[0].h} fillText fillStyle={`rgb(255, 255, 255)`} text={line[0].text} font={line[0].font} globalAlpha={globalAlpha * (1 - animationCountWait)} />
              }
            }
          </ReactCanvas2dExtensions.Text>
          : null
      }
      {
        globalAlpha * animationCountOver * animationCountWait > 0 ?
          <ReactCanvas2dExtensions.Text text='等待对手选择卡牌！' font={`bolder ${contextApp.unitpx * 0.048}px sans-serif`} w={Infinity}>
            {
              (line, location) => {
                return <text cx='50%' cy='20%' w={line[0].w} h={line[0].h} fillText fillStyle={`rgb(255, 255, 255)`} text={line[0].text} font={line[0].font} globalAlpha={globalAlpha * animationCountOver * animationCountWait} />
              }
            }
          </ReactCanvas2dExtensions.Text>
          : null
      }

      <ReactCanvas2dExtensions.Text text='长按查看卡牌详情' font={`bolder ${contextApp.unitpx * 0.024}px sans-serif`} w={Infinity}>
        {
          (line, location) => {
            return <text cx='50%' cy='80%' w={line[0].w} h={line[0].h} fillText fillStyle={`rgb(255, 255, 255)`} text={line[0].text} font={line[0].font} />
          }
        }
      </ReactCanvas2dExtensions.Text>
    </layout>

  return Component
}

function ModuleButton(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const globalAlpha = props.globalAlpha
  const onEnd = props.onEnd

  const [touch, setTouch] = React.useState(false)

  const { animationCount: animationCountTouch } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: touch ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountOver } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gameSelfPickOver, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

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
    <layout w={contextApp.unitpx * 0.32} h={contextApp.unitpx * 0.12} item globalAlpha={globalAlpha * (1 - animationCountTouch * 0.5) * (1 - animationCountOver)}>
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
  const destory = props.destory
  const index = props.index
  const globalAlpha = props.globalAlpha
  const onSave = props.onSave

  const timeout = React.useRef()

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 24, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountSave } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: save ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDestory } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: destory ? 1 : 0, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const { animationCount: animationCountCx } = ReactExtensions.useAnimationDestinationRateTime({ play: true, defaultCount: contextApp.locationLayout.w / 2 + (index - 1.5) * contextApp.unitpx * 0.42, destination: contextApp.locationLayout.w / 2 + (index - 1.5) * contextApp.unitpx * 0.42, rateTime: 12, postprocess: n => Number(n.toFixed(4)) })

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
    if (timeout.current !== undefined) onSave()
    removeTimeout()
  }

  const onPointerUpAway = e => {
    if (timeout.current === undefined) contextPlayground.setGameCardDescription(undefined)
    removeTimeout()
  }

  const Component =
    <layout cx={animationCountCx} y={animationCountDestory * contextApp.unitpx * 0.16} w={contextApp.unitpx * 0.32} h={contextApp.unitpx * 0.48} globalAlpha={globalAlpha * animationCountAppear * (1 - animationCountDestory)} item>
      {
        card.cardIndex.startsWith('Role') ?
          <ReactCanvas2dExtensions.CanvasOffscreen dependence={[card, animationCountSave, animationCountDestory, animationCountCx]}>
            {
              animationCountSave ?
                <>
                  <rectradiusrect fill radius={contextApp.unitpx * 0.024} shadowBlur={animationCountSave * contextApp.unitpx * 0.08} fillStyle='rgb(0, 0, 0)' shadowColor='rgb(255, 255, 255)' />
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
  const destory = props.destory
  const setSave = props.setSave
  const globalAlpha = props.globalAlpha

  const onSave = (card) => {
    if (contextPlayground.gameSelfPickOver === false) {
      if (save.includes(card) === true) setSave(save.filter(i => i !== card))
      if (save.includes(card) !== true) setSave(save.concat(card))
    }
  }

  const Component =
    <layout h={contextApp.unitpx * 0.48} item>
      {
        card.map((i, index) => <ComponentCard key={i.key} card={i} index={index} destory={destory.includes(i)} globalAlpha={globalAlpha} save={save.includes(i)} onSave={() => onSave(i)} />)
      }
    </layout>

  return Component
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const cardRef = React.useRef(randomArray(contextPlayground.gameSelfCardLibrary, 4))

  const overRef = React.useRef(false)

  const [card, setCard] = React.useState(cardRef.current)
  const [save, setSave] = React.useState(cardRef.current)
  const [destory, setDestory] = React.useState([])

  const { animationCount: animationCountPickWait } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gameSelfPickOver, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountPickOver } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gameSelfPickOver && contextPlayground.gameOpponentPickOver && animationCountPickWait === 1, defaultCount: 0, destination: 60, rate: 1, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDisappear } = ReactExtensions.useAnimationDestination({ play: animationCountPickOver === 60, defaultCount: 0, destination: 1, rate: 1 / 24, postprocess: n => Number(n.toFixed(4)) })

  const onEnd = () => {
    if (overRef.current !== true) {
      const back = randomArray(contextPlayground.gameSelfCardLibrary.filter(i => card.includes(i) === false), 4)
      const next = card.map(i => save.includes(i) ? i : back.pop())
      setCard(next)
      setSave(next)
      contextPlayground.setGemeSelfPickOver(true)
    }
  }

  React.useEffect(() => {
    if (animationCountDisappear === 1) contextPlayground.setGameProcess(i => i + 1)
    if (animationCountDisappear === 1) contextPlayground.setGameRound(i => i + 1)
  }, [animationCountDisappear])

  React.useEffect(() => {
    var index

    if (animationCountPickOver === 60 / 4 * 1) index = 0
    if (animationCountPickOver === 60 / 4 * 2) index = 1
    if (animationCountPickOver === 60 / 4 * 3) index = 2
    if (animationCountPickOver === 60 / 4 * 4) index = 3

    if (index !== undefined) setDestory(i => i.concat(card[index]))
    if (index !== undefined) contextPlayground.setGameExecute(i => i.concat({ executeIndex: 'draw', card: card[index], side: 0 }))
  }, [animationCountPickOver])

  const Component =
    <layout zIndex={contextPlayground.zIndex.ProcessPick} globalAlpha={animationCountAppear - animationCountDisappear}>
      <rect fill fillStyle='rgb(0, 0, 0)' globalAlpha={(animationCountAppear - animationCountDisappear) * 0.8} onPointerDown={e => e.stopPropagation()} />
      <layout container verticalCenter horizontalAlignCenter gap={contextApp.unitpx * 0.12}>
        <ModuleText globalAlpha={animationCountAppear - animationCountDisappear} />
        <ModuleCards card={card} save={save} destory={destory} setSave={setSave} globalAlpha={animationCountAppear - animationCountDisappear} />
        <ModuleButton globalAlpha={animationCountAppear - animationCountDisappear} onEnd={onEnd} />
      </layout>
    </layout>

  return Component

}

export default App