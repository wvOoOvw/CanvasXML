import { React, Canvas2d, ReactCanvas2d } from '../../package/index'

import Template from '../_Template/App'

import Context from './context'

function Hit(props) {
  const { transitionCount } = React.Plugin.useTransitionCount(
    {
      play: true,
      defaultCount: 0,
      destination: 1,
      rate: 1 / props.hit.rate,
      postprocess: n => Number(n.toFixed(3))
    }
  )

  React.useEffectImmediate(() => {
    if (transitionCount === 1 && props.hit.status === 'process') props.hit.status = 'fail'
  }, [transitionCount])

  const { transitionCount: transitionCountSuccess } = React.Plugin.useTransitionCount(
    {
      play: transitionCount === 1 && props.hit.status === 'success',
      defaultCount: 0,
      destination: 1,
      rate: 1 / 15,
      postprocess: n => Number(n.toFixed(3))
    }
  )

  const { transitionCount: transitionCountFail } = React.Plugin.useTransitionCount(
    {
      play: transitionCount === 1 && props.hit.status === 'fail',
      defaultCount: 0,
      destination: 1,
      rate: 1 / 15,
      postprocess: n => Number(n.toFixed(3))
    }
  )

  React.useEffect(() => {
    if (transitionCountSuccess === 1 || transitionCountFail === 1) props.destory()
  }, [transitionCountSuccess])

  props.hit.graph.forEach(i => Object.entries(i.propertyAddition).forEach((n) => i.property[n[0]] = n[1](props.hit, i, transitionCount, transitionCountSuccess, transitionCountFail)))

  return <layout>

    {
      props.hit.graph.map(i => <i.type {...i.property} />)
    }

  </layout>
}

function App() {
  const context = React.useContext(Context)

  const cavansCoordinate = Canvas2d.canvas().coordinate

  const add = () => {
    const randomX = Number((Math.random() * 90).toFixed())
    const randomAngle = Number((Math.random() * Math.PI * 2).toFixed(3))

    const hit = {
      rate: 300,
      status: 'process',
      graph: [
        {
          type: 'circle',
          property: {
            beginPath: true,
            sAngle: 0 + randomAngle,
            eAngle: Math.PI * 2 + randomAngle,
            counterclockwise: false,
            fill: true,
            radius: cavansCoordinate.vmin * 5,
          },
          propertyAddition: {
            cx: (hit, graph, transitionCount, transitionCountSuccess, transitionCountFail) => {
              return `${transitionCount * 0 + 10 + randomX}%`
            },
            cy: (hit, graph, transitionCount, transitionCountSuccess, transitionCountFail) => {
              return `${transitionCount * 80 + transitionCountFail * 5 + 10}%`
            },
            globalAlpha: (hit, graph, transitionCount, transitionCountSuccess, transitionCountFail) => {
              return 1 - transitionCountFail
            },
            fillStyle: (hit, graph, transitionCount, transitionCountSuccess, transitionCountFail) => {
              if (hit.status === 'process') return 'white'
              if (hit.status === 'success') return 'green'
              if (hit.status === 'fail') return 'red'
            },
            onMouseDown: (hit, graph, transitionCount, transitionCountSuccess, transitionCountFail) => {
              return (dom) => {
                console.log(1)
                if (transitionCount > 0.8 && hit.status === 'process') hit.status === 'success'
              }
            }
          },
        },
        {
          type: 'arc',
          property: {
            beginPath: true,
            counterclockwise: false,
            stroke: true,
            lineWidth: 4,
            cx: `${10 + randomX}%`,
            cy: '90%',
          },
          propertyAddition: {
            radius: (hit, graph, transitionCount, transitionCountSuccess, transitionCountFail) => {
              return (1 - transitionCount) * cavansCoordinate.vmin * 5 + transitionCountFail * cavansCoordinate.vmin * 2 * -1 + cavansCoordinate.vmin * 5
            },
            sAngle: (hit, graph, transitionCount, transitionCountSuccess, transitionCountFail) => {
              return 0 + randomAngle
            },
            eAngle: (hit, graph, transitionCount, transitionCountSuccess, transitionCountFail) => {
              return Math.PI * 2 + randomAngle
              return transitionCount * Math.PI * 2 + randomAngle
            },
            globalAlpha: (hit, graph, transitionCount, transitionCountSuccess, transitionCountFail) => {
              return 1 - transitionCountFail
            },
            strokeStyle: (hit, graph, transitionCount, transitionCountSuccess, transitionCountFail) => {
              if (hit.status === 'process') return 'white'
              if (hit.status === 'success') return 'green'
              if (hit.status === 'fail') return 'red'
            },
          },
        }
      ]
    }

    const i = { hit: hit, key: Math.random(), destory: () => context.setHit(pre => pre.filter(n => n !== i)) }

    context.setHit(pre => [...pre, i])
  }

  React.useEffect(() => {
    add()
    // setInterval(() => add(), 500)
  }, [])

  return <layout>
    {
      context.hit.map((i) => <Hit key={i.key} hit={i.hit} destory={i.destory} updateStatus={i.updateStatus} />)
    }
  </layout>
}

function AppContext() {
  const [hit, setHit] = React.useState([])

  const value = { hit, setHit }

  return <Context.Provider value={value}>
    <App />
  </Context.Provider>
}

export default AppContext