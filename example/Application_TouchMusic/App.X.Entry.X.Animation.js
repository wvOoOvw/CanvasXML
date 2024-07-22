import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import ContextApp from './Context.App'

function App(props) {
  const contextApp = React.useContext(ContextApp)

  const { animationCount: animationCountInfinity } = React.useAnimationDestination({ play: true, defaultCount: 0, destination: Infinity, rate: 1 / 30, postprocess: n => Number(n.toFixed(4)) })

  return <>
    <rect
      beginPath
      fill
      w={contextApp.unitpx * 4}
      h={contextApp.unitpx * 0.004}
      fillStyle={'rgb(255, 255, 255)'}
      globalAlpha={Math.sin(animationCountInfinity * 2 + Math.PI * 2.5) * 0.5 + 0.5}
      transform={
        [
          {
            translate: { x: contextApp.locationLayout.x + contextApp.locationLayout.w / 2, y: contextApp.locationLayout.y + contextApp.locationLayout.h / 2 },
          },
          {
            rotate: { angle: Math.PI * 0.2 * animationCountInfinity },
          },
          {
            translate: { x: (contextApp.locationLayout.x + contextApp.locationLayout.w / 2) * -1, y: (contextApp.locationLayout.y + contextApp.locationLayout.h / 2) * -1 },
          },
        ]
      }
    />

    <rect
      beginPath
      fill
      w={contextApp.unitpx * 4}
      h={contextApp.unitpx * 0.004}
      fillStyle={'rgb(255, 255, 255)'}
      globalAlpha={Math.sin(animationCountInfinity * 2 + Math.PI * 2.5) * 0.5 + 0.5}
      transform={
        [
          {
            translate: { x: contextApp.locationLayout.x + contextApp.locationLayout.w / 2, y: contextApp.locationLayout.y + contextApp.locationLayout.h / 2 },
          },
          {
            rotate: { angle: Math.PI * 0.2 * animationCountInfinity + Math.PI * 0.25 },
          },
          {
            translate: { x: (contextApp.locationLayout.x + contextApp.locationLayout.w / 2) * -1, y: (contextApp.locationLayout.y + contextApp.locationLayout.h / 2) * -1 },
          },
        ]
      }
    />

    <rect
      beginPath
      fill
      w={contextApp.unitpx * 4}
      h={contextApp.unitpx * 0.004}
      fillStyle={'rgb(255, 255, 255)'}
      globalAlpha={Math.sin(animationCountInfinity * 2 + Math.PI * 2.5) * 0.5 + 0.5}
      transform={
        [
          {
            translate: { x: contextApp.locationLayout.x + contextApp.locationLayout.w / 2, y: contextApp.locationLayout.y + contextApp.locationLayout.h / 2 },
          },
          {
            rotate: { angle: Math.PI * 0.2 * animationCountInfinity + Math.PI * 1 },
          },
          {
            translate: { x: (contextApp.locationLayout.x + contextApp.locationLayout.w / 2) * -1, y: (contextApp.locationLayout.y + contextApp.locationLayout.h / 2) * -1 },
          },
        ]
      }
    />

    <rect
      beginPath
      fill
      w={contextApp.unitpx * 4}
      h={contextApp.unitpx * 0.004}
      fillStyle={'rgb(255, 255, 255)'}
      globalAlpha={Math.sin(animationCountInfinity * 2 + Math.PI * 2.5) * 0.5 + 0.5}
      transform={
        [
          {
            translate: { x: contextApp.locationLayout.x + contextApp.locationLayout.w / 2, y: contextApp.locationLayout.y + contextApp.locationLayout.h / 2 },
          },
          {
            rotate: { angle: Math.PI * 0.2 * animationCountInfinity + Math.PI * 1.25 },
          },
          {
            translate: { x: (contextApp.locationLayout.x + contextApp.locationLayout.w / 2) * -1, y: (contextApp.locationLayout.y + contextApp.locationLayout.h / 2) * -1 },
          },
        ]
      }
    />
  </>
}

export default App