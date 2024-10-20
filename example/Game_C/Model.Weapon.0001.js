import React from '../../package/React'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

import { collisions } from './utils'

function ComponentInWarTouchEffect(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const animation = props.animation
  const onDestory = props.onDestory

  const location = {
    container: {
      x: contextApp.locationLayout.w / 7 * (animation.index - 3),
      y: 0,
      w: contextApp.locationLayout.w / 7,
      h: contextApp.locationLayout.h
    }
  }

  const collisionsDom = React.useRef()

  const { animationCountProcessed: animationCountAppear } = ReactExtensions.useAnimationCount({ play: true, defaultCount: 0, defaultDestination: 1, defaultRate: 1 / 4, postprocess: n => Number(n.toFixed(4)) })
  const { animationCountProcessed: animationCountWait } = ReactExtensions.useAnimationCount({ play: animationCountAppear === 1, defaultCount: 0, defaultDestination: 1, defaultRate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCountProcessed: animationCountDisappear } = ReactExtensions.useAnimationCount({ play: animationCountWait === 1, defaultCount: 0, defaultDestination: 1, defaultRate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (animationCountAppear === 1) {
      contextPlayground.monsterInWar.forEach(i => {
        // if (i.caculateLive() === true && collisions(i.caculteCollisionDom(), collisionsDom)) {
        //   i.onHit(42)
        // }
      })
    }
  }, [animationCountAppear])

  React.useEffect(() => {
    if (animationCountDisappear === 1) {
      onDestory()
    }
  }, [animationCountDisappear])

  const Component =
    <layout x={location.container.x} y={location.container.y} w={location.container.w} h={location.container.h} globalAlpha={animationCountAppear - animationCountDisappear}>
      <rect onLocationMounted={dom => collisionsDom.current = dom} />
      <rect fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.04} shadowBlur={contextApp.unitpx * 0.04} />
    </layout>

  return Component
}

function ComponentInWarTouchWave(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const animation = props.animation
  const onDestory = props.onDestory

  const location = {
    container: {
      x: animation.x,
      y: animation.y,
    },
    arc: {
      radius: contextApp.unitpx * 0.72
    }
  }

  const { animationCountProcessed: animationCountAppear } = ReactExtensions.useAnimationCount({ play: true, defaultCount: 0, defaultDestination: 1, defaultRate: 1 / 24, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (animationCountAppear === 1) {
      onDestory()
    }
  }, [animationCountAppear])

  const Component =
    <layout x={location.container.x} y={location.container.y} globalAlpha={(1 - animationCountAppear) * 0.8}>
      <arc fill fillStyle='rgb(255, 255, 255)' radius={location.arc.radius * animationCountAppear} />
    </layout>

  return Component
}

