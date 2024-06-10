import { Caculate, Draw, Layout, Position, PositionBatch, PositionCover, React, ReactPlugin } from '../package/index'

React.createElement = Layout.layoutReactBabelCreateElement

function Arc(props) {
  const context = React.useContext()

  context.context.save()

  const coordinate = Position.coordinate(props.position)

  Draw.drawArc(context.context, { x: coordinate.cx, y: coordinate.cy }, props.radius, 0, Math.PI * 2, false)
  context.context.fillStyle = 'rgba(255, 255, 255, 1)'
  context.context.fill()

  context.context.restore()
}

const ArcComponent = React.component(Arc)

function App() {
  const context = React.useContext()

  const coordinate = context.coordinate

  const { animationCount } = ReactPlugin.useAnimationCount({ count: 0, flow: 0, delay: 0, min: 0, max: Infinity, rate: 1 / 15, play: true, reverse: true })

  context.context.save()

  context.context.globalAlpha = Caculate.range(Caculate.number(context.pageAnimationCount, 2), 0, 1)

  Layout.layout(
    <layout position={coordinate} layoutProcess={[Layout.horizontalCenter, Layout.verticalAlignCenter, Layout.layoutProcessCoordinate]}>
      {
        new Array(3).fill().map((i, index) => {
          return <layout position={(layoutPosition) => ({ w: layoutPosition.vmin * 16, h: layoutPosition.h })} layoutProcess={[Layout.horizontalCenter, Layout.verticalCenter]}>
            {
              (layoutPosition) => {
                return <ArcComponent position={(layoutPosition) => layoutPosition} radius={layoutPosition.vmin * 28 + Math.cos(animationCount + Math.PI / 2 * (index - 1)) * layoutPosition.vmin * 4} />
              }
            }
          </layout>
        })
      }
    </layout>
  )

  context.context.restore()
}

export default App
