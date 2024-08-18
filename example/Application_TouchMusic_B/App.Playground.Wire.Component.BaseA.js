import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      imageIndex: 'imageJpgRoleA',

      attributeAttackOrigin: 10,
      attributeAttack: 10,

      actionSpend0: 1,
      actionSpend1: 15,
      actionSpend2: 45,

      actionCount: 20,
      actionSpeed: 1 / 60,

      actionImageIndex0: 'imagePngCaesarWhite',
      actionImageIndex1: 'imagePngFangsWhite',
      actionImageIndex2: 'imagePngPlagueDoctorProfileWhite',
    }, optionOverlay
  )

  return { type: 'WireBaseA', option: option }
}


function Action0(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const setAnimationCountHitCount = props.setAnimationCountHitCount

  const self = props.self
  const option = props.option
  const skillActiveIndex = props.skillActiveIndex


  const wireActive = contextPlayground.gameWireActive === self
  const skillActive = skillActiveIndex === 0

  const [hitAnimation, setHitAnimation] = React.useState([])

  const { ref: refLayout0, load: loadLayout0, location: locationLayout0 } = ReactCanvas2dExtensions.useLocationProperty({ default: { y: undefined, h: undefined } })

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: wireActive && skillActive ? 1 : 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountTouchCount, setAnimationCount: setAnimationCountTouchCount } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay, defaultCount: 0, destination: 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const enable = wireActive && skillActive && loadLayout0 && contextPlayground.gamePlay && option.actionSpend0 <= option.actionCount

  const location = [
    {
      y: contextApp.locationLayout.h * 0.5 + (1 - animationCountAppear) * contextApp.unitpx * 0.08 + animationCountTouchCount * contextApp.unitpx * 0.01,
      h: contextApp.unitpx * 0.008
    }
  ]

  const onPointerDown = () => {
    if (enable) {
      option.actionCount = option.actionCount - option.actionSpend0
      setAnimationCountTouchCount(i => i + 1)
      contextPlayground.gameHit.forEach(i => {
        if (
          i.ifHit() === true &&
          i.ifCollisions().length > 0 &&
          i.ifCollisions()
            .some(i =>
              i.tag === 'circle' &&
              [locationLayout0].some(n =>
                i.cy + i.radius > (n.y - n.h / 2) &&
                i.cy - i.radius < (n.y + n.h / 2)
              )
            )
        ) {
          i.onHit(Infinity)
          setHitAnimation(n => [...n, { key: Math.random(), x: i.option.x, y: i.option.y }])
          setAnimationCountHitCount(i => i + 1)
          contextPlayground.setGameCombo(i => i + 1)
          new Audio(contextApp.audioM4aImpactMetalLight003.src).play()
        }
      })
    }

    if (enable !== true) contextApp.addMessage('行动点不足')
  }

  if (animationCountAppear > 0) {
    return <>
      <layout zIndex={contextPlayground.zIndex.WireMeth} globalAlpha={animationCountAppear}>
        <rect fill h={location[0].h} cx={'50%'} cy={location[0].y} fillStyle='white' onLocationMounted={dom => refLayout0.current = dom} />
      </layout>

      <layout zIndex={contextPlayground.zIndex.WireHitAnimation}>
        {
          hitAnimation.map(i => <Action0HitAnimation key={i.key} x={i.x} y={i.y} onDestory={() => setHitAnimation(n => n.filter(v => v !== i))} />)
        }
      </layout>

      <rect onPointerDown={onPointerDown} />
    </>
  }
}

