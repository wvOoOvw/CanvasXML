import { React, ReactPlugin, ReactDomComponent, ReactDom, ReactDomPlugin, ReactDomTag, Location } from '../../package/index'

function RectComponent() {
  const [active, setActive] = React.useState(false)
  const [hover, setHover] = React.useState(false)

  const destinationRadius = hover ? 24 : 8
  const destinationFillStyleRed = active ? 115 : 145
  const destinationFillStyleGreen = active ? 125 : 145
  const destinationFillStyleBlue = active ? 170 : 145

  const { transitionCount: radius } = ReactPlugin.useTransitionCount({ defaultCount: 8, destination: destinationRadius, rate: 16 / 15, postprocess: n => Number(n.toFixed(2)) })
  const { transitionCount: fillStyleRed } = ReactPlugin.useTransitionCount({ defaultCount: 145, destination: destinationFillStyleRed, rate: 30 / 15, postprocess: n => n.toFixed(0) })
  const { transitionCount: fillStyleGreen } = ReactPlugin.useTransitionCount({ defaultCount: 145, destination: destinationFillStyleGreen, rate: 20 / 15, postprocess: n => n.toFixed(0) })
  const { transitionCount: fillStyleBlue } = ReactPlugin.useTransitionCount({ defaultCount: 145, destination: destinationFillStyleBlue, rate: 25 / 15, postprocess: n => n.toFixed(0) })

  const fillStyle = `rgba(${fillStyleRed}, ${fillStyleGreen}, ${fillStyleBlue}, 1)`

  const onClick = e => {
    if (e.device === 'mouse' && Location.pointcover({ x: e.dom.props.x, y: e.dom.props.y, w: e.dom.props.w, h: e.dom.props.h }, { x: e.x, y: e.y })) {
      setActive(!active)
    }
    if (e.device === 'touch' && Location.pointcover({ x: e.dom.props.x, y: e.dom.props.y, w: e.dom.props.w, h: e.dom.props.h }, { x: e.x[0], y: e.y[0] })) {
      setActive(!active)
    }
  }

  const onMouseMove = e => {
    setHover(Location.pointcover({ x: e.dom.props.x, y: e.dom.props.y, w: e.dom.props.w, h: e.dom.props.h }, { x: e.x, y: e.y }))
  }

  const onTouchMove = e => {
    setHover(Location.pointcover({ x: e.dom.props.x, y: e.dom.props.y, w: e.dom.props.w, h: e.dom.props.h }, { x: e.x[0], y: e.y[0] }))
  }

  return <rect x='extend' y='extend' w='extend' h='extend' beginPath fillStyle={fillStyle} radius={radius} onClick={onClick} onMouseMove={onMouseMove} onTouchMove={onTouchMove}>
    <fill />
  </rect>
}

function BlockGraph() {
  return <rect x='extend' y='extend' w='extend' h='extend' beginPath fillStyle='rgba(255, 255, 255, 1)' radius={16}>

    <fill />

    <clip x='extend' y='extend' w='extend' h='extend'>
      <layout x='extend' y='extend' w='extend' h='extend' container horizontalAlignCenter verticalAlignCenter>
        <layout w='92%' h='92%' gap={24} item container wrap verticalCenter horizontalCenter>
          {
            new Array(12).fill().map(i => {
              return <layout w='120' h='120' item>
                <RectComponent />
              </layout>
            })
          }
        </layout>
      </layout>
    </clip>

  </rect>
}