function ComponentInWar(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const weapon = props.weapon
  const onDestory = props.onDestory

  const inWar = contextPlayground.weaponInWar.includes(weapon)

  const [animationTouchWave, setAnimationTouchWave] = React.useState([])

  const [loadAppear, setLoadAppear] = React.useState(false)

  const { animationCountProcessed: animationCountAppear } = ReactExtensions.useAnimationCount({ play: inWar === true, defaultCount: 0, defaultDestination: 1, defaultRate: 1 / 24, postprocess: n => Number(n.toFixed(4)) })
  const { animationCountProcessed: animationCountDisappear } = ReactExtensions.useAnimationCount({ play: inWar !== true, defaultCount: 0, defaultDestination: 1, defaultRate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (inWar === false && animationCountAppear === 0) {
      onDestory()
    }
  }, [inWar, animationCountAppear])

  const location = {
    container: { y: contextApp.locationLayout.h / 2 - contextApp.unitpx * 0.32 },

    style: {
      shadowBlur: [contextApp.unitpx * 0.02]
    },

    corner: {
      LT: { x: 0 - contextApp.unitpx * 0.72, y: 0 - contextApp.unitpx * 0.24 },
      RT: { x: 0 + contextApp.unitpx * 0.72, y: 0 - contextApp.unitpx * 0.24 },
      RB: { x: 0 + contextApp.unitpx * 0.72, y: 0 + contextApp.unitpx * 0.24 },
      LB: { x: 0 - contextApp.unitpx * 0.72, y: 0 + contextApp.unitpx * 0.24 },
    },

    shelf: {
      LT: { x: 0 - contextApp.unitpx * 0.84, y: 0 - contextApp.unitpx * 0.48 },
      RT: { x: 0 + contextApp.unitpx * 0.84, y: 0 - contextApp.unitpx * 0.48 },
      RB: { x: 0 + contextApp.unitpx * 0.84, y: 0 - contextApp.unitpx * 0.32 },
      LB: { x: 0 - contextApp.unitpx * 0.84, y: 0 - contextApp.unitpx * 0.32 },
    },

    plank: [
      { x: contextApp.unitpx * 0.14 * 1.2 * (0 - 3), y: contextApp.unitpx * 0.1, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.24 },
      { x: contextApp.unitpx * 0.14 * 1.2 * (0 - 2), y: contextApp.unitpx * 0.1, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.24 },
      { x: contextApp.unitpx * 0.14 * 1.2 * (0 - 1), y: contextApp.unitpx * 0.1, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.24 },
      { x: contextApp.unitpx * 0.14 * 1.2 * (0 * 0), y: contextApp.unitpx * 0.1, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.24 },
      { x: contextApp.unitpx * 0.14 * 1.2 * (0 + 1), y: contextApp.unitpx * 0.1, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.24 },
      { x: contextApp.unitpx * 0.14 * 1.2 * (0 + 2), y: contextApp.unitpx * 0.1, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.24 },
      { x: contextApp.unitpx * 0.14 * 1.2 * (0 + 3), y: contextApp.unitpx * 0.1, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.24 },
    ],

    wire: [
      { w: contextApp.unitpx * 0.001 },
      { w: contextApp.unitpx * 0.001 },
      { w: contextApp.unitpx * 0.001 },
      { w: contextApp.unitpx * 0.001 },
      { w: contextApp.unitpx * 0.001 },
      { w: contextApp.unitpx * 0.001 },
      { w: contextApp.unitpx * 0.001 },
    ],

    move: [contextApp.unitpx * 0.01]
  }

  const animationCountLocation = ReactExtensions.useAnimationCountWithObject({ object: location, play: true, defaultRate: n => n / 12, postprocess: n => Number(n.toFixed(4)) })

  const ComponentCorner = React.useMemo(() => {
    return <ReactCanvas2dExtensions.Path fill fillStyle='rgb(25, 25, 25)' shadowColor='rgb(25, 25, 25)' shadowBlur={animationCountLocation.style.shadowBlur[0].animationCountProcessed} container closePath globalAlpha={animationCountAppear}>
      <path moveTo>
        <path x={animationCountLocation.corner.LT.x.animationCountProcessed} y={animationCountLocation.corner.LT.y.animationCountProcessed} />
      </path>
      <path lineTo>
        <path x={animationCountLocation.corner.RT.x.animationCountProcessed} y={animationCountLocation.corner.RT.y.animationCountProcessed} />
      </path>
      <path lineTo>
        <path x={animationCountLocation.corner.RB.x.animationCountProcessed} y={animationCountLocation.corner.RB.y.animationCountProcessed} />
      </path>
      <path lineTo>
        <path x={animationCountLocation.corner.LB.x.animationCountProcessed} y={animationCountLocation.corner.LB.y.animationCountProcessed} />
      </path>
    </ReactCanvas2dExtensions.Path>
  })

  const ComponentCornerShelf = React.useMemo(() => {
    return <ReactCanvas2dExtensions.Path fill fillStyle='rgb(45, 45, 45)' shadowColor='rgb(45, 45, 45)' shadowBlur={animationCountLocation.style.shadowBlur[0].animationCountProcessed} container closePath globalAlpha={animationCountAppear}>
      <path moveTo>
        <path x={animationCountLocation.corner.LT.x.animationCountProcessed} y={animationCountLocation.corner.LT.y.animationCountProcessed} />
      </path>
      <path lineTo>
        <path x={animationCountLocation.corner.RT.x.animationCountProcessed} y={animationCountLocation.corner.RT.y.animationCountProcessed} />
      </path>
      <path lineTo>
        <path x={animationCountLocation.shelf.RB.x.animationCountProcessed} y={animationCountLocation.shelf.RB.y.animationCountProcessed} />
      </path>
      <path lineTo>
        <path x={animationCountLocation.shelf.LB.x.animationCountProcessed} y={animationCountLocation.shelf.LB.y.animationCountProcessed} />
      </path>
    </ReactCanvas2dExtensions.Path>
  })

  const ComponentShelf = React.useMemo(() => {
    return <ReactCanvas2dExtensions.Path fill fillStyle='rgb(25, 25, 25)' shadowColor='rgb(25, 25, 25)' shadowBlur={animationCountLocation.style.shadowBlur[0].animationCountProcessed} container closePath globalAlpha={animationCountAppear}>
      <path moveTo>
        <path x={animationCountLocation.shelf.LT.x.animationCountProcessed} y={animationCountLocation.shelf.LT.y.animationCountProcessed} />
      </path>
      <path lineTo>
        <path x={animationCountLocation.shelf.RT.x.animationCountProcessed} y={animationCountLocation.shelf.RT.y.animationCountProcessed} />
      </path>
      <path lineTo>
        <path x={animationCountLocation.shelf.RB.x.animationCountProcessed} y={animationCountLocation.shelf.RB.y.animationCountProcessed} />
      </path>
      <path lineTo>
        <path x={animationCountLocation.shelf.LB.x.animationCountProcessed} y={animationCountLocation.shelf.LB.y.animationCountProcessed} />
      </path>
    </ReactCanvas2dExtensions.Path>
  })

  const ComponentPlank = React.useMemo(() => {
    return new Array(7).fill().map((i, index) => {
      const onPointerDown = (e) => {
        e.stopPropagation()

        if (index === 0) new Audio(contextApp.audioM4aPianoC1.src).play()
        if (index === 1) new Audio(contextApp.audioM4aPianoC2.src).play()
        if (index === 2) new Audio(contextApp.audioM4aPianoC3.src).play()
        if (index === 3) new Audio(contextApp.audioM4aPianoC4.src).play()
        if (index === 4) new Audio(contextApp.audioM4aPianoC5.src).play()
        if (index === 5) new Audio(contextApp.audioM4aPianoC6.src).play()
        if (index === 6) new Audio(contextApp.audioM4aPianoC7.src).play()

        contextPlayground.setAnimation(i => [...i, { key: Math.random(), ComponentAnimation: ComponentInWarTouchEffect, zIndex: contextPlayground.zIndex.WeaponAnimationLow, index }])

        setAnimationTouchWave(i => [...i, { key: Math.random(), ComponentAnimation: ComponentInWarTouchWave, x: animationCountLocation.plank[index].x.animationCountProcessed, y: animationCountLocation.plank[index].y.animationCountProcessed }])

        Object.values(animationCountLocation.plank).forEach((i, nindex) => {
          if (nindex !== index) {
            animationCountLocation.plank[nindex].x.setAnimationCount(i => i + animationCountLocation.plank[nindex].w.animationCountProcessed * 0.04 * (nindex - index))
            animationCountLocation.plank[nindex].x.resetRate()
          }
        })

        animationCountLocation.plank[index].w.setAnimationCount(i => i - animationCountLocation.plank[index].w.animationCountProcessed * 0.08)
        animationCountLocation.plank[index].h.setAnimationCount(i => i - animationCountLocation.plank[index].h.animationCountProcessed * 0.08)
        animationCountLocation.plank[index].textOffsetY.setAnimationCount(i => i - animationCountLocation.plank[index].h.animationCountProcessed * 0.04)

        animationCountLocation.plank[index].w.resetRate()
        animationCountLocation.plank[index].h.resetRate()
        animationCountLocation.plank[index].textOffsetY.resetRate()

        animationCountLocation.corner.LT.x.setAnimationCount(i => i - location.move[0])
        animationCountLocation.corner.RT.x.setAnimationCount(i => i + location.move[0])
        animationCountLocation.corner.RB.x.setAnimationCount(i => i + location.move[0])
        animationCountLocation.corner.LB.x.setAnimationCount(i => i - location.move[0])
        animationCountLocation.corner.LT.y.setAnimationCount(i => i - location.move[0])
        animationCountLocation.corner.RT.y.setAnimationCount(i => i - location.move[0])
        animationCountLocation.corner.RB.y.setAnimationCount(i => i + location.move[0])
        animationCountLocation.corner.LB.y.setAnimationCount(i => i + location.move[0])

        animationCountLocation.corner.LT.x.resetRate()
        animationCountLocation.corner.RT.x.resetRate()
        animationCountLocation.corner.RB.x.resetRate()
        animationCountLocation.corner.LB.x.resetRate()
        animationCountLocation.corner.LT.y.resetRate()
        animationCountLocation.corner.RT.y.resetRate()
        animationCountLocation.corner.RB.y.resetRate()
        animationCountLocation.corner.LB.y.resetRate()

        animationCountLocation.shelf.LT.x.setAnimationCount(i => i - location.move[0])
        animationCountLocation.shelf.RT.x.setAnimationCount(i => i + location.move[0])
        animationCountLocation.shelf.RB.x.setAnimationCount(i => i + location.move[0])
        animationCountLocation.shelf.LB.x.setAnimationCount(i => i - location.move[0])
        animationCountLocation.shelf.LT.y.setAnimationCount(i => i - location.move[0])
        animationCountLocation.shelf.RT.y.setAnimationCount(i => i - location.move[0])
        animationCountLocation.shelf.RB.y.setAnimationCount(i => i - location.move[0])
        animationCountLocation.shelf.LB.y.setAnimationCount(i => i - location.move[0])

        animationCountLocation.shelf.LT.x.resetRate()
        animationCountLocation.shelf.RT.x.resetRate()
        animationCountLocation.shelf.RB.x.resetRate()
        animationCountLocation.shelf.LB.x.resetRate()
        animationCountLocation.shelf.LT.y.resetRate()
        animationCountLocation.shelf.RT.y.resetRate()
        animationCountLocation.shelf.RB.y.resetRate()
        animationCountLocation.shelf.LB.y.resetRate()
      }

      var text

      if (index === 0) text = 'Do'
      if (index === 1) text = 'Re'
      if (index === 2) text = 'Mi'
      if (index === 3) text = 'Fa'
      if (index === 4) text = 'So'
      if (index === 5) text = 'La'
      if (index === 6) text = 'Si'

      return <layout x={animationCountLocation.plank[index].x.animationCountProcessed} y={animationCountLocation.plank[index].y.animationCountProcessed} w={animationCountLocation.plank[index].w.animationCountProcessed} h={animationCountLocation.plank[index].h.animationCountProcessed}>
        <rectradiusarc fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' radius={animationCountLocation.plank[index].radius.animationCountProcessed} shadowBlur={animationCountLocation.style.shadowBlur[0].animationCountProcessed} onPointerDown={onPointerDown} />
        <ReactCanvas2dExtensions.Text text={text} font={`bolder ${contextApp.unitpx * 0.032}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return <text y={animationCountLocation.plank[index].textOffsetY.animationCountProcessed} w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
            }
          }
        </ReactCanvas2dExtensions.Text>
      </layout>
    })
  })

  const ComponentWire = React.useMemo(() => {
    return new Array(7).fill().map((i, index) => {
      const rate = index / 6

      const shelfW = (animationCountLocation.shelf.RB.x.animationCountProcessed - animationCountLocation.shelf.LB.x.animationCountProcessed)
      const shelfH = (animationCountLocation.shelf.RB.y.animationCountProcessed - animationCountLocation.shelf.LB.y.animationCountProcessed)

      const x = animationCountLocation.shelf.LB.x.animationCountProcessed + shelfW * 0.1 + shelfW * 0.8 * rate
      const y = animationCountLocation.shelf.LB.y.animationCountProcessed + shelfH * rate

      return <ReactCanvas2dExtensions.Path fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' shadowBlur={animationCountLocation.style.shadowBlur[0].animationCountProcessed} container closePath>
        <path moveTo>
          <path x={x - animationCountLocation.wire[index].w.animationCountProcessed} y={y} />
        </path>
        <path lineTo>
          <path x={x + animationCountLocation.wire[index].w.animationCountProcessed} y={y} />
        </path>
        <path lineTo>
          <path x={animationCountLocation.plank[index].x.animationCountProcessed} y={animationCountLocation.plank[index].y.animationCountProcessed - animationCountLocation.plank[index].h.animationCountProcessed / 2} />
        </path>
      </ReactCanvas2dExtensions.Path>
    })
  })

  const ComponentAnimationTouchWave = React.useMemo(() => {
    return animationTouchWave.map(i => <ComponentInWarTouchWave z={1} key={i.key} animation={i} onDestory={() => setAnimationTouchWave(n => n.filter(v => v !== i))} />)
  })

  const Component =
    <layout y={animationCountLocation.container.y.animationCountProcessed} globalAlpha={animationCountAppear}>

      {
        ComponentCorner
      }

      {
        ComponentCornerShelf
      }

      {
        ComponentShelf
      }

      {
        ComponentPlank
      }

      {
        ComponentWire
      }

      {
        ComponentAnimationTouchWave
      }

    </layout>

  return Component
}

const init = (props) => {
  return {
    ComponentInWar: ComponentInWar,
  }
}

export default { weaponIndex: 'Weapon0001', init }