import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

const init = (optionOverlay) => {
  const option = Object.assign(
    {
      status: [],
      expend: 25,
      inSpecialA: false,
      inSpecialB: false,
    }, optionOverlay
  )

  const ifSpecial = () => {
    return option.inSpecialA || option.inSpecialB
  }

  return { key: Math.random(), component: App, option: option, ifSpecial }
}

function HitAnimation(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const { animationCount: animationCountAppear } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true, defaultCount: 0, destination: 1, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const rotateAngle = React.useMemo(() => animationCountAppear * Math.PI * 0.05, [animationCountAppear])
  const radius = React.useMemo(() => contextApp.unitpx * 0.16 + animationCountAppear * contextApp.unitpx * 0.16 * 4, [animationCountAppear])

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
    <translate translateX={props.x} translateY={props.y}>
      <rotate rotateAngle={Math.PI * 0.25}>
        <translate translateX={props.x * -1} translateY={props.y * -1}>
          <rect
            stroke
            cx={props.x}
            cy={props.y}
            w={contextApp.unitpx * 0.32 + contextApp.unitpx * 0.02 * animationCountAppear}
            h={contextApp.unitpx * 0.32 + contextApp.unitpx * 0.02 * animationCountAppear}
            globalAlpha={globalAlpha}
            strokeStyle={'white'}
            lineWidth={contextApp.unitpx * 0.008}
          />
        </translate>
      </rotate>
    </translate>

    <circle
      fill
      cx={props.x}
      cy={props.y}
      fillStyle={'white'}
      radius={contextApp.unitpx * 0.02 - animationCountAppear * contextApp.unitpx * 0.005}
      sAngle={0}
      eAngle={Math.PI * 2}
      counterclockwise={false}
      globalAlpha={globalAlpha}
    />

    <translate translateX={props.x} translateY={props.y}>
      <rotate rotateAngle={rotateAngle}>
        <translate translateX={props.x * -1} translateY={props.y * -1}>
          <arc
            stroke
            cx={props.x}
            cy={props.y}
            strokeStyle={'white'}
            radius={contextApp.unitpx * 0.1 + animationCountAppear * contextApp.unitpx * 0.02}
            sAngle={Math.PI * 0}
            eAngle={Math.PI * 0.5}
            counterclockwise={false}
            lineWidth={contextApp.unitpx * 0.008}
            globalAlpha={globalAlpha}
          />
          <arc
            stroke
            cx={props.x}
            cy={props.y}
            strokeStyle={'white'}
            radius={contextApp.unitpx * 0.1 + animationCountAppear * contextApp.unitpx * 0.02}
            sAngle={Math.PI * 1}
            eAngle={Math.PI * 1.5}
            counterclockwise={false}
            lineWidth={contextApp.unitpx * 0.008}
            globalAlpha={globalAlpha}
          />
        </translate>
      </rotate>
    </translate>
  </>
}

function SpecialProcessA(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const y = props.y
  const h = props.h
  const setHitAnimation = props.setHitAnimation
  const setAnimationCountTouchCount = props.setAnimationCountTouchCount
  const setAnimationCountHitCount = props.setAnimationCountHitCount
  const onDestory = props.onDestory

  const { ref: refLayout, load: loadLayout, location: locationLayout } = ReactCanvas2d.useLocationProperty({ default: { y: undefined, h: undefined } })

  const { animationCount: animationCountSpecialAppear } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const onProcess = () => {
    if (contextPlayground.gamePlay === true && loadLayout) {
      contextPlayground.gameHit.forEach(i => {
        if (
          i.inProcess === true &&
          i.inDestory === false &&
          i.ifHit() === true &&
          i.ifCollisions().length > 0 &&
          i.ifCollisions()
            .every(i =>
              i.cy + i.h > (locationLayout.y - locationLayout.h / 2) &&
              i.cy - i.h < (locationLayout.y + locationLayout.h / 2)
            )
        ) {
          i.onHit()
          i.onUpdate()
          setHitAnimation(n => [...n, { key: Math.random(), x: i.option.x, y: i.option.y }])
          setAnimationCountHitCount(i => i + 1)
          contextPlayground.setGamePoint(i => i + 200)
          contextPlayground.setGameExpend(i => Math.min(i + 1, 100))
          const audio = new Audio(contextApp.audioPianoV1E7.src)
          audio.volume = 0.5
          audio.play()
        }
      })
    }
  }

  const globalAlpha = React.useMemo(() => {
    if (animationCountSpecialAppear < 0.2 || animationCountSpecialAppear === 0.2) {
      return animationCountSpecialAppear / 0.2
    }
    if (animationCountSpecialAppear > 0.2 && animationCountSpecialAppear < 0.8) {
      return 1
    }
    if (animationCountSpecialAppear > 0.8) {
      return (1 - animationCountSpecialAppear) / 0.2
    }
  }, [animationCountSpecialAppear])

  React.useEffect(() => {
    onProcess()
    if (animationCountSpecialAppear === 1) onDestory()
  }, [animationCountSpecialAppear])

  return <>
    <rect
      fill
      h={h}
      cx={'50%'}
      cy={y + (0 - y) * animationCountSpecialAppear}
      fillStyle={'white'}
      onLocationMounted={dom => refLayout.current = dom}
      globalAlpha={globalAlpha}
    />
  </>
}