function Action0HitAnimation(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay, defaultCount: 0, destination: 1, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const rotateAngle = React.useMemo(() => animationCountAppear * Math.PI * 0.05, [animationCountAppear])

  const globalAlpha = React.useMemo(() => {
    var globalAlpha

    if (animationCountAppear < 0.25) globalAlpha = animationCountAppear / 0.25
    if (animationCountAppear >= 0.25 && animationCountAppear <= 0.5) globalAlpha = 1
    if (animationCountAppear > 0.5) globalAlpha = (1 - animationCountAppear) / 0.5

    return globalAlpha
  }, [animationCountAppear])

  React.useEffect(() => {
    if (animationCountAppear === 1) props.onDestory()
  }, [animationCountAppear])

  return <>
    <circle fill cx={props.x} cy={props.y} fillStyle='white' radius={contextApp.unitpx * 0.02 - animationCountAppear * contextApp.unitpx * 0.005} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} globalAlpha={globalAlpha} />

    <ReactCanvas2dExtensions.Rotate translateX={props.x} translateY={props.y} rotateAngle={Math.PI * 0.25}>
      <rect stroke cx={props.x} cy={props.y} w={contextApp.unitpx * 0.32 + contextApp.unitpx * 0.02 * animationCountAppear} h={contextApp.unitpx * 0.32 + contextApp.unitpx * 0.02 * animationCountAppear} globalAlpha={globalAlpha} strokeStyle='white' lineWidth={contextApp.unitpx * 0.008} />
    </ReactCanvas2dExtensions.Rotate>

    <ReactCanvas2dExtensions.Rotate translateX={props.x} translateY={props.y} rotateAngle={rotateAngle}>
      <arc stroke cx={props.x} cy={props.y} strokeStyle='white' radius={contextApp.unitpx * 0.1 + animationCountAppear * contextApp.unitpx * 0.02} sAngle={Math.PI * 0} eAngle={Math.PI * 0.5} counterclockwise={false} lineWidth={contextApp.unitpx * 0.008} globalAlpha={globalAlpha} />
      <arc stroke cx={props.x} cy={props.y} strokeStyle='white' radius={contextApp.unitpx * 0.1 + animationCountAppear * contextApp.unitpx * 0.02} sAngle={Math.PI * 1} eAngle={Math.PI * 1.5} counterclockwise={false} lineWidth={contextApp.unitpx * 0.008} globalAlpha={globalAlpha} />
    </ReactCanvas2dExtensions.Rotate>
  </>
}


function Action1(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const setAnimationCountHitCount = props.setAnimationCountHitCount

  const self = props.self
  const option = props.option
  const skillActiveIndex = props.skillActiveIndex


  const wireActive = contextPlayground.gameWireActive === self
  const skillActive = skillActiveIndex === 1

  const [hitAnimation, setHitAnimation] = React.useState([])

  const { ref: refLayout0, load: loadLayout0, location: locationLayout0 } = ReactCanvas2dExtensions.useLocationProperty({ default: { y: undefined, h: undefined } })
  const { ref: refLayout1, load: loadLayout1, location: locationLayout1 } = ReactCanvas2dExtensions.useLocationProperty({ default: { y: undefined, h: undefined } })

  const enable = wireActive && skillActive && loadLayout0 && loadLayout1 && contextPlayground.gamePlay && option.actionSpend1 <= option.actionCount

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: wireActive && skillActive ? 1 : 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountTouchCount, setAnimationCount: setAnimationCountTouchCount } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay, defaultCount: 0, destination: 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const location = [
    {
      y: contextApp.locationLayout.h * 0.35 + (1 - animationCountAppear) * contextApp.unitpx * 0.08 + animationCountTouchCount * contextApp.unitpx * 0.01,
      h: contextApp.unitpx * 0.008
    },
    {
      y: contextApp.locationLayout.h * 0.65 + (1 - animationCountAppear) * contextApp.unitpx * 0.08 + animationCountTouchCount * contextApp.unitpx * 0.01,
      h: contextApp.unitpx * 0.008
    },
  ]

  const onPointerDown = () => {
    if (enable === true) {
      option.actionCount = option.actionCount - option.actionSpend1
      setAnimationCountTouchCount(i => i + 1)
      contextPlayground.gameHit.forEach(i => {
        if (
          i.ifHit() === true &&
          i.ifCollisions().length > 0 &&
          i.ifCollisions()
            .some(i =>
              i.tag === 'circle' &&
              [locationLayout0, locationLayout1].some(n =>
                i.cy + i.radius > (n.y - n.h / 2) &&
                i.cy - i.radius < (n.y + n.h / 2)
              )
            )
        ) {
          i.onHit(Infinity)
          setHitAnimation(n => [...n, { key: Math.random(), x: i.option.x, y: i.option.y }])
          setAnimationCountHitCount(i => i + 1)
          contextPlayground.setGameCombo(i => i + 1)
          new Audio(contextApp.audioM4aImpactMetalLight003.src).play()
        }
      })
    }

    if (enable !== true) contextApp.addMessage('行动点不足')
  }

  if (animationCountAppear > 0) {
    return <>
      <layout zIndex={contextPlayground.zIndex.WireMeth} globalAlpha={animationCountAppear}>
        <rect fill h={location[0].h} cx={'50%'} cy={location[0].y} fillStyle='white' onLocationMounted={dom => refLayout0.current = dom} />
        <rect fill h={location[1].h} cx={'50%'} cy={location[1].y} fillStyle='white' onLocationMounted={dom => refLayout1.current = dom} />
      </layout>

      <layout zIndex={contextPlayground.zIndex.WireHitAnimation}>
        {
          hitAnimation.map(i => <Action1HitAnimation key={i.key} x={i.x} y={i.y} onDestory={() => setHitAnimation(n => n.filter(v => v !== i))} />)
        }
      </layout>

      <rect onPointerDown={onPointerDown} />
    </>
  }
}

