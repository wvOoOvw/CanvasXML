import ReactAnimation from './ReactAnimation'
import ReactAnimationPlugin from './ReactAnimation.Plugin'

import ExampleI from './View.Example.I'
import ExampleII from './View.Example.II'

import Position from './Utils.Position'
import Draw from './Utils.Draw'

const App = (props) => {
  const context = ReactAnimation.useContext()

  context.context.save()

  Draw.drawRect(context.context, { ...props.position, w: props.size, h: props.size })

  context.context.strokeStyle = 'rgba(255, 255, 255, 1)'
  context.context.stroke()

  context.context.restore()
}

export default App