function Meth(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const y = props.y
  const h = props.h
  const setHitAnimation = props.setHitAnimation
  const setAnimationCountTouchCount = props.setAnimationCountTouchCount
  const setAnimationCountHitCount = props.setAnimationCountHitCount
  const animationCountAppear = props.animationCountAppear

  const { ref: refLayout, load: loadLayout, location: locationLayout } = ReactCanvas2d.useLocationProperty({ default: { y: undefined, h: undefined } })

  const onPointerDown = (e) => {
    if (contextPlayground.gamePlay === true && loadLayout) {
      e.xs.forEach((x) => {
        setAnimationCountTouchCount(i => i + 1)

        contextPlayground.gameHit.forEach(i => {
          if (
            i.inProcess === true &&
            i.inDestory === false &&
            i.ifHit() === true &&
            i.ifCollisions().length > 0 &&
            i.ifCollisions()
              .every(i =>
                i.cx + i.w > x &&
                i.cx - i.w < x &&
                i.cy + i.h > (locationLayout.y - locationLayout.h / 2) &&
                i.cy - i.h < (locationLayout.y + locationLayout.h / 2)
              )
          ) {
            i.onHit()
            i.onUpdate()
            setHitAnimation(n => [...n, { key: Math.random(), x: i.option.x }])
            setAnimationCountHitCount(i => i + 1)
            contextPlayground.setGamePoint(i => i + 200)
            contextPlayground.setGameExpend(i => Math.min(i + 1, 100))
            const audio = new Audio(contextApp.audioPianoV1E7.src)
            audio.volume = 0.5
            audio.play()
          }
        })
      })
    }
  }

  return <>
    <layout zIndex={contextPlayground.zIndex.WireMeth} globalAlpha={animationCountAppear}>
      <rect
        fill
        h={h}
        cx={'50%'}
        cy={y}
        fillStyle={'white'}
        onLocationMounted={dom => refLayout.current = dom}
      />
    </layout>

    <rect
      h={h + contextApp.unitpx * 0.24}
      cx={'50%'}
      cy={y}
      onPointerDown={onPointerDown}
    />
  </>
}

