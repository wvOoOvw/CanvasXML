import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Context from './context'

const HitModelx001xCircleVertical = (onHit, option) => {
  const rate = option && option.rate
  const radius = option && option.radius
  const cx = option && option.cx
  const scy = option && option.scy
  const ecy = option && option.ecy
  const angle = option && option.angle

  const hit = {
    rateProcess: rate,
    rateSuccess: Math.round(rate / 4),
    rateFail: Math.round(rate / 4),
    status: 'process',
    graph: [
      {
        type: 'circle',
        property: {
          beginPath: true,
          cx: cx,
          sAngle: 0,
          eAngle: Math.PI * 2,
          counterclockwise: false,
          fill: true,
          radius: radius,
        },
        propertyAddition: {
          cy: (hit, graph, transitionCount, transitionCountSuccess, transitionCountFail) => {
            return scy + transitionCount * (ecy - scy) + + transitionCountSuccess * 0.1 * (ecy - scy) + transitionCountFail * 0.1 * (ecy - scy)
          },
          radius: (hit, graph, transitionCount, transitionCountSuccess, transitionCountFail) => {
            return radius - transitionCountSuccess * radius * 0.35 - transitionCountFail * radius * 0.35
          },
          globalAlpha: (hit, graph, transitionCount, transitionCountSuccess, transitionCountFail) => {
            if (transitionCount < 0.2) return (transitionCount / 0.2)
            if (transitionCount > 0.2 || transitionCount === 0.2) return 1 - transitionCountSuccess - transitionCountFail
          },
          fillStyle: (hit, graph, transitionCount, transitionCountSuccess, transitionCountFail) => {
            if (hit.status === 'process') return 'white'
            if (hit.status === 'success') return 'green'
            if (hit.status === 'fail') return 'red'
          },
        },
      },
      {
        type: 'arc',
        property: {
          beginPath: true,
          cx: cx,
          cy: ecy,
          counterclockwise: false,
          stroke: true,
          lineWidth: 4,
        },
        propertyAddition: {
          radius: (hit, graph, transitionCount, transitionCountSuccess, transitionCountFail) => {
            return radius + (1 - transitionCount) * radius - transitionCountSuccess * radius * 0.35 - transitionCountFail * radius * 0.35
          },
          sAngle: (hit, graph, transitionCount, transitionCountSuccess, transitionCountFail) => {
            return 0 + angle
          },
          eAngle: (hit, graph, transitionCount, transitionCountSuccess, transitionCountFail) => {
            return transitionCount * Math.PI * 2 + angle
          },
          globalAlpha: (hit, graph, transitionCount, transitionCountSuccess, transitionCountFail) => {
            return 1 - transitionCountSuccess - transitionCountFail
          },
          strokeStyle: (hit, graph, transitionCount, transitionCountSuccess, transitionCountFail) => {
            if (hit.status === 'process') return 'white'
            if (hit.status === 'success') return 'green'
            if (hit.status === 'fail') return 'red'
          },
        },
      },
      {
        type: 'circle',
        property: {
          beginPath: true,
          cx: cx,
          cy: ecy,
          sAngle: 0,
          eAngle: Math.PI * 2,
          counterclockwise: false,
        },
        propertyAddition: {
          radius: (hit, graph, transitionCount, transitionCountSuccess, transitionCountFail) => {
            return radius + (1 - transitionCount) * radius - transitionCountSuccess * radius * 0.35 - transitionCountFail * radius * 0.35
          },
          onMouseDown: (hit, graph, transitionCount, transitionCountSuccess, transitionCountFail) => {
            return (dom) => {
              if (transitionCount > 0.8 && hit.status === 'process') onHit(transitionCount)
              if (transitionCount > 0.8 && hit.status === 'process') hit.status = 'success'
            }
          },
          onTouchStart: (hit, graph, transitionCount, transitionCountSuccess, transitionCountFail) => {
            return (e) => {
              if (transitionCount > 0.8 && hit.status === 'process') onHit(transitionCount)
              if (transitionCount > 0.8 && hit.status === 'process') hit.status = 'success'
            }
          }
        },
      }
    ]
  }

  return hit
}

