import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function ComboComponent(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const count = props.count
  const length = props.length
  const onDestory = props.onDestory

  const lengthRef = React.useRef(length)

  const { animationCount: animationCountAppear } = ReactExtensions.useAnimationDestination({ play: true, defaultCount: 0, destination: 1, rate: 1 / 15, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountWait } = ReactExtensions.useAnimationDestination({ play: animationCountAppear === 1, defaultCount: 0, destination: 1, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })
  const { animationCount: animationCountDisappear } = ReactExtensions.useAnimationDestination({ play: animationCountWait === 1, defaultCount: 0, destination: 1, rate: 1 / 15, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    if (animationCountDisappear === 1) {
      onDestory()
    }
  }, [animationCountDisappear])

  const globalAlpha = React.useMemo(() => {
    return animationCountAppear - animationCountDisappear
  }, [animationCountAppear, animationCountDisappear])

  const extraX = React.useMemo(() => {
    return animationCountAppear - animationCountDisappear * 0.35 + (lengthRef.current - 1)
  }, [animationCountAppear, animationCountDisappear])

  const extraY = React.useMemo(() => {
    return animationCountAppear * 0.65 + animationCountDisappear * 0.35 + (lengthRef.current - 1)
  }, [animationCountAppear, animationCountDisappear])

  const x = contextApp.unitpx * 0.08 * extraX
  const y = contextApp.unitpx * 0.08 * extraY
  const w = contextApp.unitpx * 0.24
  const h = contextApp.unitpx * 0.08

  return <layout x={x} y={y} w={w} h={h} globalAlpha={globalAlpha}>
    <ReactCanvas2dExtensions.TextCaculateLine text={'Perfect' + ' ' + String(count)} font={`bold ${contextApp.unitpx * 0.04}px sans-serif`} lineHeight={1} gap={0} w={Infinity}>
      {
        (line, location) => {
          return line.map(i => {
            return <text cx='50%' cy='50%' fillText fillStyle='rgb(255, 255, 255)' w={i.w} h={i.h} text={i.text} font={i.font} />
          })
        }
      }
    </ReactCanvas2dExtensions.TextCaculateLine>
  </layout >
}

function App() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const [comboOpen, setComboOpen] = React.useState(false)
  const [combo, setCombo] = React.useState([])

  React.useEffect(() => {
    if (contextPlayground.gameCombo > 0) {
      setComboOpen(true)
      setCombo(i => [...i, { key: Math.random(), count: contextPlayground.gameCombo }])
    }
  }, [contextPlayground.gameCombo])

  React.useEffect(() => {
    if (comboOpen && combo.length === 0) {
      setComboOpen(false)
      contextPlayground.setGameCombo(0)
    }
  }, [comboOpen, combo])

  return combo.map(i => <ComboComponent {...i} length={combo.length} onDestory={() => setCombo(n => n.filter(v => v !== i))} />)
}

export default App