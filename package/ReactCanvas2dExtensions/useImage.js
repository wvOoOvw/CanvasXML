import React from './CanvasXML.React'
import Canvas2d from './CanvasXML.Canvas2d'

const useImage = (props) => {
  const [load, setLoad] = React.useState(false)

  const image = React.useMemo(() => new Image(), [])

  React.useEffectImmediate(() => image.src = props.src, [props.src])
  React.useEffectImmediate(() => setLoad(false), [props.src])
  React.useEffectImmediate(() => image.onload = () => setLoad(true), [props.src])
  React.useEffectImmediate(() => image.onloadeddata = () => setLoad(true), [props.src])
  React.useEffectImmediate(() => image.onerror = () => setLoad(true), [props.src])

  return { load, image }
}

export default useImage