function MethSpecialA(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const option = props.option
  const y = props.y
  const h = props.h
  const animationCountAppear = props.animationCountAppear
  const setHitAnimation = props.setHitAnimation
  const setAnimationCountTouchCount = props.setAnimationCountTouchCount
  const setAnimationCountHitCount = props.setAnimationCountHitCount
  const inExpend = props.inExpend
  const inSpecial = props.inSpecial
  const setInSpecial = props.setInSpecial

  const [touch, setTouch] = React.useState([false, false])
  const [process, setProcess] = React.useState(new Array(4).fill().map((i, index) => Object({ time: index / 3, pass: false })))
  const [processView, setProcessView] = React.useState([])

  const { animationCount: animationCountSpecialAppear } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true, defaultCount: 0, destination: inExpend === true && inSpecial === false ? 1 : 0, rate: 1 / 30 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountSpecialInfinity, setAnimationCount: setAnimationCountSpecialInfinity } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true && (inExpend === true || inSpecial === true), defaultCount: 0, destination: Infinity, rate: 1 / 45 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountSpecialProcess, setAnimationCount: setAnimationCountSpecialProcess } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true && inSpecial === true, defaultCount: 0, destination: 1, rate: 1 / 360 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const { animationCount: animationCountSpecialTouchA } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true, defaultCount: 0, destination: touch[0] ? 1 : 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountSpecialTouchB } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true, defaultCount: 0, destination: touch[1] ? 1 : 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const onPointerDown = (e, index) => {
    if (contextPlayground.gamePlay === true && inSpecial === false) {
      setTouch(i => i.map((n, nindex) => nindex === index ? true : n))
    }
  }

  const onPointerUp = (e, index) => {
    if (contextPlayground.gamePlay === true) {
      setTouch(i => i.map((n, nindex) => nindex === index ? false : n))
    }
  }

  React.useEffect(() => {
    if (touch.every(i => i === true)) {
      setTouch(i => i.map(() => false))
      setAnimationCountTouchCount(i => i + 4)
      setInSpecial(true)
      contextPlayground.setGameExpend(i => i - option.expend)
    }
  }, [touch])

  React.useEffect(() => {
    if (inSpecial) {
      setProcess(i => i.map((i) => {
        if (i.pass === false && (i.time < animationCountSpecialProcess || i.time === animationCountSpecialProcess)) {
          i.pass = true
          setProcessView(i => [...i, { key: Math.random() }])
          setAnimationCountTouchCount(i => i + 1)
        }
        return i
      }))

      if (animationCountSpecialProcess === 1 && processView.length === 0) {
        setProcess(i => i.map((i) => Object({ ...i, pass: false })))
        setInSpecial(false)
        setAnimationCountSpecialProcess(0)
      }
    }
  }, [inSpecial, animationCountSpecialProcess, processView])

  return <>

    {
      animationCountSpecialAppear > 0 ?
        <>
          <layout zIndex={contextPlayground.zIndex.WireMeth} globalAlpha={animationCountAppear * animationCountSpecialAppear}>
            <translate translateX={contextApp.locationLayout.w * 0.15} translateY={y}>
              <rotate rotateAngle={Math.PI * 0.25}>
                <translate translateX={contextApp.locationLayout.w * 0.15 * -1} translateY={y * -1}>
                  <rect
                    stroke
                    cx={contextApp.locationLayout.w * 0.15}
                    cy={y}
                    w={contextApp.unitpx * 0.16 + contextApp.unitpx * 0.04 * animationCountSpecialTouchA}
                    h={contextApp.unitpx * 0.16 + contextApp.unitpx * 0.04 * animationCountSpecialTouchA}
                    strokeStyle={'white'}
                    lineWidth={contextApp.unitpx * 0.008}
                  />

                  <rect
                    stroke
                    cx={contextApp.locationLayout.w * 0.15}
                    cy={y}
                    w={contextApp.unitpx * 0.16 + contextApp.unitpx * 0.08 * (animationCountSpecialInfinity % 1) + contextApp.unitpx * 0.04 * animationCountSpecialTouchA + (inSpecial ? contextApp.unitpx * 0.16 * (animationCountSpecialInfinity % 1) : 0)}
                    h={contextApp.unitpx * 0.16 + contextApp.unitpx * 0.08 * (animationCountSpecialInfinity % 1) + contextApp.unitpx * 0.04 * animationCountSpecialTouchA + (inSpecial ? contextApp.unitpx * 0.16 * (animationCountSpecialInfinity % 1) : 0)}
                    strokeStyle={'white'}
                    globalAlpha={1 - animationCountSpecialInfinity % 1}
                    lineWidth={contextApp.unitpx * 0.008}
                  />

                  <rect
                    stroke
                    cx={contextApp.locationLayout.w * 0.15}
                    cy={y}
                    w={contextApp.unitpx * 0.48 - contextApp.unitpx * 0.32 * (animationCountSpecialInfinity % 1)}
                    h={contextApp.unitpx * 0.48 - contextApp.unitpx * 0.32 * (animationCountSpecialInfinity % 1)}
                    strokeStyle={'white'}
                    globalAlpha={animationCountSpecialInfinity % 1 * animationCountSpecialTouchB}
                    lineWidth={contextApp.unitpx * 0.008}
                  />
                </translate>
              </rotate>
            </translate>

            <translate translateX={contextApp.locationLayout.w * 0.85} translateY={y}>
              <rotate rotateAngle={Math.PI * 0.25}>
                <translate translateX={contextApp.locationLayout.w * 0.85 * -1} translateY={y * -1}>
                  <rect
                    stroke
                    cx={contextApp.locationLayout.w * 0.85}
                    cy={y}
                    w={contextApp.unitpx * 0.16 + contextApp.unitpx * 0.04 * animationCountSpecialTouchB}
                    h={contextApp.unitpx * 0.16 + contextApp.unitpx * 0.04 * animationCountSpecialTouchB}
                    strokeStyle={'white'}
                    lineWidth={contextApp.unitpx * 0.008}
                  />

                  <rect
                    stroke
                    cx={contextApp.locationLayout.w * 0.85}
                    cy={y}
                    w={contextApp.unitpx * 0.16 + contextApp.unitpx * 0.08 * (animationCountSpecialInfinity % 1) + contextApp.unitpx * 0.04 * animationCountSpecialTouchB + (inSpecial ? contextApp.unitpx * 0.16 * (animationCountSpecialInfinity % 1) : 0)}
                    h={contextApp.unitpx * 0.16 + contextApp.unitpx * 0.08 * (animationCountSpecialInfinity % 1) + contextApp.unitpx * 0.04 * animationCountSpecialTouchB + (inSpecial ? contextApp.unitpx * 0.16 * (animationCountSpecialInfinity % 1) : 0)}
                    strokeStyle={'white'}
                    globalAlpha={1 - animationCountSpecialInfinity % 1}
                    lineWidth={contextApp.unitpx * 0.008}
                  />

                  <rect
                    stroke
                    cx={contextApp.locationLayout.w * 0.85}
                    cy={y}
                    w={contextApp.unitpx * 0.48 - contextApp.unitpx * 0.32 * (animationCountSpecialInfinity % 1)}
                    h={contextApp.unitpx * 0.48 - contextApp.unitpx * 0.32 * (animationCountSpecialInfinity % 1)}
                    strokeStyle={'white'}
                    globalAlpha={animationCountSpecialInfinity % 1 * animationCountSpecialTouchA}
                    lineWidth={contextApp.unitpx * 0.008}
                  />
                </translate>
              </rotate>
            </translate>
          </layout>

          <rect
            cx={contextApp.locationLayout.w * 0.15}
            cy={y}
            w={contextApp.unitpx * 0.36}
            h={contextApp.unitpx * 0.36}
            onPointerDown={e => onPointerDown(e, 0)}
            onPointerUp={e => onPointerUp(e, 0)}
            onPointerUpAway={e => onPointerUp(e, 0)}
            onPointerMoveAway={e => onPointerUp(e, 0)}
          />

          <rect
            cx={contextApp.locationLayout.w * 0.85}
            cy={y}
            w={contextApp.unitpx * 0.36}
            h={contextApp.unitpx * 0.36}
            onPointerDown={e => onPointerDown(e, 1)}
            onPointerUp={e => onPointerUp(e, 1)}
            onPointerUpAway={e => onPointerUp(e, 1)}
            onPointerMoveAway={e => onPointerUp(e, 1)}
          />
        </>
        : null
    }

    <layout zIndex={contextPlayground.zIndex.WireMeth} globalAlpha={animationCountAppear}>
      {
        processView.map(i => <SpecialProcessA key={i.key} y={y} h={h} setHitAnimation={setHitAnimation} setAnimationCountTouchCount={setAnimationCountTouchCount} setAnimationCountHitCount={setAnimationCountHitCount} onDestory={() => setProcessView(n => n.filter(v => v !== i))} />)
      }
    </layout>
  </>
}

