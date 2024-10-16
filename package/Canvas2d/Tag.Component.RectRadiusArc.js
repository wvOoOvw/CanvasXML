const App = {
  onConstructMounted: (dom) => {
    dom.props.radius = dom.element.props.radius && JSON.parse(JSON.stringify(dom.element.props.radius))
  },

  onRenderMount: (dom) => {
    dom.path = (context) => {
      const fillRadius = (radius) => {
        var rRadius = new Array(4).fill(0)
      
        if (radius && typeof radius === 'object') rRadius = radius
        if (radius && typeof radius === 'number') rRadius = new Array(4).fill(radius)
      
        return rRadius
      }

      const radius = fillRadius(dom.props.radius)

      radius.forEach((i, index) => {
        if (radius[index] > dom.props.w / 2) radius[index] = dom.props.w / 2
        if (radius[index] > dom.props.h / 2) radius[index] = dom.props.h / 2
        if (radius[index] < 0) radius[index] = 0
      })

      context.moveTo(dom.props.x - dom.props.w / 2 , dom.props.y - dom.props.h / 2 + radius[0])
      context.arcTo(dom.props.x - dom.props.w / 2 , dom.props.y - dom.props.h / 2, dom.props.x - dom.props.w / 2  + radius[0], dom.props.y - dom.props.h / 2, radius[0])
      context.lineTo(dom.props.x - dom.props.w / 2  + dom.props.w - radius[1], dom.props.y - dom.props.h / 2)
      context.arcTo(dom.props.x - dom.props.w / 2  + dom.props.w, dom.props.y - dom.props.h / 2, dom.props.x - dom.props.w / 2  + dom.props.w, dom.props.y - dom.props.h / 2 + radius[1], radius[1])
      context.lineTo(dom.props.x - dom.props.w / 2  + dom.props.w, dom.props.y - dom.props.h / 2 + dom.props.h - radius[2])
      context.arcTo(dom.props.x - dom.props.w / 2  + dom.props.w, dom.props.y - dom.props.h / 2 + dom.props.h, dom.props.x - dom.props.w / 2  + dom.props.w - radius[2], dom.props.y - dom.props.h / 2 + dom.props.h, radius[2])
      context.lineTo(dom.props.x - dom.props.w / 2  + radius[3], dom.props.y - dom.props.h / 2 + dom.props.h)
      context.arcTo(dom.props.x - dom.props.w / 2 , dom.props.y - dom.props.h / 2 + dom.props.h, dom.props.x - dom.props.w / 2 , dom.props.y - dom.props.h / 2 + dom.props.h - radius[3], radius[3])
      context.lineTo(dom.props.x - dom.props.w / 2 , dom.props.y - dom.props.h / 2 + radius[0])
    }
  },
}

export default App