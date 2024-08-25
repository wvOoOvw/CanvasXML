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

      actionSpend0: 1,
      actionSpend1: 15,
      actionSpend2: 45,

      actionCount: 20,
      actionCountMax: 100,
      actionSpeed: 1 / 60,

      actionImageIndex0: 'imagePngCaesarWhite',
      actionImageIndex1: 'imagePngFangsWhite',
      actionImageIndex2: 'imagePngPlagueDoctorProfileWhite',

      privateCollisions: [],
    }, optionOverlay
  )

  const ifHitCollisions = () => {
    return option.privateCollisions
  }

  return { type: 'RoleBaseA', option: option, ifHitCollisions }
}


function Action0(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const self = props.self
  const option = props.option
  const skillActiveIndex = props.skillActiveIndex
  const setAnimationCountHitCount = props.setAnimationCountHitCount

  const wireActive = contextPlayground.gameRoleActive === self
  const skillActive = skillActiveIndex === 0

  const [effectAnimation, setEffectAnimation] = React.useState([])
  const [hitAnimation, setHitAnimation] = React.useState([])

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: wireActive && skillActive ? 1 : 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const onPointerDown = (e) => {
    if (wireActive && skillActive && contextPlayground.gamePlay) {
      if (option.actionSpend0 > option.actionCount) {
        contextApp.addMessage('魔力不足')
      }

      if (option.actionSpend0 <= option.actionCount) {
        option.actionCount = option.actionCount - option.actionSpend0
        setEffectAnimation(i => [...i, { key: Math.random(), x: e.x, y: e.y, zIndex: 1 / (1 + Math.exp(1e-9 - Math.log((performance.now()) * Math.LN2))) }])
      }
    }
  }

  if (animationCountAppear > 0 || effectAnimation.length > 0 || hitAnimation.length > 0) {
    return <>
      {
        effectAnimation.map(i => <Action0EffectAnimation key={i.key} x={i.x} y={i.y} zIndex={i.zIndex} option={option} onDestory={() => setEffectAnimation(n => n.filter(v => v !== i))} setHitAnimation={setHitAnimation} setAnimationCountHitCount={setAnimationCountHitCount} />)
      }
      {
        hitAnimation.map(i => <Action0HitAnimation key={i.key} x={i.x} y={i.y} zIndex={i.zIndex} onDestory={() => setHitAnimation(n => n.filter(v => v !== i))} />)
      }
      <rect onPointerDown={onPointerDown} />
    </>
  }
}

function Action0EffectAnimation(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const option = props.option
  const x = props.x
  const y = props.y
  const zIndex = props.zIndex
  const onDestory = props.onDestory
  const setHitAnimation = props.setHitAnimation
  const setAnimationCountHitCount = props.setAnimationCountHitCount

  const size = contextApp.unitpx * 1.44

  const collisionsRef = React.useRef([])

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

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
          n.callback(option.attributeAttackPhysics, option.attributeDefenseMagic)
          setHitAnimation(v => [...v, { key: Math.random(), x: n.props.cx, y: n.props.cy, zIndex: 1 / (1 + Math.exp(1e-9 - Math.log((performance.now()) * Math.LN2))) }])
          setAnimationCountHitCount(i => i + 1)
          contextPlayground.setGameCombo(i => i + 1)
          new Audio(contextApp.audioMp3ImpactMetalLight003.src).play()
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

  return <layout cx={x} cy={y} w={size} h={size} globalAlpha={globalAlpha} zIndex={contextPlayground.zIndex.RoleMeth + zIndex} onLocationMounted={() => collisionsRef.current = []}>
    <arc stroke strokeStyle='rgb(255, 255, 255)' cx='50%' cy='50%' radius={size / 2} sAngle={0} eAngle={Math.PI * 2} lineWidth={contextApp.unitpx * 0.008} onLocationMounted={(dom) => collisionsRef.current.push(dom)} />
    <ReactCanvas2dExtensions.Rotate rotateAngle={Math.PI * 0} onLocationMounted={(dom) => { dom.props.translateX = dom.props.cx; dom.props.translateY = dom.props.cy; }}>
      <rect stroke strokeStyle='rgb(255, 255, 255)' cx='50%' cy='50%' w='35%' h='35%' lineWidth={contextApp.unitpx * 0.008} />
    </ReactCanvas2dExtensions.Rotate>
    <ReactCanvas2dExtensions.Rotate rotateAngle={Math.PI * 0.25} onLocationMounted={(dom) => { dom.props.translateX = dom.props.cx; dom.props.translateY = dom.props.cy; }}>
      <rect stroke strokeStyle='rgb(255, 255, 255)' cx='50%' cy='50%' w='35%' h='35%' lineWidth={contextApp.unitpx * 0.008} />
    </ReactCanvas2dExtensions.Rotate>
  </layout>
}

