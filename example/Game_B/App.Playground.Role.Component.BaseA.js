import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import { domCollisions } from './utils'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      imageIndex: 'imageJpgRoleA',

      descriptionName: 'Lai Yee',

      attributeHitPointOrigin: 30,
      attributeHitPoint: 30,
      attributeAttackPhysicsOrigin: 10,
      attributeAttackPhysics: 10,
      attributeDefensePhysicsOrigin: 10,
      attributeDefensePhysics: 10,
      attributeAttackMagicOrigin: 10,
      attributeAttackMagic: 10,
      attributeDefenseMagicOrigin: 10,
      attributeDefenseMagic: 10,

      actionCount: 20,
      actionCountMax: 100,
      actionCountRecover: 1 / 60,
      actionInterval: 0,
      actionIntervalMax: 100,
      actionIntervalRecover: 100 / 60,

      action: [
        {
          count: 1,
          interval: 100,
          imageIndex: 'imagePngCaesarWhite',
        },
        {
          count: 15,
          interval: 100,
          imageIndex: 'imagePngFangsWhite',
        },
        {
          count: 25,
          interval: 100,
          imageIndex: 'imagePngPlagueDoctorProfileWhite',
        },
      ],

      privateCollisions: [],
    }, optionOverlay
  )

  const onDomCollisions = () => option.privateDomCollisions

  return { type: 'RoleBaseA', option: option, onDomCollisions }
}


function Action0(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const self = props.self
  const option = props.option
  const actionActiveIndex = props.actionActiveIndex

  const roleActive = contextPlayground.gameRoleActive === self
  const actionActive = actionActiveIndex === 0

  const onPointerDown = (e) => {
    if (roleActive && actionActive && contextPlayground.gamePlay) {
      if (option.action[actionActiveIndex].count > option.actionCount) {
        return contextApp.addMessage('魔力不足')
      }

      if (option.action[actionActiveIndex].interval > option.actionInterval) {
        return contextApp.addMessage('魔法冷却中')
      }

      option.actionCount = option.actionCount - option.action[actionActiveIndex].count
      option.actionInterval = option.actionInterval - option.action[actionActiveIndex].interval

      const animation = {
        component: Action0EffectAnimation,
        props: {
          key: Math.random(),
          option: option,
          x: e.x,
          y: e.y,
          onDestory: () => contextPlayground.setGameAnimation(n => n.filter(v => v !== animation))
        }
      }
      contextPlayground.setGameAnimation(i => [...i, animation])

      new Audio(contextApp.audioMp3ImpactMetalLight003.src).play()
    }
  }

  if (roleActive && actionActive) {
    return <rect onPointerDown={onPointerDown} />
  }
}

function Action0EffectAnimation(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const option = props.option
  const x = props.x
  const y = props.y
  const onDestory = props.onDestory

  const collisionsRef = React.useRef([])

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const size = contextApp.unitpx * 1.08 + contextApp.unitpx * 0.36 * 1 / (1 + Math.exp(1e-9 - Math.log(animationCountAppear * 8) * Math.LN2))
  const lineWidth = contextApp.unitpx * 0.008

  const globalAlpha = React.useMemo(() => {
    var globalAlpha

    if (animationCountAppear < 0.25) globalAlpha = animationCountAppear / 0.25
    if (animationCountAppear >= 0.25 && animationCountAppear <= 0.5) globalAlpha = 1
    if (animationCountAppear > 0.5) globalAlpha = (1 - animationCountAppear) / 0.5

    return globalAlpha
  }, [animationCountAppear])

  const onCollistions = () => {
    contextPlayground.gameEnemy.forEach(i => {
      i.onDomCollisions().forEach(n => {
        if (collisionsRef.current.some(v => domCollisions(n, v))) {
          const animation = {
            component: Action0HitAnimation,
            props: {
              key: Math.random(),
              option: option,
              x: n.props.cx,
              y: n.props.cy,
              onDestory: () => contextPlayground.setGameAnimation(n => n.filter(v => v !== animation))
            }
          }
          contextPlayground.setGameAnimation(i => [...i, animation])

          n.callback(option.attributeAttackPhysics, option.attributeDefenseMagic)
        }
      })
    })
  }

  React.useEffect(() => {
    onCollistions()
  }, [])

  React.useEffect(() => {
    if (animationCountAppear === 1) {
      onDestory()
    }
  }, [animationCountAppear])

  return <layout cx={x} cy={y} w={size} h={size} globalAlpha={globalAlpha} zIndex={contextPlayground.zIndex.RoleAnimation} onLocationMounted={() => collisionsRef.current = []}>
    <arc stroke strokeStyle='rgb(255, 255, 255)' cx='50%' cy='50%' radius={size / 2} sAngle={0} lineWidth={lineWidth} onLocationMounted={(dom) => collisionsRef.current.push(dom)} />
    <rect stroke strokeStyle='rgb(255, 255, 255)' cx='50%' cy='50%' w='35%' h='35%' lineWidth={lineWidth} />
    <rect stroke strokeStyle='rgb(255, 255, 255)' cx='50%' cy='50%' w='35%' h='35%' lineWidth={lineWidth} />
  </layout>
}

