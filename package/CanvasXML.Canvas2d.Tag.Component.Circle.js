import Canvas2d from './CanvasXML.Canvas2d'

import GlobalUtils from './CanvasXML.Global.Utils'

const App = {
  locationMount: (dom) => {
    Canvas2d.Tag.locationMount(dom, App)
  },

  locationUnmount: (dom) => {
    Canvas2d.Tag.locationUnmount(dom, App)
  },

  renderMount: (dom) => {
    Canvas2d.Tag.renderMount_0(dom, App)

    Canvas2d.context().moveTo(dom.props.cx, dom.props.cy)
    Canvas2d.context().arc(dom.props.cx, dom.props.cy, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise)
    Canvas2d.context().lineTo(dom.props.cx, dom.props.cy)

    Canvas2d.Tag.renderMount_1(dom, App)
  },

  renderUnmount: (dom) => {
    Canvas2d.Tag.renderUnmount_0(dom, App)
    Canvas2d.Tag.renderUnmount_1(dom, e => GlobalUtils.coverCircle(e.x, e.y, dom.props.cx, dom.props.cy, dom.props.radius, dom.props.sAngle, dom.props.eAngle, dom.props.counterclockwise))
  },
}

export default App