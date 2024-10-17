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

  const { animationCountProcessed: animationCountAppear } = ReactExtensions.useAnimationCount({ play: true, defaultCount: 0, destination: 1, rate: 1 / 4, postprocess: n => Number(n.toFixed(4)) })
  const { animationCountProcessed: animationCountWait } = ReactExtensions.useAnimationCount({ play: animationCountAppear === 1, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCountProcessed: animationCountDisappear } = ReactExtensions.useAnimationCount({ play: animationCountWait === 1, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

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
    <rect onLocationMounted={dom => collisionsDom.current = dom}/>
    <rect fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' radius={contextApp.unitpx * 0.04} shadowBlur={contextApp.unitpx * 0.04} />
  </layout>

  return Component
}

function ComponentInWar(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const weapon = props.weapon
  const onDestory = props.onDestory

  const inWar = contextPlayground.weaponInWar.includes(weapon)

  const [loadAppear, setLoadAppear] = React.useState(false)

  const { animationCountProcessed: animationCountAppear } = ReactExtensions.useAnimationCount({ play: inWar === true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCountProcessed: animationCountDisappear } = ReactExtensions.useAnimationCount({ play: inWar !== true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (inWar === false && animationCountAppear === 0) {
      onDestory()
    }
  }, [inWar, animationCountAppear])

  const location = 
    {
      container: { y: contextApp.locationLayout.h / 2 - contextApp.unitpx * 0.32 },

        cornerLT: { x: 0 - contextApp.unitpx * 0.72, y: 0 - contextApp.unitpx * 0.24 },
        cornerRT: { x: 0 + contextApp.unitpx * 0.72, y: 0 - contextApp.unitpx * 0.24 },
        cornerRB: { x: 0 + contextApp.unitpx * 0.72, y: 0 + contextApp.unitpx * 0.24 },
        cornerLB: { x: 0 - contextApp.unitpx * 0.72, y: 0 + contextApp.unitpx * 0.24 },
    
        shelfLT: { x: 0 - contextApp.unitpx * 0.84, y: 0 - contextApp.unitpx * 0.48 },
        shelfRT: { x: 0 + contextApp.unitpx * 0.84, y: 0 - contextApp.unitpx * 0.48 },
        shelfRB: { x: 0 + contextApp.unitpx * 0.84, y: 0 - contextApp.unitpx * 0.32 },
        shelfLB: { x: 0 - contextApp.unitpx * 0.84, y: 0 - contextApp.unitpx * 0.32 },

        plank: [
          { x: contextApp.unitpx * 0.14 * 1.2 * (0 - 3), y: contextApp.unitpx * 0.1, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, shadowBlur: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.24 },
          { x: contextApp.unitpx * 0.14 * 1.2 * (0 - 2), y: contextApp.unitpx * 0.1, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, shadowBlur: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.24 },
          { x: contextApp.unitpx * 0.14 * 1.2 * (0 - 1), y: contextApp.unitpx * 0.1, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, shadowBlur: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.24 },
          { x: contextApp.unitpx * 0.14 * 1.2 * (0 * 0), y: contextApp.unitpx * 0.1, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, shadowBlur: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.24 },
          { x: contextApp.unitpx * 0.14 * 1.2 * (0 + 1), y: contextApp.unitpx * 0.1, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, shadowBlur: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.24 },
          { x: contextApp.unitpx * 0.14 * 1.2 * (0 + 2), y: contextApp.unitpx * 0.1, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, shadowBlur: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.24 },
          { x: contextApp.unitpx * 0.14 * 1.2 * (0 + 3), y: contextApp.unitpx * 0.1, w: contextApp.unitpx * 0.14, h: contextApp.unitpx * 0.36, radius: contextApp.unitpx * 0.02, shadowBlur: contextApp.unitpx * 0.02, textOffsetY: 0 - contextApp.unitpx * 0.24 },
        ],
    
        wire: { shadowBlur: contextApp.unitpx * 0.02, width: contextApp.unitpx * 0.001 },

        change: { corner: contextApp.unitpx * 0.04, shelf: contextApp.unitpx * 0.04 }
    }

  const animationCountLocation = ReactExtensions.useAnimationCountWithObject({ object: location, play: true, rateTime: n => n / 12, postprocess: n => Number(n.toFixed(4)) })

  const Component =
    <layout y={animationCountLocation.container.y} globalAlpha={animationCountAppear}>

      <path fill fillStyle='rgb(25, 25, 25)' container closePath>
        <path moveTo>
          <path x={animationCountLocation.cornerLT.x.animationCountProcessedProcessedProcessed} y={animationCountLocation.cornerLT.y.animationCountProcessedProcessedProcessed} />
        </path>
        <path lineTo>
          <path x={animationCountLocation.cornerRT.x.animationCountProcessedProcessedProcessed} y={animationCountLocation.cornerRT.y.animationCountProcessedProcessedProcessed} />
        </path>
        <path lineTo>
          <path x={animationCountLocation.cornerRB.x.animationCountProcessedProcessedProcessed} y={animationCountLocation.cornerRB.y.animationCountProcessedProcessedProcessed} />
        </path>
        <path lineTo>
          <path x={animationCountLocation.cornerLB.x.animationCountProcessedProcessedProcessed} y={animationCountLocation.cornerLB.y.animationCountProcessedProcessedProcessed} />
        </path>
      </path>

      <path fill fillStyle='rgb(45, 45, 45)' container closePath>
        <path moveTo>
          <path x={animationCountLocation.cornerLT.x.animationCountProcessedProcessedProcessed} y={animationCountLocation.cornerLT.y.animationCountProcessedProcessedProcessed} />
        </path>
        <path lineTo>
          <path x={animationCountLocation.cornerRT.x.animationCountProcessedProcessedProcessed} y={animationCountLocation.cornerRT.y.animationCountProcessedProcessedProcessed} />
        </path>
        <path lineTo>
          <path x={animationCountLocation.shelfRB.x.animationCountProcessedProcessedProcessed} y={animationCountLocation.shelfRB.y.animationCountProcessedProcessedProcessed} />
        </path>
        <path lineTo>
          <path x={animationCountLocation.shelfLB.x.animationCountProcessedProcessedProcessed} y={animationCountLocation.shelfLB.y.animationCountProcessedProcessedProcessed} />
        </path>
      </path>

      <path fill fillStyle='rgb(15, 15, 15)' container closePath>
        <path moveTo>
          <path x={animationCountLocation.shelfLT.x.animationCountProcessedProcessedProcessed} y={animationCountLocation.shelfLT.y.animationCountProcessedProcessedProcessed} />
        </path>
        <path lineTo>
          <path x={animationCountLocation.shelfRT.x.animationCountProcessedProcessedProcessed} y={animationCountLocation.shelfRT.y.animationCountProcessedProcessedProcessed} />
        </path>
        <path lineTo>
          <path x={animationCountLocation.shelfRB.x.animationCountProcessedProcessedProcessed} y={animationCountLocation.shelfRB.y.animationCountProcessedProcessedProcessed} />
        </path>
        <path lineTo>
          <path x={animationCountLocation.shelfLB.x.animationCountProcessedProcessedProcessed} y={animationCountLocation.shelfLB.y.animationCountProcessedProcessedProcessed} />
        </path>
      </path>

      {
        new Array(7).fill().map((i, index) => {
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

            Object.values(animationCountLocation.plank).forEach((i, nindex) => {
              if (nindex !== index) {
                animationCountLocation.plank[nindex].x.setAnimationCount(i => i + animationCountLocation.plank[nindex].w.animationCountProcessedProcessedProcessed * 0.04 * (nindex - index))
                animationCountLocation.plank[nindex].x.setReset()
              }
            })

            animationCountLocation.plank[index].w.setAnimationCount(i => i - animationCountLocation.plank[index].w.animationCountProcessedProcessedProcessed * 0.08)
            animationCountLocation.plank[index].h.setAnimationCount(i => i - animationCountLocation.plank[index].h.animationCountProcessedProcessedProcessed * 0.08)

            animationCountLocation.cornerLT.x.setAnimationCount(i => i + (Math.random() - 0.5) * location.change.corner)
            animationCountLocation.cornerRT.x.setAnimationCount(i => i + (Math.random() - 0.5) * location.change.corner)
            animationCountLocation.cornerRB.x.setAnimationCount(i => i + (Math.random() - 0.5) * location.change.corner)
            animationCountLocation.cornerLB.x.setAnimationCount(i => i + (Math.random() - 0.5) * location.change.corner)
            animationCountLocation.cornerLT.y.setAnimationCount(i => i + (Math.random() - 0.5) * location.change.corner)
            animationCountLocation.cornerRT.y.setAnimationCount(i => i + (Math.random() - 0.5) * location.change.corner)
            animationCountLocation.cornerRB.y.setAnimationCount(i => i + (Math.random() - 0.5) * location.change.corner)
            animationCountLocation.cornerLB.y.setAnimationCount(i => i + (Math.random() - 0.5) * location.change.corner)

            animationCountLocation.shelfLT.x.setAnimationCount(i => i + (Math.random() - 0.5) * location.change.shelf)
            animationCountLocation.shelfRT.x.setAnimationCount(i => i + (Math.random() - 0.5) * location.change.shelf)
            animationCountLocation.shelfRB.x.setAnimationCount(i => i + (Math.random() - 0.5) * location.change.shelf)
            animationCountLocation.shelfLB.x.setAnimationCount(i => i + (Math.random() - 0.5) * location.change.shelf)
            animationCountLocation.shelfLT.y.setAnimationCount(i => i + (Math.random() - 0.5) * location.change.shelf)
            animationCountLocation.shelfRT.y.setAnimationCount(i => i + (Math.random() - 0.5) * location.change.shelf)
            animationCountLocation.shelfRB.y.setAnimationCount(i => i + (Math.random() - 0.5) * location.change.shelf)
            animationCountLocation.shelfLB.y.setAnimationCount(i => i + (Math.random() - 0.5) * location.change.shelf)

            animationCountLocation.plank[index].w.setReset()
            animationCountLocation.plank[index].h.setReset()

            animationCountLocation.cornerLT.x.setReset()
            animationCountLocation.cornerLT.y.setReset()
            animationCountLocation.cornerRT.x.setReset()
            animationCountLocation.cornerRT.y.setReset()
            animationCountLocation.cornerRB.x.setReset()
            animationCountLocation.cornerRB.y.setReset()
            animationCountLocation.cornerLB.x.setReset()
            animationCountLocation.cornerLB.y.setReset()

            animationCountLocation.shelfLT.x.setReset()
            animationCountLocation.shelfLT.y.setReset()
            animationCountLocation.shelfRT.x.setReset()
            animationCountLocation.shelfRT.y.setReset()
            animationCountLocation.shelfRB.x.setReset()
            animationCountLocation.shelfRB.y.setReset()
            animationCountLocation.shelfLB.x.setReset()
            animationCountLocation.shelfLB.y.setReset()
          }

          var text

          if (index === 0) text = 'Do'
          if (index === 1) text = 'Re'
          if (index === 2) text = 'Mi'
          if (index === 3) text = 'Fa'
          if (index === 4) text = 'So'
          if (index === 5) text = 'La'
          if (index === 6) text = 'Si'

          return <layout x={animationCountLocation.plank[index].x.animationCountProcessedProcessedProcessed} y={animationCountLocation.plank[index].y.animationCountProcessedProcessedProcessed} w={animationCountLocation.plank[index].w.animationCountProcessedProcessedProcessed} h={animationCountLocation.plank[index].h.animationCountProcessedProcessedProcessed}>
            <rectradiusarc fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' radius={animationCountLocation.plank[index].radius.animationCountProcessedProcessedProcessed} shadowBlur={animationCountLocation.plank[index].shadowBlur.animationCountProcessedProcessedProcessed} onPointerDown={onPointerDown} />
            <ReactCanvas2dExtensions.Text text={text} font={`bolder ${contextApp.unitpx * 0.032}px sans-serif`} w={Infinity}>
              {
                (line, location) => {
                  return <text y={animationCountLocation.plank[index].textOffsetY.animationCountProcessedProcessedProcessed} w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
                }
              }
            </ReactCanvas2dExtensions.Text>
          </layout>
        })
      }

      {
        new Array(7).fill().map((i, index) => {
          const rate = index / 6

          const shelfW = (animationCountLocation.shelfRB.x.animationCountProcessedProcessedProcessed - animationCountLocation.shelfLB.x.animationCountProcessedProcessedProcessed)
          const shelfH = (animationCountLocation.shelfRB.y.animationCountProcessedProcessedProcessed - animationCountLocation.shelfLB.y.animationCountProcessedProcessedProcessed)

          const x = animationCountLocation.shelfLB.x.animationCountProcessedProcessedProcessed + shelfW * 0.1 + shelfW * 0.8 * rate
          const y = animationCountLocation.shelfLB.y.animationCountProcessedProcessedProcessed + shelfH * rate

          return <path fill fillStyle='rgb(255, 255, 255)' shadowColor='rgb(255, 255, 255)' shadowBlur={animationCountLocation.wire.width.shadowBlur} container closePath>
            <path moveTo>
              <path x={x - animationCountLocation.wire.width.animationCountProcessedProcessedProcessed} y={y} />
            </path>
            <path lineTo>
              <path x={x + animationCountLocation.wire.width.animationCountProcessedProcessedProcessed} y={y} />
            </path>
            <path lineTo>
              <path x={animationCountLocation.plank[index].x.animationCountProcessedProcessedProcessed} y={animationCountLocation.plank[index].y.animationCountProcessedProcessedProcessed - animationCountLocation.plank[index].h.animationCountProcessedProcessedProcessed / 2} />
            </path>
          </path>
        })
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