function App(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const option = props.option
  const onUpdate = props.onUpdate

  const [hitAnimation, setHitAnimation] = React.useState([])

  const { animationCount: animationCountAppear } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true, defaultCount: 0, destination: 1, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountTouchCount, setAnimationCount: setAnimationCountTouchCount } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true, defaultCount: 0, destination: 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountHitCount, setAnimationCount: setAnimationCountHitCount } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true, defaultCount: 0, destination: 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const y = contextApp.locationLayout.h * 0.75 + (1 - animationCountAppear) * contextApp.unitpx * 0.08 + animationCountTouchCount * contextApp.unitpx * 0.01
  const h = contextApp.unitpx * 0.008

  return <>
    <Meth
      option={option}
      y={y}
      h={h}
      setHitAnimation={setHitAnimation}
      setAnimationCountTouchCount={setAnimationCountTouchCount}
      setAnimationCountHitCount={setAnimationCountHitCount}
      animationCountAppear={animationCountAppear}
    />

    <MethSpecialA
      option={option}
      y={y}
      h={h}
      setHitAnimation={setHitAnimation}
      setAnimationCountTouchCount={setAnimationCountTouchCount}
      setAnimationCountHitCount={setAnimationCountHitCount}
      animationCountAppear={animationCountAppear}
      inExpend={contextPlayground.gameExpend > option.expend || contextPlayground.gameExpend === option.expend}
      inSpecial={option.inSpecialA}
      setInSpecial={inSpecial => { option.inSpecialA = inSpecial; onUpdate(); }}
    />

    <layout zIndex={contextPlayground.zIndex.WireHitAnimation}>
      {
        hitAnimation.map(i => <HitAnimation key={i.key} x={i.x} y={i.y || y} onDestory={() => setHitAnimation(n => n.filter(v => v !== i))} />)
      }
    </layout>

    <layout zIndex={contextPlayground.zIndex.WireImage}>
      {
        animationCountHitCount ?
          <image
            cx={'50%'}
            cy={'50%'}
            image={props.option.image}
            size='auto-max'
            position='center'
            globalAlpha={1 / (1 + Math.exp(1e-9 - Math.log(animationCountHitCount / 24) * Math.LN2))}
          />
          : null
      }
    </layout>
  </>
}

export { init, App }