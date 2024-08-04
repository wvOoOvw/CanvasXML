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

function Meth(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const setAnimationCountTouchCount = props.setAnimationCountTouchCount
  const setHitAnimation = props.setHitAnimation
  const setAnimationCountHitCount = props.setAnimationCountHitCount
  const animationCountAppear = props.animationCountAppear
  const y = props.y
  const h = props.h

  const onPointerDown = (e) => {
    if (contextPlayground.gamePlay === true) {
      setAnimationCountTouchCount(i => i + 1)

      contextPlayground.gameHit.forEach(i => {
        if (
          i.inProcess === true &&
          i.inDestory === false &&
          i.ifHit() === true &&
          i.ifCollisions().length > 0 &&
          i.ifCollisions().every(i => i.cx + i.w > e.x && i.cx - i.w < e.x && i.cy + i.h > (y - h / 2) && i.cy - i.h < (y + h / 2))
        ) {
          i.onHit()
          i.onUpdate()
          setHitAnimation(n => [...n, { key: Math.random(), x: i.option.x }])
          setAnimationCountHitCount(i => i + 1)
          contextPlayground.setGamePoint(i => i + 200)
          contextPlayground.setGameExpend(i => Math.min(i + 4, 100))
          const audio = new Audio(contextApp.audioPianoV1E7.src)
          audio.volume = 0.5
          audio.play()
        }
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
      />
    </layout>

    <rect
      h={h + contextApp.unitpx * 0.16}
      cx={'50%'}
      cy={y}
      onPointerDown={onPointerDown}
    />
  </>
}

function MethSpecialA(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const animationCountAppear = props.animationCountAppear
  const y = props.y
  const inExpend = props.inExpend
  const inSpecial = props.inSpecial
  const setInSpecial = props.setInSpecial

  const touchRef = React.useRef([false, false])

  const { animationCount: animationCountSpecialAppear } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true && inExpend === true, defaultCount: 0, destination: 1, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountSpecialInfinity } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true && inExpend === true, defaultCount: 0, destination: Infinity, rate: 1 / 60, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountSpecialProcess, setAnimationCount: setAnimationCountSpecialProcess } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true && inSpecial === true, defaultCount: 0, destination: 1, rate: 1 / 120 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const { animationCount: animationCountSpecialTouchA } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true, defaultCount: 0, destination: touchRef.current[0] ? 1 : 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountSpecialTouchB } = React.useAnimationDestination({ play: contextPlayground.gamePlay === true, defaultCount: 0, destination: touchRef.current[1] ? 1 : 0, rate: 1 / 15 * contextPlayground.gameTimeRate, postprocess: n => Number(n.toFixed(4)) })

  const onProcess = () => {

  }

  const onPointerDown = (e, index) => {
    if (contextPlayground.gamePlay === true) {
      touchRef.current[index] = true
    }

    if (touchRef.current.every(i => i === true)) onProcess()
  }

  const onPointerUp = (e, index) => {
    if (contextPlayground.gamePlay === true) {
      touchRef.current[index] = false
    }
  }

  React.useEffect(() => {
    if (animationCountSpecialProcess === 1) {
      setInSpecial(false)
      setAnimationCountSpecialProcess(0)
    }
  }, [animationCountSpecialProcess])

  return <>
    <layout zIndex={contextPlayground.zIndex.WireMeth} globalAlpha={animationCountAppear * animationCountSpecialAppear}>
      <translate translateX={contextApp.locationLayout.w * 0.15} translateY={y}>
        <rotate rotateAngle={Math.PI * 0.25}>
          <translate translateX={contextApp.locationLayout.w * 0.15 * -1} translateY={y * -1}>
            <rect
              stroke
              cx={contextApp.locationLayout.w * 0.15}
              cy={y}
              w={contextApp.unitpx * 0.16 + contextApp.unitpx * 0.04 * (animationCountSpecialInfinity % 1) + contextApp.unitpx * 0.16 * (animationCountSpecialInfinity % 1) * animationCountSpecialTouchA + (inSpecial ? contextApp.unitpx * 0.16 * (animationCountSpecialInfinity % 1) : 0)}
              h={contextApp.unitpx * 0.16 + contextApp.unitpx * 0.04 * (animationCountSpecialInfinity % 1) + contextApp.unitpx * 0.16 * (animationCountSpecialInfinity % 1) * animationCountSpecialTouchA + (inSpecial ? contextApp.unitpx * 0.16 * (animationCountSpecialInfinity % 1) : 0)}
              strokeStyle={'white'}
              globalAlpha={1 - animationCountSpecialInfinity % 1}
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
              w={contextApp.unitpx * 0.16 + contextApp.unitpx * 0.04 * (animationCountSpecialInfinity % 1) + contextApp.unitpx * 0.16 * (animationCountSpecialInfinity % 1) * animationCountSpecialTouchB + (inSpecial ? contextApp.unitpx * 0.16 * (animationCountSpecialInfinity % 1) : 0)}
              h={contextApp.unitpx * 0.16 + contextApp.unitpx * 0.04 * (animationCountSpecialInfinity % 1) + contextApp.unitpx * 0.16 * (animationCountSpecialInfinity % 1) * animationCountSpecialTouchB + (inSpecial ? contextApp.unitpx * 0.16 * (animationCountSpecialInfinity % 1) : 0)}
              strokeStyle={'white'}
              globalAlpha={1 - animationCountSpecialInfinity % 1}
              lineWidth={contextApp.unitpx * 0.008}
            />
          </translate>
        </rotate>
      </translate>
    </layout>

    <rect
      cx={contextApp.locationLayout.w * 0.15}
      cy={y}
      w={contextApp.unitpx * 0.16}
      h={contextApp.unitpx * 0.16}
      onPointerDown={e => onPointerDown(e, 0)}
      onPointerUp={e => onPointerUp(e, 0)}
      onPointerUpAway={e => onPointerUp(e, 0)}
      onPointerMoveAway={e => onPointerUp(e, 0)}
    />

    <rect
      cx={contextApp.locationLayout.w * 0.85}
      cy={y}
      w={contextApp.unitpx * 0.16}
      h={contextApp.unitpx * 0.16}
      onPointerDown={e => onPointerDown(e, 1)}
      onPointerUp={e => onPointerUp(e, 1)}
      onPointerUpAway={e => onPointerUp(e, 1)}
      onPointerMoveAway={e => onPointerUp(e, 1)}
    />
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

  const y = contextApp.locationLayout.h * 0.8 + (1 - animationCountAppear) * contextApp.unitpx * 0.08 + animationCountTouchCount * contextApp.unitpx * 0.01
  const h = contextApp.unitpx * 0.008

  return <>
    <Meth
      y={y}
      h={h}
      setAnimationCountTouchCount={setAnimationCountTouchCount}
      setHitAnimation={setHitAnimation}
      setAnimationCountHitCount={setAnimationCountHitCount}
      animationCountAppear={animationCountAppear}
    />

    <MethSpecialA
      y={y}
      h={h}
      setAnimationCountTouchCount={setAnimationCountTouchCount}
      setHitAnimation={setHitAnimation}
      setAnimationCountHitCount={setAnimationCountHitCount}
      animationCountAppear={animationCountAppear}
      inExpend={contextPlayground.gameExpend > option.expend || contextPlayground.gameExpend === option.expend}
      inSpecial={option.inSpecialA}
      setInSpecial={inSpecial => { option.inSpecialA = inSpecial; onUpdate(); }}
    />

    <layout zIndex={contextPlayground.zIndex.WireHitAnimation}>
      {
        hitAnimation.map(i => <HitAnimation key={i.key} x={i.x} y={y} onDestory={() => setHitAnimation(n => n.filter(v => v !== i))} />)
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