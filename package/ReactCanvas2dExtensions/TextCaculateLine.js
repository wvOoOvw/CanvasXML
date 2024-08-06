import React from './CanvasXML.React'

import Canvas2d from './CanvasXML.Canvas2d'

const caculateLine = Canvas2d.Tag.Text.caculateLine
const caculateLineLocation = Canvas2d.Tag.Text.caculateLineLocation

const App = (props) => {
  const line = React.useMemo(() => {
    return caculateLine(props.text, props.font, props.w, props.wrap, props.ellipsis, props.split)
  }, [props.text, props.font, props.w, props.wrap, props.ellipsis, props.split])

  const location = React.useMemo(() => {
    var w
    var h

    if (props.lineHeight !== undefined && props.gap !== undefined) {
      const location = caculateLineLocation(line, props.lineHeight, props.gap)
      w = location.w
      h = location.h
    }

    return { w: w, h: h }
  }, [line, props.lineHeight, props.gap])

  return props.children.map(i => i(line, location))
}

export default App