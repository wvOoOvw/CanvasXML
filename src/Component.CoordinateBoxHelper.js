import ReactAnimation from './ReactAnimation'
import ReactAnimationPlugin from './ReactAnimation.Plugin'

import Position from './Utils.Position'
import Draw from './Utils.Draw'
import Caculate from './Utils.Caculate'

const App = (props) => {
  const context = ReactAnimation.useContext()

  const color = ReactAnimation.useRef(`rgba(${Caculate.random(255, 0, 0)}, ${Caculate.random(255, 0, 0)}, ${Caculate.random(255, 0, 0)}, 1)`)

  context.context.save()

  Draw.drawRect(context.context, props.position)

  context.context.globalAlpha = 0.5
  context.context.fillStyle = color.current
  context.context.fill()

  context.context.restore()
}

export default App