function Action0HitAnimation(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const x = props.x
  const y = props.y
  const zIndex = props.zIndex
  const onDestory = props.onDestory

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay, defaultCount: 0, destination: 1, rate: 1 / 60 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const rotateAngle = React.useMemo(() => animationCountAppear * Math.PI * 0.05, [animationCountAppear])

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

  return <layout cx={x} cy={y} w={contextApp.unitpx * 0.32} h={contextApp.unitpx * 0.32} globalAlpha={globalAlpha} zIndex={contextPlayground.zIndex.RoleMeth + zIndex}>
    <circle fill cx='50%' cy='50%' fillStyle='white' radius={contextApp.unitpx * 0.02 - animationCountAppear * contextApp.unitpx * 0.005} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} />
    <ReactCanvas2dExtensions.Rotate rotateAngle={Math.PI * 0.25} onLocationMounted={(dom) => { dom.props.translateX = dom.props.cx; dom.props.translateY = dom.props.cy; }}>
      <rect stroke cx='50%' cy='50%' w={`calc(100% + ${contextApp.unitpx * 0.02 * animationCountAppear}px)`} h={`calc(100% + ${contextApp.unitpx * 0.02 * animationCountAppear}px)`} strokeStyle='white' lineWidth={contextApp.unitpx * 0.008} />
    </ReactCanvas2dExtensions.Rotate>
    <ReactCanvas2dExtensions.Rotate rotateAngle={rotateAngle} onLocationMounted={(dom) => { dom.props.translateX = dom.props.cx; dom.props.translateY = dom.props.cy; }}>
      <arc stroke cx='50%' cy='50%' strokeStyle='white' radius={contextApp.unitpx * 0.1 + animationCountAppear * contextApp.unitpx * 0.02} sAngle={Math.PI * 0} eAngle={Math.PI * 0.5} counterclockwise={false} lineWidth={contextApp.unitpx * 0.008} />
      <arc stroke cx='50%' cy='50%' strokeStyle='white' radius={contextApp.unitpx * 0.1 + animationCountAppear * contextApp.unitpx * 0.02} sAngle={Math.PI * 1} eAngle={Math.PI * 1.5} counterclockwise={false} lineWidth={contextApp.unitpx * 0.008} />
    </ReactCanvas2dExtensions.Rotate>
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

  const wireActive = contextPlayground.gameRoleActive === self
  const wireIndex = contextPlayground.gameRole.findIndex(i => i === self)

  var zIndex = wireActive ? 0.01 : 0
  var active = wireActive ? 1 : 0

  const { animationCount: animationCountActive } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: active, destination: active, rate: 1 / 15, postprocess: n => Number(n.toFixed(4)) })

  var w = contextApp.unitpx * 0.24
  var h = contextApp.unitpx * 0.24

  var x = contextApp.unitpx * 0.16 + w / 2 + wireIndex * w * 1.2
  var y = (contextApp.locationLayout.h - contextApp.unitpx * 0.12 - h / 2) - animationCountActive * contextApp.unitpx * 0.08

  const onPointerDown = (e) => {
    contextPlayground.setGameRoleActive(self)
    e.stopPropagation()
  }

  return <layout cx={x} cy={y} w={w} h={h} zIndex={contextPlayground.zIndex.RolePanel + zIndex}>

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

    {
      new Array(6).fill().map((i, index) => {
        const unit = 2 / 6
        const offsetx = Math.cos(Math.PI * unit * (index + 0.5)) * w / 2 * 0.08
        const offsety = Math.sin(Math.PI * unit * (index + 0.5)) * w / 2 * 0.08

        var percent = (option.actionCount - index / 6 * option.actionCountMax) / (option.actionCountMax / 6)

        if (percent < 0) percent = 0
        if (percent > 1) percent = 1

        return <>
          <arc stroke cx={`calc(50% + ${offsetx}px)`} cy={`calc(50% + ${offsety}px)`} strokeStyle='rgb(75, 75, 75)' radius={w / 2 * 0.65} lineWidth={w * 0.08} sAngle={Math.PI * unit * index} eAngle={Math.PI * unit * index + Math.PI * unit} counterclockwise={false} />
          <arc stroke cx={`calc(50% + ${offsetx}px)`} cy={`calc(50% + ${offsety}px)`} strokeStyle='rgb(255, 255, 255)' radius={w / 2 * 0.65} lineWidth={w * 0.08} sAngle={Math.PI * unit * index} eAngle={Math.PI * unit * index + (Math.PI * unit) * percent} counterclockwise={false} />
        </>
      })
    }

    {
      new Array(6).fill().map((i, index) => {
        const unit = 2 / 6
        const offsetx = Math.cos(Math.PI * unit * (index + 0.5)) * w / 2 * 0.08
        const offsety = Math.sin(Math.PI * unit * (index + 0.5)) * w / 2 * 0.08

        var percent = (option.attributeHitPoint - index / 6 * option.attributeHitPointOrigin) / (option.attributeHitPointOrigin / 6)

        if (percent < 0) percent = 0
        if (percent > 1) percent = 1

        return <>
          <arc stroke cx={`calc(50% + ${offsetx}px)`} cy={`calc(50% + ${offsety}px)`} strokeStyle='rgb(75, 75, 75)' radius={w / 2 * 0.35} lineWidth={w * 0.08} sAngle={Math.PI * unit * index} eAngle={Math.PI * unit * index + Math.PI * unit} counterclockwise={false} />
          <arc stroke cx={`calc(50% + ${offsetx}px)`} cy={`calc(50% + ${offsety}px)`} strokeStyle='rgb(175, 75, 75)' radius={w / 2 * 0.35} lineWidth={w * 0.08} sAngle={Math.PI * unit * index} eAngle={Math.PI * unit * index + (Math.PI * unit) * percent} counterclockwise={false} />
        </>
      })
    }

    <rect onPointerDown={onPointerDown} />

  </layout>
}


