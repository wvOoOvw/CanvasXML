import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import { Graph } from '../../package/Canvas2d'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'


function RoleCard(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const role = props.role
  const index = props.index

  const color = 'rgb(75, 75, 75)'

  const lengthMax = 12
  const lengthGameCard = contextPlayground.gameCard.filter(i => i !== contextPlayground.gameCardControl).length

  const rotateAngleUnit = (lengthMax - lengthGameCard + 1) * 0.002 + 0.01
  const rotateAngle = Math.PI * rotateAngleUnit * (index - (lengthGameCard - 1) / 2)
  const rotateTranslateX = contextApp.locationLayout.x + contextApp.locationLayout.w / 2
  const rotateTranslateY = contextApp.locationLayout.y + contextApp.locationLayout.h + contextApp.unitpx * 3.2

  const w = contextApp.unitpx * 0.32
  const h = contextApp.unitpx * 0.48
  const x = contextApp.locationLayout.x + contextApp.locationLayout.w / 2 - w / 2
  const y = contextApp.locationLayout.y + contextApp.locationLayout.h - h - contextApp.unitpx * 0.12

  const shouldRender = React.useShouldRender()

  const [moveIng, setMoveIng] = React.useState(false)
  const [moveX, setMoveX] = React.useState(0)
  const [moveY, setMoveY] = React.useState(0)

  const rotateAngleUnitCache = React.useRef([undefined, undefined])

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountRotateAngle } = ReactExtensions.useAnimationDestination({ play: Boolean(rotateAngleUnitCache.current[0] !== undefined && rotateAngleUnitCache.current[1] !== undefined), defaultCount: rotateAngle, destination: rotateAngle, rate: Math.abs(rotateAngleUnitCache.current[1] - rotateAngleUnitCache.current[0]) / 10, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountMoveIng } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: moveIng ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountControlIng } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: contextPlayground.gameCardControl ? 1 : 0, rate: 1 / 10, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountMoveX } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: moveX, destination: moveX, rate: contextApp.unitpx * 0.04, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountMoveY } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: moveY, destination: moveY, rate: contextApp.unitpx * 0.04, postprocess: n => Number(n.toFixed(4)) })

  React.useEffectImmediate(() => {
    rotateAngleUnitCache.current = [animationCountRotateAngle, rotateAngle]
    shouldRender()
  }, [rotateAngle])

  const onChange = (params) => {
    const { status, e, x, y, changedX, changedY, continuedX, continuedY } = params

    if (status === 'afterStart') {
      setMoveIng(true)
      contextPlayground.setGameCardDrag(role)
    }

    if (status === 'afterMove' && moveIng) {
      if (Math.abs(moveX) < contextApp.unitpx * 0.12 && moveY > contextApp.unitpx * 0.12 * -1) {
        setMoveX(i => i + changedX)
        setMoveY(i => i + changedY)
        setMoveY(i => Math.min(i, 0))
      }

      if (Math.abs(moveX) >= contextApp.unitpx * 0.12 || moveY <= contextApp.unitpx * 0.12 * -1) {
        contextPlayground.setGameCardDrag()
        contextPlayground.setGameCardControl(role)
      }
    }

    if (status === 'afterEnd') {
      setMoveIng(false)
      setMoveX(0)
      setMoveY(0)
      contextPlayground.setGameCardDrag()
    }
  }

  const { onStart, onMove, onEnd } = ReactCanvas2dExtensions.useEventDragControl({ enable: true, onChange: onChange })

  const onPointerDown = e => {
    if (Graph.intersectionPointPolygon(e, Graph.conversionRectPoint({ x, y, w, h }).map(i => Graph.rotatePoint(i, { x: rotateTranslateX, y: rotateTranslateY }, rotateAngle)))) {
      onStart(e)
      e.stopPropagation()
    }
  }

  const onRotateLocationMounted = (dom) => {
    dom.props.translateX = rotateTranslateX
    dom.props.translateY = rotateTranslateY
  }

  const appearY = (1 - animationCountAppear) * y * 0.25 * -1

  return <layout zIndex={contextPlayground.zIndex.CardPanel}>
    <ReactCanvas2dExtensions.Rotate rotateAngle={animationCountRotateAngle} onLocationMounted={onRotateLocationMounted}>
      <rectradius x={x + animationCountMoveX} y={y + animationCountMoveY + appearY} w={w} h={h}>
        <rectradius fill fillStyle={color} radius={contextApp.unitpx * 0.02} />
        <rectradius cx='50%' cy='50%' w={w - contextApp.unitpx * 0.04} h={h - contextApp.unitpx * 0.04} clip radius={contextApp.unitpx * 0.02}>
          <image cx='50%' cy='50%' src={contextApp[role.imageIndex]} clipHorizontalCenter clipVerticalCenter globalAlpha={1 - animationCountMoveIng * 0.2} />
        </rectradius>
        <rect fill fillStyle='black' radius={contextApp.unitpx * 0.02} lineWidth={contextApp.unitpx * 0.04} globalAlpha={animationCountControlIng * 0.35} />
        <layout cx={contextApp.unitpx * 0.08} cy={contextApp.unitpx * 0.08} w={contextApp.unitpx * 0.08} h={contextApp.unitpx * 0.08}>
          <rectradius fill fillStyle={color} radius={contextApp.unitpx * 0.02} />
          <image cx='50%' cy='50%' w='75%' h='75%' src={contextApp.imagePngDigitalTraceWhite} />
        </layout>
        <layout cx='50%' cy={`calc(100% - ${contextApp.unitpx * 0.08}px)`} w={w - contextApp.unitpx * 0.08} h={contextApp.unitpx * 0.08}>
          <rectradius fill fillStyle={color} radius={contextApp.unitpx * 0.02} />
          <ReactCanvas2dExtensions.Text text='莱伊' font={`bolder ${contextApp.unitpx * 0.032}px sans-serif`} w={Infinity}>
            {
              (line, location) => {
                return line.map(i => {
                  return <text cx='50%' cy='50%' w={i.w} h={i.h} fillText fillStyle='white' text={i.text} font={i.font} />
                })
              }
            }
          </ReactCanvas2dExtensions.Text>
        </layout>
      </rectradius>
    </ReactCanvas2dExtensions.Rotate>
    <layout onPointerDown={onPointerDown} onPointerMove={onMove} onPointerUp={onEnd} />
  </layout>
}


function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  return contextPlayground.gameCard.filter(i => i !== contextPlayground.gameCardControl).map((i, index) => <RoleCard key={i.key} role={i} index={index} />)
}


export default App