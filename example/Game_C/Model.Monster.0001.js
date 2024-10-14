import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

function ComponentInWar(props) {
  const contextApp = props.contextApp
  const contextPlayground = props.contextPlayground

  const monster = props.monster
  const onDestory = props.onDestory

  const [inDestory, setInDestory] = React.useState(false)

  const { animationCount: animationCountDisappear } = ReactExtensions.useAnimationDestination({ play: inDestory, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const [x, setX] = React.useState(contextApp.locationLayout.w * 0.2 + Math.random() * contextApp.locationLayout.w * 0.6)
  const [y, setY] = React.useState(0)
  const [w, setW] = React.useState(contextApp.unitpx * 0.42)
  const [h, setH] = React.useState(contextApp.unitpx * 0.42)

  const [hitPointY, setHitPointY] = React.useState(contextApp.unitpx * 0.24)
  const [hitPointW, setHitPointW] = React.useState(contextApp.unitpx * 0.64)
  const [hitPointH, setHitPointH] = React.useState(contextApp.unitpx * 0.02)
  const [hitPointRadius, setHitPointRadius] = React.useState(contextApp.unitpx * 0.004)

  const [attributeHitPoint, setAttributeHitPoint] = React.useState(1000)

  React.useEffect(() => {
    if (inDestory === false) setY(i => i + contextApp.locationLayout.h * 0.004)
  })

  React.useEffect(() => {
    if (y > contextApp.locationLayout.h) setInDestory(true)
  }, [y])

  React.useEffect(() => {
    if (attributeHitPoint < 0) setInDestory(true)
  }, [attributeHitPoint])

  React.useEffect(() => {
    if (animationCountDisappear === 1) {
      onDestory()
    }
  }, [animationCountDisappear])

  monster.ifLive = () => {
    return inDestory === false
  }

  monster.onCollision = () => {
    return { shape: 'rect', x: x - w / 2, y: y - h / 2, w, h }
  }

  monster.onHit = (v) => {
    return setAttributeHitPoint(i => i - v)
  }

  const Component =
    <layout cx={x} cy={y - animationCountDisappear * contextApp.unitpx * 0.04} w={0} h={0} globalAlpha={1 - animationCountDisappear}>
      <image cx='50%' cy='50%' w={w} h={h} src={contextApp.imagePngかに} />
      {/* <rectradiusarc fill cx='50%' cy={hitPointY} w={hitPointW} h={hitPointH} radius={hitPointRadius} fillStyle='rgb(125, 25, 25)' /> */}
    </layout>

  return Component
}

const init = (props) => {
  return {
    ComponentInWar: ComponentInWar,
  }
}

export default { monsterIndex: 'Monster0001', init }