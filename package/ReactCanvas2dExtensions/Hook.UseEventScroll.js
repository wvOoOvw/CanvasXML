import React from '../React'
import * as ReactCanvas2dExtensions from '../ReactCanvas2dExtensions'

const useEventScroll = (props) => {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const limitX = React.useRef(props.limitX)
  const limitY = React.useRef(props.limitY)

  const limitMinX = Math.min(...limitX.current)
  const limitMaxX = Math.max(...limitX.current)
  const limitMinY = Math.min(...limitY.current)
  const limitMaxY = Math.max(...limitY.current)

  const [moveX, setMoveX] = React.useState(0)
  const [moveY, setMoveY] = React.useState(0)

  const onChange = (params) => {
    const { status, e, x, y, changedX, changedY, continuedX, continuedY } = params

    if (status === 'afterMove') {
      if (props.x) setMoveX(i => i + changedX)
      if (props.y) setMoveY(i => i + changedY)
    }
  }

  const { dragIng, onStart, onMove, onEnd } = ReactCanvas2dExtensions.useEventDrag({ enable: true, onChange: onChange })

  React.useEffect(() => {
    if (dragIng === false) {
      if (moveX < limitMinX) {
        setMoveX(i => limitMinX - moveX < 1 ? limitMinX : i + (limitMinX - moveX) / 2)
      }
      if (moveX > limitMaxX) {
        setMoveX(i => moveX - limitMaxX < 1 ? limitMaxX : i - (moveX - limitMaxX) / 2)
      }
      if (moveY < limitMinY) {
        setMoveY(i => limitMinY - moveY < 1 ? limitMinY : i + (limitMinY - moveY) / 2)
      }
      if (moveY > limitMaxY) {
        setMoveY(i => moveY - limitMaxY < 1 ? limitMaxY : i - (moveY - limitMaxY) / 2)
      }
    }
  }, [dragIng, moveX, moveY])

  const setLimitX = value => limitX.current = value
  const setLimitY = value => limitY.current = value

  return { moveIng, moveX, moveY, onStart, onMove, onEnd, setLimitX, setLimitY }
}

export default useEventScroll