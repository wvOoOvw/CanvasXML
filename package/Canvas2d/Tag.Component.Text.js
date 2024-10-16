const App = {
  onConstructMounted: (dom) => {
    dom.props.text = dom.element.props.text
    dom.props.fillText = dom.element.props.fillText
    dom.props.strokeText = dom.element.props.strokeText
  },

  onRenderMounted: (dom) => {
    const px = Number(dom.findParentContext().font.match(/[\d\.]+px/)[0].replace('px', ''))

    if (dom.props.fillText) dom.findParentContext().fillText(dom.props.text, dom.props.x - dom.props.w / 2 , dom.props.y - dom.props.h / 2 + px * 0.82)
    if (dom.props.strokeText) dom.findParentContext().strokeText(dom.props.text, dom.props.x - dom.props.w / 2 , dom.props.y - dom.props.h / 2 + px * 0.82)
  },
}

export default App