function Action1HitAnimation(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay, defaultCount: 0, destination: 1, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const rotateAngle = React.useMemo(() => animationCountAppear * Math.PI * 0.05, [animationCountAppear])

  const globalAlpha = React.useMemo(() => {
    var globalAlpha

    if (animationCountAppear < 0.25) globalAlpha = animationCountAppear / 0.25
    if (animationCountAppear >= 0.25 && animationCountAppear <= 0.5) globalAlpha = 1
    if (animationCountAppear > 0.5) globalAlpha = (1 - animationCountAppear) / 0.5

    return globalAlpha
  }, [animationCountAppear])

  React.useEffect(() => {
    if (animationCountAppear === 1) props.onDestory()
  }, [animationCountAppear])

  return <>
    <circle fill cx={props.x} cy={props.y} fillStyle='white' radius={contextApp.unitpx * 0.02 - animationCountAppear * contextApp.unitpx * 0.005} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} globalAlpha={globalAlpha} />

    <ReactCanvas2dExtensions.Rotate translateX={props.x} translateY={props.y} rotateAngle={Math.PI * 0.25}>
      <rect stroke cx={props.x} cy={props.y} w={contextApp.unitpx * 0.32 + contextApp.unitpx * 0.02 * animationCountAppear} h={contextApp.unitpx * 0.32 + contextApp.unitpx * 0.02 * animationCountAppear} globalAlpha={globalAlpha} strokeStyle='white' lineWidth={contextApp.unitpx * 0.008} />
    </ReactCanvas2dExtensions.Rotate>

    <ReactCanvas2dExtensions.Rotate translateX={props.x} translateY={props.y} rotateAngle={rotateAngle}>
      <arc stroke cx={props.x} cy={props.y} strokeStyle='white' radius={contextApp.unitpx * 0.1 + animationCountAppear * contextApp.unitpx * 0.02} sAngle={Math.PI * 0} eAngle={Math.PI * 0.5} counterclockwise={false} lineWidth={contextApp.unitpx * 0.008} globalAlpha={globalAlpha} />
      <arc stroke cx={props.x} cy={props.y} strokeStyle='white' radius={contextApp.unitpx * 0.1 + animationCountAppear * contextApp.unitpx * 0.02} sAngle={Math.PI * 1} eAngle={Math.PI * 1.5} counterclockwise={false} lineWidth={contextApp.unitpx * 0.008} globalAlpha={globalAlpha} />
    </ReactCanvas2dExtensions.Rotate>
  </>
}