function Setting1(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const self = props.self
  const option = props.option
  const skillActiveIndex = props.skillActiveIndex
  const setSkillActiveIndex = props.setSkillActiveIndex

  const wireActive = contextPlayground.gameRoleActive === self

  const zIndex = wireActive ? 0.01 : 0

  if (wireActive) {
    return <layout zIndex={contextPlayground.zIndex.RolePanel + zIndex}>
      <Setting1Component self={self} option={option} skillActiveIndex={skillActiveIndex} skillIndex={0} actionSpend={option.actionSpend0} actionImageIndex={option.actionImageIndex0} setSkillActiveIndex={setSkillActiveIndex} />
      <Setting1Component self={self} option={option} skillActiveIndex={skillActiveIndex} skillIndex={1} actionSpend={option.actionSpend1} actionImageIndex={option.actionImageIndex1} setSkillActiveIndex={setSkillActiveIndex} />
      <Setting1Component self={self} option={option} skillActiveIndex={skillActiveIndex} skillIndex={2} actionSpend={option.actionSpend2} actionImageIndex={option.actionImageIndex2} setSkillActiveIndex={setSkillActiveIndex} />
    </layout>
  }
}

function Setting1Component(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const self = props.self
  const option = props.option
  const skillActiveIndex = props.skillActiveIndex
  const skillIndex = props.skillIndex
  const actionSpend = props.actionSpend
  const actionImageIndex = props.actionImageIndex
  const setSkillActiveIndex = props.setSkillActiveIndex

  const wireActive = contextPlayground.gameRoleActive === self
  const skillActive = skillActiveIndex === skillIndex
  const zIndex = skillActive ? 0.01 : 0

  const size = contextApp.unitpx * 0.12

  const percent = option.actionCount < actionSpend ? option.actionCount / actionSpend : 1

  const cx = React.useMemo(() => {
    if (skillIndex === 0) return contextApp.locationLayout.w - size - contextApp.unitpx * 0.16
    if (skillIndex === 1) return contextApp.locationLayout.w - size - contextApp.unitpx * 0.16 - size * 2.8
    if (skillIndex === 2) return contextApp.locationLayout.w - size - contextApp.unitpx * 0.16 - size * 0.4
  }, [skillIndex])

  const cy = React.useMemo(() => {
    if (skillIndex === 0) return contextApp.locationLayout.h - size - contextApp.unitpx * 0.12
    if (skillIndex === 1) return contextApp.locationLayout.h - size - contextApp.unitpx * 0.12 - size * 0.4
    if (skillIndex === 2) return contextApp.locationLayout.h - size - contextApp.unitpx * 0.12 - size * 2.8
  }, [skillIndex])

  const onPointerDown = (e) => {
    if (wireActive) {
      setSkillActiveIndex(skillIndex)
      e.stopPropagation()
    }
  }

  return <layout cx={cx} cy={cy} w={size * 2} h={size * 2} zIndex={zIndex}>
    <arc fill cx='50%' cy='50%' fillStyle={skillActive ? 'rgb(75, 75, 125)' : 'rgb(75, 75, 75)'} radius={size} sAngle={Math.PI * 0} eAngle={Math.PI * 2} counterclockwise={false} />
    <arc stroke cx='50%' cy='50%' strokeStyle='rgb(255, 255, 255)' radius={size * 1.08} sAngle={Math.PI * 0} eAngle={Math.PI * 2 * percent} counterclockwise={false} lineWidth={size * 0.16} />
    <circle clip cx='50%' cy='50%' w={size * 1.2} h={size * 1.2} radius={size} sAngle={Math.PI * 0} eAngle={Math.PI * 2} counterclockwise={false}>
      <image src={contextApp[actionImageIndex]} />
    </circle>
    <circle cx='50%' cy='50%' radius={size * 1.2} sAngle={Math.PI * 0} eAngle={Math.PI * 2} counterclockwise={false} onPointerDown={onPointerDown} />
  </layout>
}


