import React from '../../package/React'
import * as ReactExtensions from '../../package/ReactExtensions'
import * as ReactCanvas2dExtensions from '../../package/ReactCanvas2dExtensions'

import ContextApp from './Context.App'
import ContextPlayground from './Context.Playground'

function ComponentInWar(props) {
  const contextApp = React.useContext(ContextApp)
  const contextPlayground = React.useContext(ContextPlayground)

  const monster = props.monster
  const onDestory = props.onDestory

  const [inWar, setInWar] = React.useState(true)

  const { animationCountProcessed: animationCountAppear } = ReactExtensions.useAnimationCount({ play: true, defaultCount: 0, destination: 1, rate: 1 / 24, postprocess: n => Number(n.toFixed(4)) })
  const { animationCountProcessed: animationCountDisappear } = ReactExtensions.useAnimationCount({ play: inWar !== true, defaultCount: 0, destination: 1, rate: 1 / 12, postprocess: n => Number(n.toFixed(4)) })
  const { animationCountProcessed: animationCountInfinity } = ReactExtensions.useAnimationCount({ play: true, defaultCount: 0, defaultDestination: Infinity, rate: 1 / 30, postprocess: n => Math.cos(Number(n.toFixed(4)) + Math.PI / 2) })

  const location = {
    container: { y: 0 - contextApp.locationLayout.h / 2 + contextApp.unitpx * 0.48 },

    lookat: { x: 0, y: 0 },

    style: {
      shadowBlur: [contextApp.unitpx * 0.02]
    },

    point: {
      y: 0 - contextApp.unitpx * 0.42,
      w: contextApp.unitpx * 1.6,
      h: contextApp.unitpx * 0.048,
      radius: contextApp.unitpx * 0.02,
    },

    eyeShell: {
      T: { x: 0, y: 0 - contextApp.unitpx * 0.32 },
      B: { x: 0, y: 0 + contextApp.unitpx * 0.32 },
      L: { x: 0 - contextApp.unitpx * 0.32, y: 0 },
      R: { x: 0 + contextApp.unitpx * 0.32, y: 0 },
      QC: { x: contextApp.unitpx * 0.3, y: contextApp.unitpx * 0.3 },
    },

    eyeMask: {
      T: { x: 0, y: 0 - contextApp.unitpx * 0.24 },
      B: { x: 0, y: 0 + contextApp.unitpx * 0.24 },
      L: { x: 0 - contextApp.unitpx * 0.08, y: 0 },
      R: { x: 0 + contextApp.unitpx * 0.08, y: 0 },
      QC: { x: contextApp.unitpx * 0.07, y: contextApp.unitpx * 0.21 },
    },

    eyeLens: {
      T: { x: 0, y: 0 - contextApp.unitpx * 0.12 },
      B: { x: 0, y: 0 + contextApp.unitpx * 0.12 },
      L: { x: 0 - contextApp.unitpx * 0.024, y: 0 },
      R: { x: 0 + contextApp.unitpx * 0.024, y: 0 },
      QC: { x: contextApp.unitpx * 0.012, y: contextApp.unitpx * 0.06 },
    },

    eyeLensDecoration: {
      w: contextApp.unitpx * 0.064,
      h: contextApp.unitpx * 0.008,
      gapX: contextApp.unitpx * 0.012,
      gapY: 0 - contextApp.unitpx * 0.002,
    },

    tentacle: [
      [
        { x: contextApp.unitpx * 0.24, y: contextApp.unitpx * 0.24 },
        { x: contextApp.unitpx * 0.36, y: contextApp.unitpx * 0.36 },
        { x: contextApp.unitpx * 0.42, y: contextApp.unitpx * 0.32 },
        { x: contextApp.unitpx * 0.56, y: contextApp.unitpx * 0.48 },
        { x: contextApp.unitpx * 0.48, y: contextApp.unitpx * 0.52 },
        { x: contextApp.unitpx * 0.36, y: contextApp.unitpx * 0.44 },
      ]
    ],
  }

  const animationCountLocation = ReactExtensions.useAnimationCountWithObject({ object: location, play: true, defaultRate: n => n / 12, postprocess: n => Number(n.toFixed(4)) })

  React.useEffect(() => {
    animationCountLocation.lookat.x.setAnimationCount(0 + contextApp.unitpx * 0.04 * animationCountInfinity)
    animationCountLocation.lookat.x.resetRate()
    animationCountLocation.lookat.y.resetRate()
  }, [animationCountInfinity])

  React.useEffect(() => {
    if (animationCountDisappear === 1) {
      onDestory()
    }
  }, [animationCountDisappear])

  const ComponentPoint = React.useMemo(() => {
    return <layout y={animationCountLocation.point.y.animationCountProcessed} w={animationCountLocation.point.w.animationCountProcessed} h={animationCountLocation.point.h.animationCountProcessed}>
      <rectradiusarc clip fill fillStyle='rgb(175, 175, 175)' radius={animationCountLocation.point.radius.animationCountProcessed} globalAlpha={(animationCountAppear - animationCountDisappear) * 0.4}>
        <rect fill fillStyle='rgb(175, 25, 25)' l='0%' w='50%' globalAlpha={animationCountAppear - animationCountDisappear} />
      </rectradiusarc>
    </layout>
  })

  const ComponentEyeShell = React.useMemo(() => {
    const pointT = { x: animationCountLocation.eyeShell.T.x.animationCountProcessed, y: animationCountLocation.eyeShell.T.y.animationCountProcessed }
    const pointL = { x: animationCountLocation.eyeShell.L.x.animationCountProcessed, y: animationCountLocation.eyeShell.L.y.animationCountProcessed }
    const pointB = { x: animationCountLocation.eyeShell.B.x.animationCountProcessed, y: animationCountLocation.eyeShell.B.y.animationCountProcessed }
    const pointR = { x: animationCountLocation.eyeShell.R.x.animationCountProcessed, y: animationCountLocation.eyeShell.R.y.animationCountProcessed }

    const quadraticCurveLT = { x: 0 - animationCountLocation.eyeShell.QC.x.animationCountProcessed, y: 0 - animationCountLocation.eyeShell.QC.y.animationCountProcessed }
    const quadraticCurveLB = { x: 0 - animationCountLocation.eyeShell.QC.x.animationCountProcessed, y: animationCountLocation.eyeShell.QC.y.animationCountProcessed }
    const quadraticCurveRB = { x: animationCountLocation.eyeShell.QC.x.animationCountProcessed, y: animationCountLocation.eyeShell.QC.y.animationCountProcessed }
    const quadraticCurveRT = { x: animationCountLocation.eyeShell.QC.x.animationCountProcessed, y: 0 - animationCountLocation.eyeShell.QC.y.animationCountProcessed }

    return <ReactCanvas2dExtensions.Path fill fillStyle='rgb(25, 25, 25)' container shadowColor='rgb(0, 0, 0)' shadowBlur={animationCountLocation.style.shadowBlur[0].animationCountProcessed}>
      <path moveTo>
        <path x={pointT.x} y={pointT.y} />
      </path>
      <path quadraticCurveTo>
        <path x={quadraticCurveLT.x} y={quadraticCurveLT.y} />
        <path x={pointL.x} y={pointL.y} />
      </path>
      <path quadraticCurveTo>
        <path x={quadraticCurveLB.x} y={quadraticCurveLB.y} />
        <path x={pointB.x} y={pointB.y} />
      </path>
      <path quadraticCurveTo>
        <path x={quadraticCurveRB.x} y={quadraticCurveRB.y} />
        <path x={pointR.x} y={pointR.y} />
      </path>
      <path quadraticCurveTo>
        <path x={quadraticCurveRT.x} y={quadraticCurveRT.y} />
        <path x={pointT.x} y={pointT.y} />
      </path>
    </ReactCanvas2dExtensions.Path>
  })

  const ComponentEyeMask = React.useMemo(() => {
    const pointT = { x: animationCountLocation.eyeMask.T.x.animationCountProcessed, y: animationCountLocation.eyeMask.T.y.animationCountProcessed }
    const pointL = { x: animationCountLocation.eyeMask.L.x.animationCountProcessed, y: animationCountLocation.eyeMask.L.y.animationCountProcessed }
    const pointB = { x: animationCountLocation.eyeMask.B.x.animationCountProcessed, y: animationCountLocation.eyeMask.B.y.animationCountProcessed }
    const pointR = { x: animationCountLocation.eyeMask.R.x.animationCountProcessed, y: animationCountLocation.eyeMask.R.y.animationCountProcessed }

    pointL.x = pointL.x + animationCountLocation.lookat.x.animationCountProcessed
    pointR.x = pointR.x + animationCountLocation.lookat.x.animationCountProcessed

    const quadraticCurveLT = { x: 0 - animationCountLocation.eyeMask.QC.x.animationCountProcessed, y: 0 - animationCountLocation.eyeMask.QC.y.animationCountProcessed }
    const quadraticCurveLB = { x: 0 - animationCountLocation.eyeMask.QC.x.animationCountProcessed, y: animationCountLocation.eyeMask.QC.y.animationCountProcessed }
    const quadraticCurveRB = { x: animationCountLocation.eyeMask.QC.x.animationCountProcessed, y: animationCountLocation.eyeMask.QC.y.animationCountProcessed }
    const quadraticCurveRT = { x: animationCountLocation.eyeMask.QC.x.animationCountProcessed, y: 0 - animationCountLocation.eyeMask.QC.y.animationCountProcessed }

    quadraticCurveLT.x = quadraticCurveLT.x + animationCountLocation.lookat.x.animationCountProcessed
    quadraticCurveLB.x = quadraticCurveLB.x + animationCountLocation.lookat.x.animationCountProcessed
    quadraticCurveRB.x = quadraticCurveRB.x + animationCountLocation.lookat.x.animationCountProcessed
    quadraticCurveRT.x = quadraticCurveRT.x + animationCountLocation.lookat.x.animationCountProcessed

    quadraticCurveLT.y = quadraticCurveLT.y + animationCountLocation.lookat.y.animationCountProcessed
    quadraticCurveLB.y = quadraticCurveLB.y + animationCountLocation.lookat.y.animationCountProcessed
    quadraticCurveRB.y = quadraticCurveRB.y + animationCountLocation.lookat.y.animationCountProcessed
    quadraticCurveRT.y = quadraticCurveRT.y + animationCountLocation.lookat.y.animationCountProcessed

    return <ReactCanvas2dExtensions.Path fill fillStyle='rgb(255, 255, 255)' container shadowColor='rgb(255, 255, 255)' shadowBlur={animationCountLocation.style.shadowBlur[0].animationCountProcessed}>
      <path moveTo>
        <path x={pointT.x} y={pointT.y} />
      </path>
      <path quadraticCurveTo>
        <path x={quadraticCurveLT.x} y={quadraticCurveLT.y} />
        <path x={pointL.x} y={pointL.y} />
      </path>
      <path quadraticCurveTo>
        <path x={quadraticCurveLB.x} y={quadraticCurveLB.y} />
        <path x={pointB.x} y={pointB.y} />
      </path>
      <path quadraticCurveTo>
        <path x={quadraticCurveRB.x} y={quadraticCurveRB.y} />
        <path x={pointR.x} y={pointR.y} />
      </path>
      <path quadraticCurveTo>
        <path x={quadraticCurveRT.x} y={quadraticCurveRT.y} />
        <path x={pointT.x} y={pointT.y} />
      </path>
    </ReactCanvas2dExtensions.Path>
  })

  const ComponentEyeLens = React.useMemo(() => {
    const pointT = { x: animationCountLocation.eyeLens.T.x.animationCountProcessed, y: animationCountLocation.eyeLens.T.y.animationCountProcessed }
    const pointL = { x: animationCountLocation.eyeLens.L.x.animationCountProcessed, y: animationCountLocation.eyeLens.L.y.animationCountProcessed }
    const pointB = { x: animationCountLocation.eyeLens.B.x.animationCountProcessed, y: animationCountLocation.eyeLens.B.y.animationCountProcessed }
    const pointR = { x: animationCountLocation.eyeLens.R.x.animationCountProcessed, y: animationCountLocation.eyeLens.R.y.animationCountProcessed }

    pointT.x = pointT.x + animationCountLocation.lookat.x.animationCountProcessed * 1.2
    pointL.x = pointL.x + animationCountLocation.lookat.x.animationCountProcessed * 1.2
    pointB.x = pointB.x + animationCountLocation.lookat.x.animationCountProcessed * 1.2
    pointR.x = pointR.x + animationCountLocation.lookat.x.animationCountProcessed * 1.2

    pointT.y = pointT.y + animationCountLocation.lookat.y.animationCountProcessed
    pointL.y = pointL.y + animationCountLocation.lookat.y.animationCountProcessed
    pointB.y = pointB.y + animationCountLocation.lookat.y.animationCountProcessed
    pointR.y = pointR.y + animationCountLocation.lookat.y.animationCountProcessed

    pointL.x = pointL.x + Math.abs(animationCountLocation.lookat.x.animationCountProcessed) * 0.1
    pointR.x = pointR.x - Math.abs(animationCountLocation.lookat.x.animationCountProcessed) * 0.1

    pointT.y = pointT.y + Math.abs(animationCountLocation.lookat.y.animationCountProcessed) * 0.1
    pointB.y = pointB.y - Math.abs(animationCountLocation.lookat.y.animationCountProcessed) * 0.1

    const quadraticCurveLT = { x: 0 - animationCountLocation.eyeLens.QC.x.animationCountProcessed, y: 0 - animationCountLocation.eyeLens.QC.y.animationCountProcessed }
    const quadraticCurveLB = { x: 0 - animationCountLocation.eyeLens.QC.x.animationCountProcessed, y: animationCountLocation.eyeLens.QC.y.animationCountProcessed }
    const quadraticCurveRB = { x: animationCountLocation.eyeLens.QC.x.animationCountProcessed, y: animationCountLocation.eyeLens.QC.y.animationCountProcessed }
    const quadraticCurveRT = { x: animationCountLocation.eyeLens.QC.x.animationCountProcessed, y: 0 - animationCountLocation.eyeLens.QC.y.animationCountProcessed }

    quadraticCurveLT.x = quadraticCurveLT.x + animationCountLocation.lookat.x.animationCountProcessed * 1.2
    quadraticCurveLB.x = quadraticCurveLB.x + animationCountLocation.lookat.x.animationCountProcessed * 1.2
    quadraticCurveRB.x = quadraticCurveRB.x + animationCountLocation.lookat.x.animationCountProcessed * 1.2
    quadraticCurveRT.x = quadraticCurveRT.x + animationCountLocation.lookat.x.animationCountProcessed * 1.2

    quadraticCurveLT.y = quadraticCurveLT.y + animationCountLocation.lookat.y.animationCountProcessed
    quadraticCurveLB.y = quadraticCurveLB.y + animationCountLocation.lookat.y.animationCountProcessed
    quadraticCurveRB.y = quadraticCurveRB.y + animationCountLocation.lookat.y.animationCountProcessed
    quadraticCurveRT.y = quadraticCurveRT.y + animationCountLocation.lookat.y.animationCountProcessed

    quadraticCurveLT.x = quadraticCurveLT.x + Math.abs(animationCountLocation.lookat.x.animationCountProcessed) * 0.1
    quadraticCurveLB.x = quadraticCurveLB.x - Math.abs(animationCountLocation.lookat.x.animationCountProcessed) * 0.1

    quadraticCurveLT.y = quadraticCurveLT.y + Math.abs(animationCountLocation.lookat.y.animationCountProcessed) * 0.1
    quadraticCurveLB.y = quadraticCurveLB.y - Math.abs(animationCountLocation.lookat.y.animationCountProcessed) * 0.1

    return <ReactCanvas2dExtensions.Path fill fillStyle='rgb(0, 0, 0)' container shadowColor='rgb(0, 0, 0)' shadowBlur={animationCountLocation.style.shadowBlur[0].animationCountProcessed}>
      <path moveTo>
        <path x={pointT.x} y={pointT.y} />
      </path>
      <path quadraticCurveTo>
        <path x={quadraticCurveLT.x} y={quadraticCurveLT.y} />
        <path x={pointL.x} y={pointL.y} />
      </path>
      <path quadraticCurveTo>
        <path x={quadraticCurveLB.x} y={quadraticCurveLB.y} />
        <path x={pointB.x} y={pointB.y} />
      </path>
      <path quadraticCurveTo>
        <path x={quadraticCurveRB.x} y={quadraticCurveRB.y} />
        <path x={pointR.x} y={pointR.y} />
      </path>
      <path quadraticCurveTo>
        <path x={quadraticCurveRT.x} y={quadraticCurveRT.y} />
        <path x={pointT.x} y={pointT.y} />
      </path>
    </ReactCanvas2dExtensions.Path>
  })

  const ComponentTentacle = React.useMemo(() => {
    return Object.values(animationCountLocation.tentacle).map((i, index) => {
      return <ReactCanvas2dExtensions.Path fill fillStyle='rgb(255, 255, 255)' container closePath>

        {
          Object.values(i).map((i, index) => {
            if (index === 0) {
              return <path moveTo>
                <path x={i.x.animationCountProcessed} y={i.y.animationCountProcessed} />
              </path>
            }
            if (index !== 0) {
              return <path lineTo>
                <path x={i.x.animationCountProcessed} y={i.y.animationCountProcessed} />
              </path>
            }
          })
        }
      </ReactCanvas2dExtensions.Path>
    })
  })

  // const ComponentEyeLensDecoration = React.useMemo(() => {
  //   const length = Math.ceil((animationCountLocation.eyeLens.B.y.animationCountProcessed - animationCountLocation.eyeLens.T.y.animationCountProcessed) / 2 / (animationCountLocation.eyeLensDecoration.h.animationCountProcessed + animationCountLocation.eyeLensDecoration.gapY.animationCountProcessed)) * 2 + 1

  //   const caculate = (index) => {
  //     var x = 0
  //     var y = (index - (length - 1) / 2) * (animationCountLocation.eyeLensDecoration.h.animationCountProcessed + animationCountLocation.eyeLensDecoration.gapY.animationCountProcessed)
  //     var w = animationCountLocation.eyeLensDecoration.w.animationCountProcessed
  //     var h = animationCountLocation.eyeLensDecoration.h.animationCountProcessed

  //     x = x + animationCountLocation.lookat.x.animationCountProcessed * 1.2
  //     y = y + animationCountLocation.lookat.y.animationCountProcessed

  //     w = w * Math.abs(((length - 1) / 2) / (((length - 1) / 2) - index))

  //     if (index % 2 === 1) x = x + animationCountLocation.eyeLensDecoration.gapX.animationCountProcessed
  //     if (index % 2 === 0) x = x - animationCountLocation.eyeLensDecoration.gapX.animationCountProcessed

  //     return { x, y, w, h }
  //   }

  //   return new Array(length).fill().map((i, index) => {

  //     const { x, y, w, h } = caculate(index)

  //     const pointT = { x: x, y: y - h / 2 }
  //     const pointL = { x: x - w / 2, y: y }
  //     const pointB = { x: x, y: y + h / 2 }
  //     const pointR = { x: x + w / 2, y: y }

  //     return <path fill fillStyle='rgb(175, 125, 125)' container closePath>
  //       <path moveTo>
  //         <path x={pointT.x} y={pointT.y} />
  //       </path>
  //       <path lineTo>
  //         <path x={pointL.x} y={pointL.y} />
  //       </path>
  //       <path lineTo>
  //         <path x={pointB.x} y={pointB.y} />
  //       </path>
  //       <path lineTo>
  //         <path x={pointR.x} y={pointR.y} />
  //       </path>
  //     </path>
  //   })
  // })

  // const ComponentThorn = React.useMemo(() => {
  //   return Object.values(animationCountLocation.thorn).map((i, index) => {
  //     return <path fill fillStyle='rgb(0, 0, 0)' container closePath>
  //       <path moveTo>
  //         <path x={i.T.x.animationCountProcessed} y={i.T.y.animationCountProcessed} />
  //       </path>
  //       <path lineTo>
  //         <path x={i.B[0].x.animationCountProcessed} y={i.B[0].y.animationCountProcessed} />
  //       </path>
  //       <path lineTo>
  //         <path x={i.B[1].x.animationCountProcessed} y={i.B[1].y.animationCountProcessed} />
  //       </path>
  //     </path>
  //   })
  // })

  const Component =
    <layout y={animationCountLocation.container.y.animationCountProcessed} globalAlpha={animationCountAppear - animationCountDisappear}>

      {
        ComponentPoint
      }

      {
        ComponentEyeShell
      }

      {
        ComponentEyeMask
      }

      {
        ComponentEyeLens
      }

      {
        ComponentTentacle
      }

    </layout>

  return Component
}

const init = (props) => {
  return {
    ComponentInWar: ComponentInWar,
  }
}

export default { monsterIndex: 'Monster0001', init }