function Action2(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const setAnimationCountHitCount = props.setAnimationCountHitCount

  const self = props.self
  const option = props.option
  const skillActiveIndex = props.skillActiveIndex

  const wireActive = contextPlayground.gameWireActive === self
  const skillActive = skillActiveIndex === 2

  const [hitAnimation, setHitAnimation] = React.useState([])

  const { ref: refLayout0, load: loadLayout0, location: locationLayout0 } = ReactCanvas2dExtensions.useLocationProperty({ default: { y: undefined, h: undefined } })
  const { ref: refLayout1, load: loadLayout1, location: locationLayout1 } = ReactCanvas2dExtensions.useLocationProperty({ default: { y: undefined, h: undefined } })
  const { ref: refLayout2, load: loadLayout2, location: locationLayout2 } = ReactCanvas2dExtensions.useLocationProperty({ default: { y: undefined, h: undefined } })
  const { ref: refLayout3, load: loadLayout3, location: locationLayout3 } = ReactCanvas2dExtensions.useLocationProperty({ default: { y: undefined, h: undefined } })

  const enable = wireActive && skillActive && loadLayout0 && loadLayout1 && loadLayout2 && loadLayout3 && contextPlayground.gamePlay && option.actionSpend2 <= option.actionCount

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: wireActive && skillActive ? 1 : 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountTouchCount, setAnimationCount: setAnimationCountTouchCount } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay, defaultCount: 0, destination: 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const location = [
    {
      y: contextApp.locationLayout.h * 0.3 + (1 - animationCountAppear) * contextApp.unitpx * 0.08 + animationCountTouchCount * contextApp.unitpx * 0.01,
      h: contextApp.unitpx * 0.008
    },
    {
      y: contextApp.locationLayout.h * 0.4 + (1 - animationCountAppear) * contextApp.unitpx * 0.08 + animationCountTouchCount * contextApp.unitpx * 0.01,
      h: contextApp.unitpx * 0.008
    },
    {
      y: contextApp.locationLayout.h * 0.6 + (1 - animationCountAppear) * contextApp.unitpx * 0.08 + animationCountTouchCount * contextApp.unitpx * 0.01,
      h: contextApp.unitpx * 0.008
    },
    {
      y: contextApp.locationLayout.h * 0.7 + (1 - animationCountAppear) * contextApp.unitpx * 0.08 + animationCountTouchCount * contextApp.unitpx * 0.01,
      h: contextApp.unitpx * 0.008
    },
  ]

  const onPointerDown = () => {
    if (enable === true) {
      option.actionCount = option.actionCount - option.actionSpend1
      setAnimationCountTouchCount(i => i + 1)
      contextPlayground.gameHit.forEach(i => {
        if (
          i.ifHit() === true &&
          i.ifCollisions().length > 0 &&
          i.ifCollisions()
            .some(i =>
              i.tag === 'circle' &&
              [locationLayout0, locationLayout1].some(n =>
                i.cy + i.radius > (n.y - n.h / 2) &&
                i.cy - i.radius < (n.y + n.h / 2)
              )
            )
        ) {
          i.onHit(Infinity)
          setHitAnimation(n => [...n, { key: Math.random(), x: i.option.x, y: i.option.y }])
          setAnimationCountHitCount(i => i + 1)
          contextPlayground.setGameCombo(i => i + 1)
          new Audio(contextApp.audioM4aImpactMetalLight003.src).play()
        }
      })
    }

    if (enable !== true) contextApp.addMessage('行动点不足')
  }

  if (animationCountAppear > 0) {
    return <>
      <layout zIndex={contextPlayground.zIndex.WireMeth} globalAlpha={animationCountAppear}>
        <rect fill h={location[0].h} cx={'50%'} cy={location[0].y} fillStyle='white' onLocationMounted={dom => refLayout0.current = dom} />
        <rect fill h={location[1].h} cx={'50%'} cy={location[1].y} fillStyle='white' onLocationMounted={dom => refLayout1.current = dom} />
        <rect fill h={location[2].h} cx={'50%'} cy={location[2].y} fillStyle='white' onLocationMounted={dom => refLayout2.current = dom} />
        <rect fill h={location[3].h} cx={'50%'} cy={location[3].y} fillStyle='white' onLocationMounted={dom => refLayout3.current = dom} />
      </layout>

      <layout zIndex={contextPlayground.zIndex.WireHitAnimation}>
        {
          hitAnimation.map(i => <Action2HitAnimation key={i.key} x={i.x} y={i.y} onDestory={() => setHitAnimation(n => n.filter(v => v !== i))} />)
        }
      </layout>

      <rect onPointerDown={onPointerDown} />
    </>
  }
}

