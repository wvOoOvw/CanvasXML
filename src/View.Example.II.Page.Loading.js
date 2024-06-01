import ReactAnimation from './ReactAnimation'
import ReactAnimationPlugin from './ReactAnimation.Plugin'

import { add, center, centered } from './Component.Position'
import { drawImageClipCenter, drawRectRadius, drawArc } from './Component.Draw'

import background from '../static/bg.97101e.jpg'

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

  const { animationCount } = ReactAnimationPlugin.useAnimationCount({ count: 0, flow: 0, delay: 0, min: 0, max: Infinity, rate: 1 / 30, play: true, reverse: true })

  context.context.save()

  context.context.globalAlpha = context.pageAnimationCount
  context.context.globalAlpha = Math.max(context.context.globalAlpha, 0)
  context.context.globalAlpha = Math.min(context.context.globalAlpha, 1)

  ReactAnimation.component(Arc)({ x: -128, y: 0, radius: 32 + Math.cos(animationCount + Math.PI / 4 * 2 * -1) * 8 })
  ReactAnimation.component(Arc)({ x: 0, y: 0, radius: 32 + Math.cos(animationCount + Math.PI / 4 * 1 * -1) * 8 })
  ReactAnimation.component(Arc)({ x: 128, y: 0, radius: 32 + Math.cos(animationCount + Math.PI / 4 * 0) * 8 })

  context.context.restore()
}

export default App