function BlockDescription() {
  const refRoot = React.useRef()

  const [locationRoot, setLocationRoot] = React.useState()
  const [locationContent, setLocationContent] = React.useState()

  const [scroll, setScroll] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
    const location = refRoot.current.props
    if (locationRoot === undefined || locationRoot.w !== location.w || locationRoot.h !== location.h) {
      setLocationRoot({ w: location.w, h: location.h })
    }
  })

  React.useEffect(() => {
    const location = Location.box(ReactDomPlugin.flatDom(refRoot.current).map(i => i.props))
    if (setLocationContent === undefined || setLocationContent.w !== location.w || setLocationContent.h !== location.h) {
      setLocationContent({ w: location.w, h: location.h })
    }
  }, [locationRoot])

  const text =
    [
      {
        text: 'Component <Rect/> DEMO',
        font: '28px monospace',
        fillStyle: 'rgba(255, 255, 255, 1)',
      },
      {
        text: 'This Is A Basic Rect Component Display By Setting Different Orientations, Sizes, Rounded Corners, And Rendering Modes, Try To Click The Rect Above To Change The Color',
        font: '24px monospace',
        fillStyle: 'rgba(185, 185, 185, 1)',
      },
      {
        text: 'Check GITHUB Document',
        font: '24px monospace',
        fillStyle: 'rgba(185, 185, 185, 1)',
        type: 'button'
      },
    ]

  console.log(locationRoot, locationContent)

  return <layout x='extend' y='extend' w='extend' h='extend' ref={dom => refRoot.current = dom}>

    <rect x='extend' y='extend' w='extend' h='extend' beginPath fillStyle='rgba(120, 120, 120, 1)' radius={16}>
      <fill />
    </rect>

    <rect x='extend' y='extend' w='extend' h='extend' beginPath fillStyle='rgba(120, 120, 120, 1)' radius={16}>
      <clip x='extend' y='extend' w='extend' h='extend'>

        <layout x='extend' y={`calc(extend - 0)`} w='extend' h='extend' container verticalForward horizontalAlignCenter gap={12} ref={dom => refRoot.current = dom}>

          <layout w='extend' h='12' item />

          {
            locationRoot !== undefined ?
              text.map((i) => {
                return <ReactDomTag.Text.Line w={locationRoot.w} font={i.font} text={i.text} split=' '>
                  {
                    (lines) => {
                      return <layout w={Math.max(...lines.map(i => i.w))} h={lines.reduce((t, i) => t + i.h * 1.5, 0)} item container verticalForward horizontalAlignCenter>
                        {
                          lines.map(line => {
                            return <layout w={line.w} h={line.h * 1.5} item container horizontalAlignCenter verticalAlignCenter>
                              <layout w={line.w} h={line.h} item>
                                <text x='extend' y='extend' w='extend' h='extend' fillText fillStyle={i.fillStyle} font={i.font} text={line.text} lineHeight={1} />
                              </layout>
                            </layout>
                          })
                        }
                      </layout>
                    }
                  }
                </ReactDomTag.Text.Line>
              })
              : null
          }

          <layout w='extend' h='12' item />

        </layout>

      </clip>
    </rect>

  </layout>
}

function BlockControl() {
  const [open, setOpen] = React.useState(false)

  const { transitionCount: openTrasition } = ReactPlugin.useTransitionCount({ defaultCount: 0, destination: open ? 1 : 0, rate: 1 / 15, postprocess: n => Number(n.toFixed(2)) })

  return null
}

function App() {
  return <>
    <layout x='extend' y='extend' w='extend' h='extend'>
      <ReactDomComponent.CoordinateHelper gap={100} color={'rgba(255, 255, 255, 1)'} />
    </layout>

    <layout x='extend' y='extend' w='extend' h='extend' container verticalCenter horizontalAlignCenter>
      <layout w='min(calc(100% - 120), 1600)' h='40%' item>
        <BlockGraph />
      </layout>

      <layout w='min(calc(100% - 120), 1600)' h='48' item></layout>

      <layout w='min(calc(100% - 120), 1600)' h='24%' item>
        <BlockDescription />
      </layout>
    </layout>

    <layout x='extend' y='extend' w='extend' h='extend' container verticalReverse horizontalAlignCenter>
      <layout w='min(calc(100% - 120), 1600)' h='min(calc(65%) ,800)' item horizontalAlignCenter verticalAlignCenter>
        <BlockControl />
      </layout>
    </layout>
  </>
}

export default App