function Action2HitAnimation(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: contextPlayground.gamePlay, defaultCount: 0, destination: 1, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const rotateAngle = React.useMemo(() => animationCountAppear * Math.PI * 0.05, [animationCountAppear])

  const globalAlpha = React.useMemo(() => {
    var globalAlpha

    if (animationCountAppear < 0.25) globalAlpha = animationCountAppear / 0.25
    if (animationCountAppear >= 0.25 && animationCountAppear <= 0.5) globalAlpha = 1
    if (animationCountAppear > 0.5) globalAlpha = (1 - animationCountAppear) / 0.5

    return globalAlpha
  }, [animationCountAppear])

  React.useEffect(() => {
    if (animationCountAppear === 1) props.onDestory()
  }, [animationCountAppear])

  return <>
    <circle fill cx={props.x} cy={props.y} fillStyle='white' radius={contextApp.unitpx * 0.02 - animationCountAppear * contextApp.unitpx * 0.005} sAngle={0} eAngle={Math.PI * 2} counterclockwise={false} globalAlpha={globalAlpha} />

    <ReactCanvas2dExtensions.Rotate translateX={props.x} translateY={props.y} rotateAngle={Math.PI * 0.25}>
      <rect stroke cx={props.x} cy={props.y} w={contextApp.unitpx * 0.32 + contextApp.unitpx * 0.02 * animationCountAppear} h={contextApp.unitpx * 0.32 + contextApp.unitpx * 0.02 * animationCountAppear} globalAlpha={globalAlpha} strokeStyle='white' lineWidth={contextApp.unitpx * 0.008} />
    </ReactCanvas2dExtensions.Rotate>

    <ReactCanvas2dExtensions.Rotate translateX={props.x} translateY={props.y} rotateAngle={rotateAngle}>
      <arc stroke cx={props.x} cy={props.y} strokeStyle='white' radius={contextApp.unitpx * 0.1 + animationCountAppear * contextApp.unitpx * 0.02} sAngle={Math.PI * 0} eAngle={Math.PI * 0.5} counterclockwise={false} lineWidth={contextApp.unitpx * 0.008} globalAlpha={globalAlpha} />
      <arc stroke cx={props.x} cy={props.y} strokeStyle='white' radius={contextApp.unitpx * 0.1 + animationCountAppear * contextApp.unitpx * 0.02} sAngle={Math.PI * 1} eAngle={Math.PI * 1.5} counterclockwise={false} lineWidth={contextApp.unitpx * 0.008} globalAlpha={globalAlpha} />
    </ReactCanvas2dExtensions.Rotate>
  </>
}


