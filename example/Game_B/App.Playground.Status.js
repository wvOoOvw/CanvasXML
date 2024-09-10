import React from '../../package/React'
import Canvas2d from '../../package/Canvas2d'
import ReactCanvas2d from '../../package/ReactCanvas2d'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function Self() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = contextApp.unitpx * 0.2
  const h = contextApp.unitpx * 0.2
  const x = contextApp.unitpx * 0.08
  const y = contextApp.locationLayout.y + contextApp.locationLayout.h - h - contextApp.unitpx * 0.08

  return <layout zIndex={contextPlayground.zIndex.Status}>

    <ReactCanvas2dExtensions.CanvasOffscreen dependent={[w, h, x, y, contextPlayground.gameSelfActionPoint, contextPlayground.gameSelfHitPoint]}>

      <layout x={x} y={y} w={w} h={h}>
        <arc cx='50%' cy='50%' radius={(w + h) / 4}>
          <image cx='50%' cy='50%' src={contextApp.imagePngDividedSpiralWhite} clipHorizontalCenter clipVerticalCenter />
        </arc>
      </layout>
      
      <layout x={x + w * 1.08} cy={y + contextApp.unitpx * 0.00} w={w} h={contextApp.unitpx * 0.06}>
        <image w={contextApp.unitpx * 0.06} src={contextApp.imagePngCrossedChainsWhite} />
        <ReactCanvas2dExtensions.Text text={String(contextPlayground.gameSelfActionPoint)} font={`bolder ${contextApp.unitpx * 0.32}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return line.map(i => {
                return <text x={contextApp.unitpx * 0.06 * 1.24} cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} />
              })
            }
          }
        </ReactCanvas2dExtensions.Text>
      </layout>

      <layout x={x + w * 1.08} cy={y + contextApp.unitpx * 0.05} w={w} h={contextApp.unitpx * 0.06}>
        <image w={contextApp.unitpx * 0.06} src={contextApp.imagePngCrossedChainsWhite} />
        <ReactCanvas2dExtensions.Text text={String(contextPlayground.gameSelfGoldPoint)} font={`bolder ${contextApp.unitpx * 0.32}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return line.map(i => {
                return <text x={contextApp.unitpx * 0.06 * 1.24} cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} />
              })
            }
          }
        </ReactCanvas2dExtensions.Text>
      </layout>

      <layout x={x + w * 1.08} cy={y + contextApp.unitpx * 0.00} w={w} h={contextApp.unitpx * 0.06}>
        <image w={contextApp.unitpx * 0.06} src={contextApp.imagePngHeartBeatsD0021B} />
        <ReactCanvas2dExtensions.Text text={String(contextPlayground.gameSelfHitPoint)} font={`bolder ${contextApp.unitpx * 0.32}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return line.map(i => {
                return <text x={contextApp.unitpx * 0.06 * 1.24} cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} />
              })
            }
          }
        </ReactCanvas2dExtensions.Text>
      </layout>

    </ReactCanvas2dExtensions.CanvasOffscreen>

  </layout>
}

function Opponent() {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const w = contextApp.unitpx * 0.2
  const h = contextApp.unitpx * 0.2
  const x = contextApp.unitpx * 0.08
  const y = contextApp.unitpx * 0.08

  return <layout zIndex={contextPlayground.zIndex.Status}>

    <ReactCanvas2dExtensions.CanvasOffscreen dependent={[w, h, x, y, contextPlayground.gameOpponentActionPoint, contextPlayground.gameOpponentHitPoint]}>

      <layout x={x} y={y} w={w} h={h}>
        <arc cx='50%' cy='50%' radius={(w + h) / 4}>
          <image cx='50%' cy='50%' src={contextApp.imagePngDividedSpiralWhite} clipHorizontalCenter clipVerticalCenter />
        </arc>
      </layout>

      <layout x={x + w * 1.08} cy={y + contextApp.unitpx * 0.00} w={w} h={contextApp.unitpx * 0.06}>
        <image w={contextApp.unitpx * 0.06} src={contextApp.imagePngCrossedChainsWhite} />
        <ReactCanvas2dExtensions.Text text={String(contextPlayground.gameOpponentActionPoint)} font={`bolder ${contextApp.unitpx * 0.32}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return line.map(i => {
                return <text x={contextApp.unitpx * 0.06 * 1.24} cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} />
              })
            }
          }
        </ReactCanvas2dExtensions.Text>
      </layout>

      <layout x={x + w * 1.08} cy={y + contextApp.unitpx * 0.05} w={w} h={contextApp.unitpx * 0.06}>
        <image w={contextApp.unitpx * 0.06} src={contextApp.imagePngCrossedChainsWhite} />
        <ReactCanvas2dExtensions.Text text={String(contextPlayground.gameOpponentGoldPoint)} font={`bolder ${contextApp.unitpx * 0.32}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return line.map(i => {
                return <text x={contextApp.unitpx * 0.06 * 1.24} cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} />
              })
            }
          }
        </ReactCanvas2dExtensions.Text>
      </layout>

      <layout x={x + w * 1.08} cy={y + contextApp.unitpx * 0.00} w={w} h={contextApp.unitpx * 0.06}>
        <image w={contextApp.unitpx * 0.06} src={contextApp.imagePngHeartBeatsD0021B} />
        <ReactCanvas2dExtensions.Text text={String(contextPlayground.gameOpponentHitPoint)} font={`bolder ${contextApp.unitpx * 0.32}px sans-serif`} w={Infinity}>
          {
            (line, location) => {
              return line.map(i => {
                return <text x={contextApp.unitpx * 0.06 * 1.24} cy='50%' w={i.w} h={i.h} fillText fillStyle='rgb(255, 255, 255)' text={i.text} font={i.font} />
              })
            }
          }
        </ReactCanvas2dExtensions.Text>
      </layout>

    </ReactCanvas2dExtensions.CanvasOffscreen>

  </layout>
}

function App() {
  return [<Self />, <Opponent />]
}

export default App