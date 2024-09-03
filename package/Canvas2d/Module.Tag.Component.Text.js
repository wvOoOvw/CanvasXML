const App = {
  onRenderMounted: (dom) => {
    const px = Number(dom.context.font.match(/[\d\.]+px/)[0].replace('px', ''))

    var text = dom.props.text
    var x = dom.props.x
    var y = dom.props.y + px * 0.82

    if (Boolean(dom.props.fillText) === true) dom.context.fillText(text, x, y)
    if (Boolean(dom.props.strokeText) === true) dom.context.strokeText(text, x, y)
  },
}

export default App