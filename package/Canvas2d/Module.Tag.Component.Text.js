const App = {
  onConstructMounted: (dom) => {
    dom.props.text = dom.element.props.text
    dom.props.fillText = dom.element.props.fillText
    dom.props.strokeText = dom.element.props.strokeText
  },

  onRenderMounted: (dom) => {
    const px = Number(dom.findContext().font.match(/[\d\.]+px/)[0].replace('px', ''))

    var text = dom.props.text
    var x = dom.props.x
    var y = dom.props.y + px * 0.82

    if (dom.props.fillText) dom.findContext().fillText(text, x, y)
    if (dom.props.strokeText) dom.findContext().strokeText(text, x, y)
  },
}

export default App