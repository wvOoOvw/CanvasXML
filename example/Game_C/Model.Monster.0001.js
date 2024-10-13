import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

const monsterIndex = 'Monster0001'

function ComponentInWar(props) {
  const contextApp = props.contextApp
  const contextPlayground = props.contextPlayground

  const monster = props.monster
  const onDestory = props.onDestory

  const [inDestory, setInDestory] = React.useState(false)

  const { animationCount: animationCountDisappear } = ReactExtensions.useAnimationDestination({ play: inDestory, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })

  const ref = React.useRef({ x: contextApp.locationLayout.w * 0.2 + Math.random() * contextApp.locationLayout.w * 0.6, y: 0 })

  React.useEffect(() => {
    if (inDestory === false) ref.current.y = ref.current.y + contextApp.unitpx * 0.01
  })

  React.useEffect(() => {
    if (ref.current.y > contextApp.locationLayout.h) setInDestory(true)
  })

  React.useEffect(() => {
    if (animationCountDisappear === 1) {
      onDestory()
    }
  }, [animationCountDisappear])

  const Component =
    <layout cx={ref.current.x} cy={ref.current.y - animationCountDisappear * contextApp.unitpx * 0.04} w={0} h={0} globalAlpha={1 - animationCountDisappear}>
      <image cx='50%' cy='50%' w={contextApp.unitpx * 0.42} h={contextApp.unitpx * 0.42} src={contextApp.imagePngかに} />
    </layout>

  return Component
}

const init = (props) => {
  return {
    monsterIndex: monsterIndex,

    descriptionNo: '0001',
    descriptionImageIndex: 'imagePngかに',

    ComponentInWar: ComponentInWar,
  }
}

export default { monsterIndex, init }