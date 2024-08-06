import React from './CanvasXML.React'
import Canvas2d from './CanvasXML.Canvas2d'

const useAudio = (props) => {
  const [load, setLoad] = React.useState(false)

  const audio = React.useMemo(() => new Audio(), [])

  React.useEffectImmediate(() => audio.src = props.src, [props.src])
  React.useEffectImmediate(() => setLoad(false), [props.src])
  React.useEffectImmediate(() => audio.onload = () => setLoad(true), [props.src])
  React.useEffectImmediate(() => audio.onloadeddata = () => setLoad(true), [props.src])
  React.useEffectImmediate(() => audio.oncanplay = () => setLoad(true), [props.src])
  React.useEffectImmediate(() => audio.oncanplaythrough = () => setLoad(true), [props.src])
  React.useEffectImmediate(() => audio.onerror = () => setLoad(true), [props.src])

  return { load, audio }
}

export default useAudio