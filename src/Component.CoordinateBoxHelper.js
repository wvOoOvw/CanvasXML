import ReactAnimation from './ReactAnimation'
import ReactAnimationPlugin from './ReactAnimation.Plugin'

import Position from './Utils.Position'
import Draw from './Utils.Draw'

const Rect = (props) => {
  const context = ReactAnimation.useContext()

  context.context.save()

  Draw.drawRect(context.context, props.position)

  context.context.globalAlpha = props.globalAlpha
  context.context.strokeStyle = 'rgba(255, 255, 255, 1)'
  context.context.stroke()

  context.context.restore()
}

const App = (props) => {
  const context = ReactAnimation.useContext()

  context.context.save()

  ReactAnimation.component(Rect)({ position: props.position, globalAlpha: 0.5 })

  context.context.restore()
}

export default App