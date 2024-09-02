import React from '../React'
import * as ReactCanvas2dExtensions from '../ReactCanvas2dExtensions'

const useLocationProperty = (props) => {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const inMove = React.useRef(false)

  const scorllMinX = React.useRef()
  const scorllMaxX = React.useRef()
  const scorllMinY = React.useRef()
  const scorllMaxY = React.useRef()

  const [scorllX, setScrollX] = React.useState(0)
  const [scorllY, setScrollY] = React.useState(0)

  const onChange = (params) => {
    const { status, e, x, y, changedX, changedY, continuedX, continuedY } = params

    if (status === 'afterStart') {
      inMove.current = true
    }

    if (status === 'afterMove') {
      setScrollX(pre => pre + changedX)
      setScrollY(pre => pre + changedY)
    }

    if (status === 'afterEnd') {
      inMove.current = false
    }
  }

  const { onStart, onMove, onEnd } = ReactCanvas2dExtensions.useEventDragControl({ enable: true, onChange: onChange })

  return { onStart, onMove, onEnd }
}

export default useLocationProperty