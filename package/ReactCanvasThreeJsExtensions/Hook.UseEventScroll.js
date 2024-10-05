import React from '../React'

import useEventDrag from './Hook.UseEventDrag'

const useEventScroll = (props) => {
  const limitMinX = props.limitX ? Math.min(...props.limitX) : undefined
  const limitMaxX = props.limitX ? Math.max(...props.limitX) : undefined
  const limitMinY = props.limitY ? Math.min(...props.limitY) : undefined
  const limitMaxY = props.limitY ? Math.max(...props.limitY) : undefined

  const [moveX, setMoveX] = React.useState(0)
  const [moveY, setMoveY] = React.useState(0)

  const onChange = (params) => {
    const { status, e, x, y, changedX, changedY, continuedX, continuedY } = params

    if (status === 'afterMove') {
      if (props.enableX) setMoveX(i => i + changedX)
      if (props.enableY) setMoveY(i => i + changedY)
    }
  }

  const { dragIng, onStart, onMove, onEnd } = useEventDrag({ enable: true, onChange: onChange })

  React.useEffect(() => {
    if (dragIng === false) {
      if (limitMinX !== undefined && moveX < limitMinX) {
        setMoveX(i => limitMinX - moveX < 1 ? limitMinX : i + (limitMinX - moveX) / 2)
      }
      if (limitMinX !== undefined && moveX > limitMaxX) {
        setMoveX(i => moveX - limitMaxX < 1 ? limitMaxX : i - (moveX - limitMaxX) / 2)
      }
      if (limitMinY !== undefined && moveY < limitMinY) {
        setMoveY(i => limitMinY - moveY < 1 ? limitMinY : i + (limitMinY - moveY) / 2)
      }
      if (limitMinY !== undefined && moveY > limitMaxY) {
        setMoveY(i => moveY - limitMaxY < 1 ? limitMaxY : i - (moveY - limitMaxY) / 2)
      }
    }
  }, [dragIng, moveX, moveY])

  return { dragIng, moveX, moveY, onStart, onMove, onEnd }
}

export default useEventScroll