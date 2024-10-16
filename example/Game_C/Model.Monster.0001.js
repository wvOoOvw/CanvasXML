import React from '../../package/React'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function ComponentInPlaygroundWarAnimationHitPoint (props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)
  
  const animation = props.animation
  const onDestory = props.onDestory

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountWait } = ReactExtensions.useAnimationDestination({ play: animationCountAppear === 1, defaultCount: 0, destination: 1, rate: 1 / 4, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDisappear } = ReactExtensions.useAnimationDestination({ play: animationCountWait === 1, defaultCount: 0, destination: 1, rate: 1 / 24, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (animationCountDisappear === 1) {
      onDestory()
    }
  }, [animationCountDisappear])

  const Component = 
   <layout w={contextApp.unitpx * 0.16} h={contextApp.unitpx * 0.16} globalAlpha={animationCountAppear - animationCountDisappear}>
    <ReactCanvas2dExtensions.Text text={'-' + String(animation.point)} font={`bolder ${contextApp.unitpx * 0.032}px sans-serif`} w={Infinity}>
      {
        (line, location) => {
          return <text w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
        }
      }
    </ReactCanvas2dExtensions.Text>
  </layout>

  return Component
}

function ComponentInPlaygroundWar(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const monster = props.monster
  const onDestory = props.onDestory

  const collisionsDom = React.useRef()

  const [inWar, setInWar] = React.useState(true)
  
  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: inWar, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const [x, setX] = React.useState(contextApp.locationLayout.w * 0.2 + Math.random() * contextApp.locationLayout.w * 0.6)
  const [y, setY] = React.useState(0)
  const [w, setW] = React.useState(contextApp.unitpx * 0.42)
  const [h, setH] = React.useState(contextApp.unitpx * 0.42)

  const [hitPointY, setHitPointY] = React.useState(contextApp.unitpx * 0.24)
  const [hitPointW, setHitPointW] = React.useState(contextApp.unitpx * 0.42)
  const [hitPointH, setHitPointH] = React.useState(contextApp.unitpx * 0.012)
  const [hitPointRadius, setHitPointRadius] = React.useState(contextApp.unitpx * 0.002)

  const [attributeHitPoint, setAttributeHitPoint] = React.useState(100)

  const [animationHitPoint, setAnimationHitPoint] = React.useState([])

  const { animationCount: animationCountAttributeHitPoint } =  ReactExtensions.useAnimationDestinationRateTime({ play: true, defaultCount: attributeHitPoint, destination: attributeHitPoint, rateTime: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (inWar) setY(i => i + contextApp.locationLayout.h * 0.004)
  })

  React.useEffect(() => {
    if (y > contextApp.locationLayout.h) setInWar(false)
  }, [y])

  React.useEffect(() => {
    if (attributeHitPoint < 0) setInWar(false)
  }, [attributeHitPoint])

  React.useEffect(() => {
    if (inWar === false && animationCountAppear === 0) {
      onDestory()
    }
  }, [inWar, animationCountAppear])

  Object.assign(
    monster,
    {
      caculateInWar: () => {
        return inWar === false
      },
      caculteCollisionDom: () => {
        return collisionsDom.current
      },
      onHit: (point) => {
        setAttributeHitPoint(i => Math.max(i - point, 0))
        setAnimationHitPoint(i => [...i, { key: Math.random(), point }])
      },
    }
  )

  const Component =
    <layout x={x} y={y - animationCountAppear * contextApp.unitpx * 0.04} w={w} h={h} globalAlpha={animationCountAppear}>
      <rect onLocationMounted={dom => collisionsDom.current = dom}/>
      <image src={contextApp.imagePngかに} />
      <rectradiusarc fill y={hitPointY} w={hitPointW} h={hitPointH} radius={hitPointRadius} fillStyle='rgb(125, 125, 125)' />
      <rectradiusarc fill y={hitPointY} w={hitPointW * animationCountAttributeHitPoint / attributeHitPoint} h={hitPointH} radius={hitPointRadius} fillStyle='rgb(125, 25, 25)' />
      {
        animationHitPoint.map(i => <ComponentInPlaygroundWarAnimationHitPoint key={i.key} animation={i} onDestory={() => setAnimationHitPoint(i => i.filter(j => j.key !== i.key))} />)
      }
    </layout>

  return Component
}

const init = (props) => {
  return {
    ComponentInPlaygroundWar: ComponentInPlaygroundWar,
  }
}

export default { monsterIndex: 'Monster0001', init }