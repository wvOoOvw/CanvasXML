import ReactAnimation from './ReactAnimation'
import ReactAnimationPlugin from './ReactAnimation.Plugin'

import { number, range } from './Component.Math'
import { centered } from './Component.Position'
import { drawArc } from './Component.Draw'

const Arc = (props) => {
  const context = ReactAnimation.useContext()

  const radius = props.radius

  const position = centered({ x: context.coordinate.getCoordinatet().x + props.x, y: context.coordinate.getCoordinatet().y + props.y })

  context.context.save()

  drawArc(context.context, position, radius, 0, Math.PI * 2, false)

  context.context.fillStyle = 'rgba(255, 255, 255, 1)'
  context.context.fill()

  context.context.restore()
}

const App = () => {
  const context = ReactAnimation.useContext()

  const { animationCount } = ReactAnimationPlugin.useAnimationCount({ count: 0, flow: 0, delay: 0, min: 0, max: Infinity, rate: 1 / 15, play: true, reverse: true })

  context.context.save()

  context.context.globalAlpha = range(number(context.pageAnimationCount, 2), 0, 1)

  ReactAnimation.component(Arc)({ x: context.m * 0.1 * -1, y: 0, radius: context.m * 0.03 + Math.cos(animationCount + Math.PI / 4 * 2 * -1) * context.m * 0.006 })
  ReactAnimation.component(Arc)({ x: 0, y: 0, radius: context.m * 0.03 + Math.cos(animationCount + Math.PI / 4 * 1 * -1) * context.m * 0.006 })
  ReactAnimation.component(Arc)({ x: context.m * 0.1, y: 0, radius: context.m * 0.03 + Math.cos(animationCount + Math.PI / 4 * 0) * context.m * 0.006 })

  context.context.restore()
}

export default App
