import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import { distance, move } from './utils'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      imageIndex: 'imagePngかに',

      attributeHitPointOrigin: 120,
      attributeHitPoint: 120,
      attributeAttackPhysicsOrigin: 10,
      attributeAttackPhysics: 10,
      attributeDefensePhysicsOrigin: 2,
      attributeDefensePhysics: 2,
      attributeAttackMagicOrigin: 2,
      attributeAttackMagic: 2,
      attributeDefenseMagicOrigin: 2,
      attributeDefenseMagic: 2,

      privateOver: false,
      privateDomCollisions: [],
    }, optionOverlay
  )

  const onDomCollisions = () => option.privateDomCollisions

  return { type: 'EnemyBaseA', option: option, onDomCollisions }
}


function App(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const option = props.option
  const onDestory = props.onDestory

  const moveSpeed = contextApp.unitpx * 0.008

  const HitPointPercent = option.attributeHitPoint / option.attributeHitPointOrigin

  const entry = React.useMemo(() => {
    const i = contextPlayground.gameMap[0].onDomCollisions().filter(i => i.type === 'entry')[0].props
    return { x: i.cx, y: i.cy }
  }, [])

  const exit = React.useMemo(() => {
    const i = contextPlayground.gameMap[0].onDomCollisions().filter(i => i.type === 'exit')[0].props
    return { x: i.cx, y: i.cy }
  }, [])

  const [x, setX] = React.useState(entry.x)
  const [y, setY] = React.useState(entry.y)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay, defaultCount: 0, destination: 1, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDisappear } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay && (option.attributeHitPoint === 0 || option.privateOver === true), defaultCount: 0, destination: 1, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const { animationCount: animationCountHitCount, setAnimationCount: setAnimationCountHitCount } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay, defaultCount: 0, destination: 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountHitPointPercent } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: HitPointPercent, destination: HitPointPercent, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const onHit = (attributeAttackPhysics, attributeAttackMagic) => {
    option.attributeHitPoint = option.attributeHitPoint - Math.max(attributeAttackPhysics - option.attributeDefensePhysics, attributeAttackPhysics * 0.15)
    option.attributeHitPoint = option.attributeHitPoint - Math.max(attributeAttackMagic - option.attributeDefenseMagic, attributeAttackMagic * 0.15)
    option.attributeHitPoint = Math.max(option.attributeHitPoint, 0)
    setAnimationCountHitCount(i => i + 1)
  }

  const globalAlpha = React.useMemo(() => {
    return (animationCountAppear - animationCountDisappear) * (1 - 1 / (1 + Math.exp(1e-9 - Math.log((animationCountHitCount) / 4) * Math.LN2)))
  }, [animationCountAppear, animationCountDisappear, animationCountHitCount])

  React.useEffect(() => {
    if (animationCountDisappear === 1) {
      onDestory()
    }
  }, [animationCountDisappear])

  React.useEffect(() => {
    if (contextPlayground.gamePlay && option.attributeHitPoint > 0) {
      var count = moveSpeed * contextPlayground.gameTimeRate
      var cache = { x, y }

      while (count > 0 && (cache.x !== exit.x || cache.y !== exit.y)) {
        const moved = move(cache, exit, count)

        if (cache.x > exit.x) moved.x = Math.max(moved.x, exit.x)
        if (cache.x < exit.x) moved.x = Math.min(moved.x, exit.x)
        if (cache.y > exit.y) moved.y = Math.max(moved.y, exit.y)
        if (cache.y < exit.y) moved.y = Math.min(moved.y, exit.y)

        count = count - distance(moved, cache)

        cache.x = moved.x
        cache.y = moved.y

        if (count && Math.abs(count) < 0.001) count = 0
      }

      setX(cache.x)
      setY(cache.y)
    }
  }, [contextPlayground.animationCountGameTime])

  React.useEffect(() => {
    if (x === exit.x && y === exit.y) {
      option.privateOver = true
    }
  }, [x, y])

  return <layout cx={x} cy={y} w={contextApp.unitpx * 0.32} h={contextApp.unitpx * 0.32} globalAlpha={globalAlpha} zIndex={contextPlayground.zIndex.EnemyMeth} onLocationMounted={() => option.privateDomCollisions = []} >
    <circle clip cx='50%' cy='50%' sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} radius={contextApp.unitpx * 0.16}>
      <image cx='50%' cy='50%' src={contextApp[option.imageIndex]} />
    </circle>
    <rect b={contextApp.unitpx * 0.04 * -1} h={contextApp.unitpx * 0.02}>
      <rect fill fillStyle='rgb(75, 75, 75)' />
      <rect fill fillStyle='rgb(175, 75, 75)' w={`${animationCountHitPointPercent * 100}%`} />
    </rect>
    <circle cx='50%' cy='50%' sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} radius={contextApp.unitpx * 0.16} onLocationMounted={dom => option.privateDomCollisions.push({ ...dom, callback: onHit })} />
  </layout>
}

export { init, App }