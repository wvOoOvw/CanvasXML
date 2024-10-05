import React from '../React'

const useEventClick = (props) => {
  const downRef = React.useRef(false)

  const onDown = () => {
    downRef.current = true
  }

  const onUp = () => {
    if (downRef.current === true && (downRef.current = false) === false) props.onClick()
  }

  const onUpAway = () => {
    downRef.current = false
  }

  return { onDown, onUp, onUpAway }
}

export default useEventClick