function Setting0(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const self = props.self
  const option = props.option

  const wireActive = contextPlayground.gameWireActive === self
  const wireIndex = contextPlayground.gameWire.findIndex(i => i === self)

  const w = contextApp.unitpx * 0.24
  const h = contextApp.unitpx * 0.6
  const gap = contextApp.unitpx * 0.08
  const radius = contextApp.unitpx * 0.1

  const cx = gap + w / 2 + wireIndex * w * 1.25
  const cy = contextApp.locationLayout.h - gap - h / 2

  const rotateAngle = Math.PI * 0.15

  const zIndex = wireActive ? 0.01 : 0
  const active = wireActive ? 1 : 0

  const { animationCount: animationCountActive } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: active, destination: active, rate: 1 / 15, postprocess: n => Number(n.toFixed(4)) })

  const onPointerDown = (e) => {
    contextPlayground.setGameWireActive(self)
    e.stopPropagation()
  }

  return <layout cx={cx} cy={cy} w={w} h={h} zIndex={contextPlayground.zIndex.WireSetting + zIndex}>
    <rectradius clip cx='50%' cy='50%' radius={radius}>

      <image src={contextApp[option.imageIndex]} clipHorizontalCenter clipVerticalCenter />

      <ReactCanvas2dExtensions.Rotate translateX={cx} translateY={cy} rotateAngle={rotateAngle}>
        <rect fill cx='50%' cy='50%' w={w * 2} h={w} globalAlpha={0.5} fillStyle='white' />
      </ReactCanvas2dExtensions.Rotate>

      {
        new Array(6).fill().map((i, index) => {
          const unit = 2 / 6
          const offsetx = Math.cos(Math.PI * unit * (index + 0.5)) * w / 2 * 0.08
          const offsety = Math.sin(Math.PI * unit * (index + 0.5)) * w / 2 * 0.08

          var process = (option.actionCount - index / 6 * 100) / (100 / 6)

          if (process < 0) process = 0
          if (process > 1) process = 1

          return <>
            <arc stroke cx={`calc(50% + ${offsetx}px)`} cy={`calc(50% + ${offsety}px)`} strokeStyle='rgb(75, 75, 75)' radius={w / 2 * 0.65} lineWidth={w * 0.08} sAngle={Math.PI * unit * index} eAngle={Math.PI * unit * index + Math.PI * unit} counterclockwise={false} />
            <arc stroke cx={`calc(50% + ${offsetx}px)`} cy={`calc(50% + ${offsety}px)`} strokeStyle='rgb(255, 255, 255)' radius={w / 2 * 0.65} lineWidth={w * 0.08} sAngle={Math.PI * unit * index} eAngle={Math.PI * unit * index + (Math.PI * unit) * process} counterclockwise={false} />
          </>
        })
      }

    </rectradius>

    {/* {
      animationCountActive > 0 ?
        <image cx='50%' cy='50%' w='75%' h='75%' src={contextApp.imagePngDigitalTraceWhite} clipHorizontalCenter clipVerticalCenter globalAlpha={animationCountActive} />
        : null
    } */}
    {/* <circle cx='50%' cy='50%' radius={size * 1.2} sAngle={Math.PI * 0} eAngle={Math.PI * 2} counterclockwise={false} onPointerDown={onPointerDown} onPointerDownOption={{ priority: contextPlayground.priority.WireSetting }} /> */}
  </layout>
}


