import Core from './Core'

const App = {
  onRenderMounting: (dom) => {
    const px = Number(Core.context().font.match(/[\d\.]+px/)[0].replace('px', ''))

    var text = dom.props.text
    var x = dom.props.x
    var y = dom.props.y + px * 0.82

    if (Boolean(dom.props.fillText) === true) Core.context().fillText(text, x, y)
    if (Boolean(dom.props.strokeText) === true) Core.context().strokeText(text, x, y)
  },
}

export default App