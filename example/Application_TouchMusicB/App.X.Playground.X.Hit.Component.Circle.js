import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import { distance, move } from './utils'

const init = (optionOverlay, time) => {
  const option = Object.assign(
    {
      geometryMode: '',

      status: [],

      x: 0,
      y: 0,

      sx: 0,
      ex: 0,
      sy: 0,
      ey: 0,
      radius: 0,

      pathPoint: [],
      pathSpeed: 0.01,

      hitPoint: 4,
      hitDamage: 1,
      hitDefense: 0,

      accumulatedHitPoint: 0
    }, optionOverlay
  )

  option.hitPointMax = option.hitPoint

  const ifDestination = () => {
    return option.pathPoint.every(i => i.t > 0) && option.x === option.ex && option.y === option.ey
  }

  const ifDie = () => {
    return option.hitPoint === 0 || option.hitPoint < 0
  }

  const ifCollision = () => {
    return { x: option.x, y: option.y, radius: option.radius, geometryMode: option.geometryMode }
  }

  const onHit = (point) => {
    option.hitPoint = option.hitPoint - Math.max(point - option.hitDefense, point * 0.15)
  }

  const onStatus = (status) => {
    const find = option.status.find(i => i.key === status.key)

    if (find !== undefined) {
      Object.assign(find, status)
    }
    if (find === undefined) {
      option.status.push(status)
    }

    option.status = [...option.status]
  }

  const onDestination = (gameRole, gameRoleUse) => {
    gameRoleUse.onHit(option.hitDamage)
    gameRoleUse.onUpdate()
  }

  const onMove = (x, y) => {
    option.x = x
    option.y = y
  }

  return { key: Math.random(), component: App, option: option, time: time, ifDestination, ifDie, ifCollision, onHit, onStatus, onDestination, onMove }
}

const Mesh = (props) => {
  const globalAlpha = React.useMemo(() => {
    var globalAlpha = 0

    globalAlpha = props.animationCountIntersection - props.animationCountDestory * 4

    if (globalAlpha < 0) globalAlpha = 0
    if (globalAlpha > 1) globalAlpha = 1

    return globalAlpha
  }, [props.animationCountIntersection, props.animationCountDestory])

  return <layout
    cx={props.option.x}
    cy={props.option.y}
    w={props.option.radius * 2}
    h={props.option.radius * 2}
    globalAlpha={globalAlpha}
  >
    <circle
      fill
      clip
      cx={'50%'}
      cy={'50%'}
      sAngle={0}
      eAngle={Math.PI * 2}
      counterclockwise={false}
      radius={props.option.radius}
      fillStyle={'white'}
    />

    <ReactCanvas2d.TextCaculateLine text={String(props.option.hitPoint)} font={`bolder ${props.ceilpx * 0.2}px sans-serif`} lineHeight={1} gap={0} w={Infinity} split=' '>
      {
        (line, location) => {
          return <layout cx={'50%'} cy={'50%'} w={location.w} h={location.h} item>
            <text fillText fillStyle='rgb(0, 0, 0)' align='center' font={`bolder ${props.ceilpx * 0.2}px sans-serif`} lineHeight={1} gap={0} line={line} />
          </layout>
        }
      }
    </ReactCanvas2d.TextCaculateLine>
  </layout>
}

const App = (props) => {
  const { animationCount: animationCountIntersection } = React.useAnimationDestination(
    {
      play: props.ifDie() === false,
      defaultCount: 0,
      destination: 1,
      rate: 1 / 30 * props.gameTimeRate,
      postprocess: n => Number(n.toFixed(4))
    }
  )

  const { animationCount: animationCountDestory } = React.useAnimationDestination(
    {
      play: props.ifDestination() === true || props.ifDie() === true,
      defaultCount: 0,
      destination: 1,
      rate: 1 / 30 * props.gameTimeRate,
      postprocess: n => Number(n.toFixed(4))
    }
  )

  const destinationRef = React.useRef(false)

  React.useEffect(() => {
    if (props.ifDestination() === true && destinationRef.current && (destinationRef.current = true === true)) {
      props.onDestination(props.gameRole, props.gameRoleUse)
    }
  }, [])

  React.useEffect(() => {
    if (animationCountDestory === 1) {
      props.onDestory()
      props.onUpdate()
    }
  }, [animationCountDestory])

  React.useEffect(() => {
    if (props.ifDestination() === false && props.ifDie() === false) {
      var count = props.ceilpx * props.option.pathSpeed * props.gameTimeRate

      while (count > 0 && props.ifDestination() === false) {
        const start = { x: props.option.x, y: props.option.y }
        const destination = props.option.pathPoint.filter(i => i.t > 0)[0] || { x: props.option.ex, y: props.option.ey }

        if (start.x !== destination.x || start.y !== destination.y) {
          const moved = move(start, destination, count)

          if (start.x > destination.x) moved.x = Math.max(moved.x, destination.x)
          if (start.x < destination.x) moved.x = Math.min(moved.x, destination.x)
          if (start.y > destination.y) moved.y = Math.max(moved.y, destination.y)
          if (start.y < destination.y) moved.y = Math.min(moved.y, destination.y)

          count = count - distance(moved, start)

          props.onMove(moved.x, moved.y)
        }

        if (start.x === destination.x && start.y === destination.y) {
          const min = Math.min(destination.t, count)
          destination.t = destination.t - min
          count = count - min
        }

        if (count && Math.abs(count) < 0.001) count = 0
      }
    }
  })

  return <>
    <Mesh animationCountIntersection={animationCountIntersection} animationCountDestory={animationCountDestory} {...props} />
  </>
}

export { init, App }