function Setting1(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const self = props.self
  const option = props.option
  const skillActiveIndex = props.skillActiveIndex
  const setSkillActiveIndex = props.setSkillActiveIndex

  const wireActive = contextPlayground.gameWireActive === self

  const zIndex = wireActive ? 0.01 : 0

  if (wireActive) {
    return <layout zIndex={contextPlayground.zIndex.WireSetting + zIndex}>
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

  const wireActive = contextPlayground.gameWireActive === self
  const skillActive = skillActiveIndex === skillIndex
  const zIndex = skillActive ? 0.01 : 0

  const size = contextApp.unitpx * 0.12

  const enable = wireActive

  const process = option.actionCount < actionSpend ? option.actionCount / actionSpend : 1

  const cx = React.useMemo(() => {
    if (skillIndex === 0) return contextApp.locationLayout.w - size * 2
    if (skillIndex === 1) return contextApp.locationLayout.w - size * 2 - size * 2.8
    if (skillIndex === 2) return contextApp.locationLayout.w - size * 2 - size * 0.4
  }, [skillIndex])

  const cy = React.useMemo(() => {
    if (skillIndex === 0) return contextApp.locationLayout.h - size * 2
    if (skillIndex === 1) return contextApp.locationLayout.h - size * 2 - size * 0.4
    if (skillIndex === 2) return contextApp.locationLayout.h - size * 2 - size * 2.8
  }, [skillIndex])

  const onPointerDown = (e) => {
    setSkillActiveIndex(skillIndex)
    e.stopPropagation()
  }

  return <layout cx={cx} cy={cy} w={size * 2} h={size * 2} zIndex={zIndex}>
    <circle fill cx='50%' cy='50%' fillStyle='rgb(255, 255, 255)' radius={size * 1.2} sAngle={Math.PI * 0} eAngle={Math.PI * 2 * process} counterclockwise={false} />
    <circle fill cx='50%' cy='50%' fillStyle={skillActive ? 'rgb(75, 75, 125)' : 'rgb(75, 75, 75)'} radius={size * 1.05} sAngle={Math.PI * 0} eAngle={Math.PI * 2} counterclockwise={false} />
    <circle clip cx='50%' cy='50%' w={size * 1.5} h={size * 1.5} radius={size} sAngle={Math.PI * 0} eAngle={Math.PI * 2} counterclockwise={false}>
      <image src={contextApp[actionImageIndex]} clipHorizontalCenter clipVerticalCenter />
    </circle>
    <circle cx='50%' cy='50%' radius={size * 1.2} sAngle={Math.PI * 0} eAngle={Math.PI * 2} counterclockwise={false} onPointerDown={enable ? onPointerDown : undefined} onPointerDownOption={enable ? { priority: contextPlayground.priority.WireSetting } : undefined} />
  </layout>
}


function Background(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const self = props.self
  const option = props.option
  const animationCountHitCount = props.animationCountHitCount

  const wireActive = contextPlayground.gameWireActive === self
  const zIndex = wireActive ? 0.01 : 0

  const { animationCount: animationCountWireActive } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: wireActive ? 1 : 0, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })

  const globalAlpha = React.useMemo(() => {
    return 1 / (1 + Math.exp(1e-9 - Math.log((1 + animationCountHitCount) / 24) * Math.LN2)) * animationCountWireActive
  }, [animationCountHitCount, animationCountWireActive])

  const scale = React.useMemo(() => {
    return 1 / (1 + Math.exp(1e-9 - Math.log((1 + animationCountHitCount) / 24) * Math.LN2)) * animationCountWireActive
  }, [animationCountHitCount, animationCountWireActive])

  if (globalAlpha > 0) {
    return <layout zIndex={contextPlayground.zIndex.WireBackground + zIndex}>
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
      if (option.actionCount > 100) option.actionCount = 100
    }
  })

  return <>
    <Background self={self} option={option} animationCountHitCount={animationCountHitCount} />
    <Setting0 self={self} option={option} />
    <Setting1 self={self} option={option} skillActiveIndex={skillActiveIndex} setSkillActiveIndex={setSkillActiveIndex} />
    <Action0 self={self} option={option} skillActiveIndex={skillActiveIndex} setAnimationCountHitCount={setAnimationCountHitCount} />
    <Action1 self={self} option={option} skillActiveIndex={skillActiveIndex} setAnimationCountHitCount={setAnimationCountHitCount} />
    <Action2 self={self} option={option} skillActiveIndex={skillActiveIndex} setAnimationCountHitCount={setAnimationCountHitCount} />
  </>
}

export { init, App }