function HitRender(props) {
  const { transitionCount } = React.Plugin.useTransitionCount(
    {
      play: true,
      defaultCount: 0,
      destination: 1,
      rate: 1 / props.hit.rateProcess,
      postprocess: n => Number(n.toFixed(3))
    }
  )

  React.useEffectImmediate(() => {
    if (transitionCount === 1 && props.hit.status === 'process') props.hit.status = 'fail'
  }, [transitionCount])

  const { transitionCount: transitionCountSuccess } = React.Plugin.useTransitionCount(
    {
      play: transitionCount === 1 && props.hit.status === 'success',
      defaultCount: 0,
      destination: 1,
      rate: 1 / props.hit.rateSuccess,
      postprocess: n => Number(n.toFixed(3))
    }
  )

  const { transitionCount: transitionCountFail } = React.Plugin.useTransitionCount(
    {
      play: transitionCount === 1 && props.hit.status === 'fail',
      defaultCount: 0,
      destination: 1,
      rate: 1 / props.hit.rateFail,
      postprocess: n => Number(n.toFixed(3))
    }
  )

  React.useEffect(() => {
    if (transitionCountSuccess === 1 || transitionCountFail === 1) props.destory()
  }, [transitionCountSuccess, transitionCountFail])

  props.hit.graph.forEach(i => Object.entries(i.propertyAddition).forEach((n) => i.property[n[0]] = n[1](props.hit, i, transitionCount, transitionCountSuccess, transitionCountFail)))

  return <layout>
    {
      props.hit.graph.map(i => <i.type {...i.property} />)
    }
  </layout>
}

function Hit() {
  const context = React.useContext(Context)

  const cavansCoordinate = Canvas2d.canvas().coordinate

  const addScore = (value) => context.setScore(pre => pre + value * 100)

  const add = () => {
    const randomX = Math.random()

    const rate = 60
    const radius = 100
    const cx = radius + randomX * (cavansCoordinate.w - radius * 2)
    const scy = radius
    const ecy = cavansCoordinate.h - radius * 2
    const angle = Math.random() * Math.PI * 2

    const hit = HitModelx001xCircleVertical(addScore, { rate, cx, scy, ecy, radius, angle })
    const i = { hit: hit, key: Math.random(), destory: () => context.setHit(pre => pre.filter(n => n !== i)) }

    context.setHit(pre => [...pre, i])
  }

  const { animationCount } = React.Plugin.useAnimationCount({ play: true, defaultCount: 0, defaultDelay: 0, defaultFlow: 0, reverse: false, min: 0, max: Infinity, rate: 1 })

  React.useEffect(() => { if (animationCount % 45 === 0) add() }, [animationCount])

  return <layout>
    {
      context.hit.map((i) => <HitRender key={i.key} hit={i.hit} destory={i.destory} updateStatus={i.updateStatus} />)
    }
  </layout>
}

function Score() {
  const context = React.useContext(Context)

  const { ref: refContentLayout, location: locationContentLayout } = ReactCanvas2d.Plugin.useLocationProperty({ default: { w: 0, h: 0 } })

  const { transitionCount: transitionCountScore } = React.Plugin.useTransitionCount({ play: true, defaultCount: 0, destination: context.score, rate: 8 })

  const score = transitionCountScore.toFixed()

  return <layout container verticalCenter horizontalAlignCenter onLocationMount={dom => refContentLayout.current = dom}>
    <ReactCanvas2d.Component.TextCaculateLine text={`HIT`} font='24px monospace' lineHeight={1} gap={0} w={locationContentLayout.w - 48} split=' ' wrap>
      {
        (line, location) => {
          return <layout w={location.w} h={location.h} item>
            <text fillText fillStyle='white' align='center' font='24px monospace' lineHeight={1} gap={0} line={line} />
          </layout>
        }
      }
    </ReactCanvas2d.Component.TextCaculateLine>

    <layout h='32px' item></layout>

    <ReactCanvas2d.Component.TextCaculateLine text={score} font='48px monospace' lineHeight={1} gap={0} w={locationContentLayout.w - 48} split=' ' wrap>
      {
        (line, location) => {
          return <layout w={location.w} h={location.h} item>
            <text fillText fillStyle='white' align='center' font='48px monospace' lineHeight={1} gap={0} line={line} />
          </layout>
        }
      }
    </ReactCanvas2d.Component.TextCaculateLine>
  </layout>
}

function App() {
  const [hit, setHit] = React.useState([])
  const [score, setScore] = React.useState(0)

  const value = { hit, setHit, score, setScore }

  const HitMemo = React.useMemo(() => <Hit />, [hit])
  const ScoreMemo = React.useMemo(() => <Score />, [score])

  return <Context.Provider value={value}>
    {HitMemo}
    {ScoreMemo}
  </Context.Provider>
}

export default App