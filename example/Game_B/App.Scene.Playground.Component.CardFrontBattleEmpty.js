import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function App(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = props.w
  const h = props.h
  const x = props.x
  const y = props.y

  const text = props.text
  const image = props.image

  const Component =
    <ReactCanvas2dExtensions.CanvasOffscreen dependence={[x, y, w, h]}>
      <layout x={x} y={y} w={w} h={h}>
        <rectradiusarc stroke radius={Math.min(w, h) * 0.064} strokeStyle='rgb(255, 255, 255)' lineWidth={Math.min(w, h) * 0.012} />
        {
          image ?
            <image cx='50%' cy='35%' w={w * 0.4} h={w * 0.4} src={image} />
            : null
        }
        {
          text ?
            <>
              <ReactCanvas2dExtensions.Text text={text[0]} font={`bolder ${Math.min(w, h) * 0.12}px sans-serif`} w={Infinity}>
                {
                  (line, location) => {
                    return <text cx='50%' cy='60%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
                  }
                }
              </ReactCanvas2dExtensions.Text>
              <ReactCanvas2dExtensions.Text text={text[1]} font={`bolder ${Math.min(w, h) * 0.08}px sans-serif`} w={Infinity}>
                {
                  (line, location) => {
                    return <text cx='50%' cy='70%' w={line[0].w} h={line[0].h} fillText fillStyle='rgb(255, 255, 255)' text={line[0].text} font={line[0].font} />
                  }
                }
              </ReactCanvas2dExtensions.Text>
            </>
            : null
        }
      </layout>
    </ReactCanvas2dExtensions.CanvasOffscreen>

  return Component
}

export default App