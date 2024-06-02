import ReactAnimation from './ReactAnimation'
import ReactAnimationPlugin from './ReactAnimation.Plugin'

import ExampleI from './View.Example.I'
import ExampleII from './View.Example.II'

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

  new Array(props.repeat).fill().forEach((i, index) => {
    if (index === 0) {
      ReactAnimation.component(Rect)({ position: Position.centered({ x: props.position.x, y: props.position.y, w: props.length, h: 1 }), globalAlpha: 0.6 })
      ReactAnimation.component(Rect)({ position: Position.centered({ x: props.position.x, y: props.position.y, w: 1, h: props.length }), globalAlpha: 0.6 })
    }

    if (index !== 0) {
      ReactAnimation.component(Rect)({ position: Position.centered({ x: props.position.x, y: props.position.y + props.gap * index, w: props.length, h: 1 }), globalAlpha: 0.2 })
      ReactAnimation.component(Rect)({ position: Position.centered({ x: props.position.x, y: props.position.y - props.gap * index, w: props.length, h: 1 }), globalAlpha: 0.2 })
      ReactAnimation.component(Rect)({ position: Position.centered({ x: props.position.x + props.gap * index, y: props.position.y, w: 1, h: props.length }), globalAlpha: 0.2 })
      ReactAnimation.component(Rect)({ position: Position.centered({ x: props.position.x - props.gap * index, y: props.position.y, w: 1, h: props.length }), globalAlpha: 0.2 })
    }
  })

  context.context.restore()
}

export default App