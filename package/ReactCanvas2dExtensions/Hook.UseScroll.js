import React from '../React'
import * as ReactCanvas2dExtensions from '../ReactCanvas2dExtensions'

const useLocationProperty = (props) => {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const limitX = React.useRef(props.limitX)
  const limitY = React.useRef(props.limitY)

  const moveIngRef = React.useRef(false)

  const [moveIng, setMoveIng] = React.useState(false)
  const [moveX, setMoveX] = React.useState(0)
  const [moveY, setMoveY] = React.useState(0)

  const onChange = (params) => {
    const { status, e, x, y, changedX, changedY, continuedX, continuedY } = params

    if (status === 'afterStart') {
      moveIngRef.current = true
      setMoveIng(true)
    }

    if (status === 'afterMove' && moveIng) {
      setMoveX(pre => pre + changedX)
      setMoveY(pre => pre + changedY)
    }

    if (status === 'afterEnd') {
      setMoveIng(false)
    }
  }

  const { onStart, onMove, onEnd } = ReactCanvas2dExtensions.useEventDragControl({ enable: true, onChange: onChange })

  const setLimitX = value => limitX.current = value
  const setLimitY = value => limitY.current = value

  return { moveIng, moveX, moveY, onStart, onMove, onEnd, setLimitX, setLimitY }
}

export default useLocationProperty