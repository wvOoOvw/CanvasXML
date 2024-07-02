import Canvas2d from './CanvasXML.Canvas2d'

import GlobalUtils from './CanvasXML.Global.Utils'

const App = {
  locationMount: (dom) => {
    Canvas2d.Tag.locationMount(dom)
  },

  locationUnmount: (dom) => {
    Canvas2d.Tag.locationUnmount(dom)
  },

  renderMount: (dom) => {
    Canvas2d.Tag.renderMount_0(dom)

    var radius = new Array(4).fill(0)

    if (dom.props.radius && typeof radius === 'object' && Array.isArray(radius)) radius = dom.props.radius
    if (dom.props.radius && typeof radius === 'number') radius = new Array(4).fill(dom.props.radius)

    Canvas2d.context().moveTo(dom.props.x, dom.props.y + radius[0])
    Canvas2d.context().arcTo(dom.props.x, dom.props.y, dom.props.x + radius[0], dom.props.y, radius[0])
    Canvas2d.context().lineTo(dom.props.x + dom.props.w - radius[1], dom.props.y)
    Canvas2d.context().arcTo(dom.props.x + dom.props.w, dom.props.y, dom.props.x + dom.props.w, dom.props.y + radius[1], radius[1])
    Canvas2d.context().lineTo(dom.props.x + dom.props.w, dom.props.y + dom.props.h - radius[2])
    Canvas2d.context().arcTo(dom.props.x + dom.props.w, dom.props.y + dom.props.h, dom.props.x + dom.props.w - radius[2], dom.props.y + dom.props.h, radius[2])
    Canvas2d.context().lineTo(dom.props.x + radius[3], dom.props.y + dom.props.h)
    Canvas2d.context().arcTo(dom.props.x, dom.props.y + dom.props.h, dom.props.x, dom.props.y + dom.props.h - radius[3], radius[3])

    Canvas2d.Tag.renderMount_1(dom)
  },

  renderUnmount: (dom) => {
    Canvas2d.Tag.renderUnmount_0(dom)
    Canvas2d.Tag.renderUnmount_1(dom, e => GlobalUtils.coverRect(e.x, e.y, dom.props.x, dom.props.y, dom.props.w, dom.props.h))

  },
}

export default App