function Action0HitAnimation(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const x = props.x
  const y = props.y
  const onDestory = props.onDestory

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay, defaultCount: 0, destination: 1, rate: 1 / 60 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const size = contextApp.unitpx * 0.32
  const radius0 = contextApp.unitpx * 0.02 - animationCountAppear * contextApp.unitpx * 0.005
  const radius1 = contextApp.unitpx * 0.1 + animationCountAppear * contextApp.unitpx * 0.02
  const w = `calc(100% + ${contextApp.unitpx * 0.02 * animationCountAppear}px)`
  const h = `calc(100% + ${contextApp.unitpx * 0.02 * animationCountAppear}px)`

  const lineWidth = contextApp.unitpx * 0.008

  const globalAlpha = React.useMemo(() => {
    var globalAlpha

    if (animationCountAppear < 0.25) globalAlpha = animationCountAppear / 0.25
    if (animationCountAppear >= 0.25 && animationCountAppear <= 0.5) globalAlpha = 1
    if (animationCountAppear > 0.5) globalAlpha = (1 - animationCountAppear) / 0.5

    return globalAlpha
  }, [animationCountAppear])

  React.useEffect(() => {
    if (animationCountAppear === 1) onDestory()
  }, [animationCountAppear])

  return <layout cx={x} cy={y} w={size} h={size} globalAlpha={globalAlpha} zIndex={contextPlayground.zIndex.RoleAnimation}>
    <circle fill cx='50%' cy='50%' fillStyle='white' radius={radius0} sAngle={0} />
    <rect stroke cx='50%' cy='50%' w={w} h={h} strokeStyle='white' lineWidth={lineWidth} />
    <arc stroke cx='50%' cy='50%' strokeStyle='white' radius={radius1} sAngle={Math.PI * 0 + animationCountAppear * Math.PI * 0.05} eAngle={Math.PI * 0.5 + animationCountAppear * Math.PI * 0.05} lineWidth={lineWidth} />
    <arc stroke cx='50%' cy='50%' strokeStyle='white' radius={radius1} sAngle={Math.PI * 1 + animationCountAppear * Math.PI * 0.05} eAngle={Math.PI * 1.5 + animationCountAppear * Math.PI * 0.05} lineWidth={lineWidth} />
  </layout>
}


function Action1(props) {

}


function Action2(props) {

}


function Setting0(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const self = props.self
  const option = props.option

  const roleActive = contextPlayground.gameRoleActive === self
  const wireIndex = contextPlayground.gameRole.findIndex(i => i === self)

  const { animationCount: animationCountActive } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: roleActive ? 1 : 0, destination: roleActive ? 1 : 0, rate: 1 / 15, postprocess: n => Number(n.toFixed(4)) })

  var w = contextApp.unitpx * 0.24
  var h = contextApp.unitpx * 0.24

  var x = contextApp.unitpx * 0.12 + w / 2 + wireIndex * w * 1.2
  var y = (contextApp.locationLayout.h - contextApp.unitpx * 0.12 - h / 2) - animationCountActive * contextApp.unitpx * 0.08

  const onPointerDown = (e) => {
    contextPlayground.setGameRoleActive(self)
    e.stopPropagation()
  }

  return <rect cx={x} cy={y} w={w} h={h} zIndex={contextPlayground.zIndex.RolePanel} onPointerDown={onPointerDown}>

    {
      animationCountActive > 0 ?
        <rectradius fill cx='50%' cy={h + animationCountActive * contextApp.unitpx * 0.08} h={contextApp.unitpx * 0.08} fillStyle='rgb(75, 75, 75)' radius={h * 0.1} globalAlpha={animationCountActive}>
          <image cx='50%' cy='50%' w={contextApp.unitpx * 0.08 * 0.75} h={contextApp.unitpx * 0.08 * 0.75} src={contextApp.imagePngDigitalTraceWhite} clipHorizontalCenter clipVerticalCenter />
        </rectradius>
        : null
    }

    <rectradius clip cx='50%' cy='50%' radius={contextApp.unitpx * 0.04}>
      <image src={contextApp[option.imageIndex]} clipHorizontalCenter clipVerticalCenter />
    </rectradius>

    <arc stroke cx='50%' cy='50%' strokeStyle='rgb(75, 75, 75)' radius={w * 0.35} lineWidth={w * 0.08} />
    <arc stroke cx='50%' cy='50%' strokeStyle='rgb(255, 255, 255)' radius={w * 0.35} eAngle={Math.PI * 2 * option.actionCount / option.actionCountMax} lineWidth={w * 0.08} />

    <arc stroke cx='50%' cy='50%' strokeStyle='rgb(75, 75, 75)' radius={w * 0.2} lineWidth={w * 0.08} />
    <arc stroke cx='50%' cy='50%' strokeStyle='rgb(125, 75, 75)' radius={w * 0.2} eAngle={Math.PI * 2 * option.attributeHitPoint / option.attributeHitPointOrigin} lineWidth={w * 0.08} />

  </rect>
}


