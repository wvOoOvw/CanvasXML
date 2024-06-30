import React from './CanvasXML.React'

import Canvas2d from './CanvasXML.Canvas2d'

const caculateLine = Canvas2d.Tag.Text.caculateLine
const caculateLineLocation = Canvas2d.Tag.Text.caculateLineLocation

const App = (props) => {
  var w
  var h

  const line = React.useMemo(() => {
    return caculateLine(props.text, props.font, props.w, props.split).map(i => Object({ ...props, ...i }))
  }, [props.w, props.text, props.font, props.split])

  if (props.lineHeight !== undefined && props.gap !== undefined) {
    const location = caculateLineLocation(line, props.lineHeight, props.gap)
    w = location.w
    h = location.h
  }

  return props.children.map(i => i(line, { w: w, h: h }))
}

export default App