function Background(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const self = props.self
  const option = props.option
  const animationCountHitCount = props.animationCountHitCount

  const wireActive = contextPlayground.gameRoleActive === self
  const zIndex = wireActive ? 0.01 : 0

  const { animationCount: animationCountRoleActive, setAnimationCount: setAnimationCountRoleActive } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: wireActive ? 1 : 0, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (wireActive === false) {
      setAnimationCountRoleActive(0)
    }
  }, [wireActive])

  const globalAlpha = React.useMemo(() => {
    return 1 / (1 + Math.exp(1e-9 - Math.log(1) * Math.LN2)) * animationCountRoleActive
  }, [animationCountRoleActive])

  const scale = React.useMemo(() => {
    return 1 / (1 + Math.exp(1e-9 - Math.log(1) * Math.LN2)) * animationCountRoleActive
  }, [animationCountRoleActive])

  if (globalAlpha > 0) {
    return <layout zIndex={contextPlayground.zIndex.RoleBackground + zIndex}>
      <image cx='50%' cy='50%' w={`${100 + scale * 25}%`} h={`${100 + scale * 25}%`} src={contextApp[option.imageIndex]} clipHorizontalCenter clipVerticalCenter globalAlpha={globalAlpha} />
    </layout>
  }
}


function App(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const self = props.self
  const option = props.option

  const [skillActiveIndex, setSkillActiveIndex] = React.useState(0)

  const { animationCount: animationCountHitCount, setAnimationCount: setAnimationCountHitCount } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay, defaultCount: 0, destination: 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (contextPlayground.gamePlay) {
      option.actionCount = option.actionCount + option.actionSpeed * contextPlayground.gameTimeRate
      option.actionCount = Math.min(option.actionCount, option.actionCountMax)
    }
  }, [contextPlayground.animationCountGameTime])

  return <>
    <Background self={self} option={option} animationCountHitCount={animationCountHitCount} />
    <Setting0 self={self} option={option} skillActiveIndex={skillActiveIndex} setSkillActiveIndex={setSkillActiveIndex} />
    <Setting1 self={self} option={option} skillActiveIndex={skillActiveIndex} setSkillActiveIndex={setSkillActiveIndex} />
    <Action0 self={self} option={option} skillActiveIndex={skillActiveIndex} setAnimationCountHitCount={setAnimationCountHitCount} />
    <Action1 self={self} option={option} skillActiveIndex={skillActiveIndex} setAnimationCountHitCount={setAnimationCountHitCount} />
    <Action2 self={self} option={option} skillActiveIndex={skillActiveIndex} setAnimationCountHitCount={setAnimationCountHitCount} />
  </>
}


export { init, App }