function Setting1(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const self = props.self
  const option = props.option
  const actionActiveIndex = props.actionActiveIndex
  const setActionActiveIndex = props.setActionActiveIndex

  const roleActive = contextPlayground.gameRoleActive === self

  if (roleActive) {
    return <layout zIndex={contextPlayground.zIndex.RolePanel}>
      <Setting1Component option={option} actionActiveIndex={actionActiveIndex} index={0} action={option.action[0]} setActionActiveIndex={setActionActiveIndex} />
      <Setting1Component option={option} actionActiveIndex={actionActiveIndex} index={1} action={option.action[1]} setActionActiveIndex={setActionActiveIndex} />
      <Setting1Component option={option} actionActiveIndex={actionActiveIndex} index={2} action={option.action[2]} setActionActiveIndex={setActionActiveIndex} />
    </layout>
  }
}

function Setting1Component(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const option = props.option
  const index = props.index
  const action = props.action
  const actionActiveIndex = props.actionActiveIndex
  const setActionActiveIndex = props.setActionActiveIndex

  const actionActive = actionActiveIndex === index

  const size = contextApp.unitpx * 0.112

  const countPercent = Math.min(option.actionCount / action.count, 1)
  const intervalPercent = Math.min(option.actionInterval / action.interval, 1)

  const cx = React.useMemo(() => {
    if (index === 0) return contextApp.locationLayout.w - size - contextApp.unitpx * 0.12
    if (index === 1) return contextApp.locationLayout.w - size - contextApp.unitpx * 0.12 - size * 2.8
    if (index === 2) return contextApp.locationLayout.w - size - contextApp.unitpx * 0.12 - size * 0.4
  }, [index])

  const cy = React.useMemo(() => {
    if (index === 0) return contextApp.locationLayout.h - size - contextApp.unitpx * 0.12
    if (index === 1) return contextApp.locationLayout.h - size - contextApp.unitpx * 0.12 - size * 0.4
    if (index === 2) return contextApp.locationLayout.h - size - contextApp.unitpx * 0.12 - size * 2.8
  }, [index])

  const onPointerDown = (e) => {
    setActionActiveIndex(index)
    e.stopPropagation()
  }

  return <circle cx={cx} cy={cy} radius={size} onPointerDown={onPointerDown}>
    <arc fill cx='50%' cy='50%' fillStyle={actionActive ? 'rgb(75, 75, 125)' : 'rgb(75, 75, 75)'} radius={size} />
    <arc stroke cx='50%' cy='50%' strokeStyle='rgb(255, 255, 255)' radius={size * 1.08} eAngle={Math.PI * 2 * countPercent} lineWidth={size * 0.16} />
    <image cx='50%' cy='50%' w='65%' h='65%' src={contextApp[action.imageIndex]} globalAlpha={intervalPercent} />
  </circle>
}


function Background(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const self = props.self
  const option = props.option

  const roleActive = contextPlayground.gameRoleActive === self

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: roleActive ? 1 : 0, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })

  const animationCountAppearLog = 1 / (1 + Math.exp(1e-9 - Math.log(animationCountAppear) * Math.LN2))

  const globalAlpha = animationCountAppearLog

  const w = `${100 + animationCountAppearLog * 25}%`
  const h = `${100 + animationCountAppearLog * 25}%`

  if (roleActive) {
    return <layout zIndex={contextPlayground.zIndex.RoleBackground}>
      <image cx='50%' cy='50%' w={w} h={h} src={contextApp[option.imageIndex]} globalAlpha={globalAlpha} clipHorizontalCenter clipVerticalCenter zIndex={contextPlayground.zIndex.RoleBackground}/>
    </layout>
  }
}


function App(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const self = props.self
  const option = props.option

  const [actionActiveIndex, setActionActiveIndex] = React.useState(0)

  React.useEffect(() => {
    if (contextPlayground.gamePlay) {
      option.actionCount = option.actionCount + option.actionCountRecover * contextPlayground.gameTimeRate
      option.actionCount = Math.min(option.actionCount, option.actionCountMax)
      option.actionInterval = option.actionInterval + option.actionIntervalRecover * contextPlayground.gameTimeRate
      option.actionInterval = Math.min(option.actionInterval, option.actionIntervalMax)
    }
  }, [contextPlayground.animationCountGameTime])

  return <>
    <Background self={self} option={option} />
    <Setting0 self={self} option={option} actionActiveIndex={actionActiveIndex} setActionActiveIndex={setActionActiveIndex} />
    <Setting1 self={self} option={option} actionActiveIndex={actionActiveIndex} setActionActiveIndex={setActionActiveIndex} />
    <Action0 self={self} option={option} actionActiveIndex={actionActiveIndex} />
    <Action1 self={self} option={option} actionActiveIndex={actionActiveIndex} />
    <Action2 self={self} option={option} actionActiveIndex={actionActiveIndex} />
  </>
}


export { init, App }