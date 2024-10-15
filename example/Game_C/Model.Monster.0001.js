import React from '../../package/React'
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
  const [hitPointW, setHitPointW] = React.useState(contextApp.unitpx * 0.42)
  const [hitPointH, setHitPointH] = React.useState(contextApp.unitpx * 0.012)
  const [hitPointRadius, setHitPointRadius] = React.useState(contextApp.unitpx * 0.002)

  const [attributeHitPoint, setAttributeHitPoint] = React.useState(100)

  const [animationHitPoint, setAnimationHipPoint] = React.useState([])

  const { animationCount: animationCountAttributeHitPoint } =  ReactExtensions.useAnimationDestinationRateTime({ play: true, defaultCount: attributeHitPoint, destination: attributeHitPoint, rateTime: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

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

  Object.assign(
    monster,
    {
      caculateLive: () => {
        return inDestory === false
      },
      caculteCollision: () => {
        return { shape: 'rect', x: x - w / 2, y: y - h / 2, w, h }
      },
      onHit: (point) => {
        setAttributeHitPoint(i => Math.max(i - point, 0))
        setAnimationHipPoint(i => [...i, { key: Math.random(), point }])
      },
    }
  )

  const ComponentAnimationHitPoint = React.useCallback((props) => {
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

    return <layout cx='50%' cy='50%' w={contextApp.unitpx * 0.16} h={contextApp.unitpx * 0.16} globalAlpha={animationCountAppear - animationCountDisappear}>
      <ReactCanvas2dExtensions.Text text={'-' + String(animation.point)} font={`bolder ${contextApp.unitpx * 0.032}px sans-serif`} w={Infinity}>
        {
          (line, location) => {
            return <text cx='50%' cy='50%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
          }
        }
      </ReactCanvas2dExtensions.Text>
    </layout>
  }, [])

  const Component =
    <layout cx={x} cy={y - animationCountDisappear * contextApp.unitpx * 0.04} w={0} h={0} globalAlpha={1 - animationCountDisappear}>
      <image cx='50%' cy='50%' w={w} h={h} src={contextApp.imagePngかに} />
      <rectradiusarc fill cx='50%' cy={hitPointY} w={hitPointW} h={hitPointH} radius={hitPointRadius} fillStyle='rgb(125, 125, 125)' />
      <rectradiusarc fill cx='50%' cy={hitPointY} w={hitPointW * animationCountAttributeHitPoint / attributeHitPoint} h={hitPointH} radius={hitPointRadius} fillStyle='rgb(125, 25, 25)' />
      {
        animationHitPoint.map(i => <ComponentAnimationHitPoint key={i.key} animation={i} onDestory={() => setAnimationHipPoint(i => i.filter(j => j.key !== i.key))} />)
      }
    </layout>

  return Component
}

const init = (props) => {
  return {
    ComponentInWar: ComponentInWar,
  }
}

export default { monsterIndex: 'Monster0001', init }