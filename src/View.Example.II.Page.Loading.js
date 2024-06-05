import ReactAnimation from './ReactAnimation'
import ReactAnimationPlugin from './ReactAnimation.Plugin'

import Layout from './Utils.Layout'
import Caculate from './Utils.Caculate'
import Position from './Utils.Position'
import Draw from './Utils.Draw'

function Arc(props) {
  const context = ReactAnimation.useContext()

  context.context.save()

  Draw.drawArc(context.context, props.position, props.radius, 0, Math.PI * 2, false)
  context.context.fillStyle = 'rgba(255, 255, 255, 1)'
  context.context.fill()

  context.context.restore()
}

function App() {
  const context = ReactAnimation.useContext()

  const coordinate = context.coordinateFlow.getState()

  const { animationCount } = ReactAnimationPlugin.useAnimationCount({ count: 0, flow: 0, delay: 0, min: 0, max: Infinity, rate: 1 / 15, play: true, reverse: true })

  context.context.save()

  context.context.globalAlpha = Caculate.range(Caculate.number(context.pageAnimationCount, 2), 0, 1)

  // const layout = Layout.composecross(Position.centered(coordinate), new Array(3).fill({ w: vmin * 12, h: vmin * 12 }), [Layout.horizontalcenter, Layout.verticalcenter]).result

  new Array(3).fill().forEach((i, index) => ReactAnimation.component(Arc)({ position: { x: coordinate.cx + coordinate.vmin * 12 * (index - 1), y: coordinate.cy }, radius: coordinate.vmin * 4 + Math.cos(animationCount + Math.PI / 2 * (index - 1)) * coordinate.vmin * 0.4 }))

  context.context.restore()
}

export default App
