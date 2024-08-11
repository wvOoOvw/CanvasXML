import React from '../React'
import { Tag } from '../Canvas2d'

const caculateLine = Tag.Text.caculateLine
const caculateLineLocation = Tag.Text.caculateLineLocation

const useTextCaculateLine = (props) => {
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

  return { line, location }
}

export default useTextCaculateLine